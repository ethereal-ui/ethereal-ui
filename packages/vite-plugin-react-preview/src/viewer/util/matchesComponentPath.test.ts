import { expect, test } from 'vitest';
import { matchesComponentPath } from './matchesComponentPath';

test('Match by name only', () => {
  expect(
    matchesComponentPath('Button', '/src/components/Button.preview.tsx')
  ).toBe(true);
});

test('Case insensitive match', () => {
  expect(
    matchesComponentPath('button', '/src/components/Button.preview.tsx')
  ).toBe(true);
});

test('Case insensitive match fail', () => {
  expect(
    matchesComponentPath('buttonx', '/src/components/Button.preview.tsx')
  ).toBe(false);
});

test('Match without extension', () => {
  expect(
    matchesComponentPath(
      '/src/components/Button',
      '/src/components/Button.preview.tsx'
    )
  ).toBe(true);
});

test('Ignore absolute path prefix', () => {
  expect(
    matchesComponentPath(
      '/Users/test-project/src/components/Button',
      '/src/components/Button.preview.tsx'
    )
  ).toBe(true);
});

test('Match relative path', () => {
  expect(
    matchesComponentPath(
      'src/components/Button',
      '/src/components/Button.preview.tsx'
    )
  ).toBe(true);
});

test('Do not match if path is more specific', () => {
  expect(
    matchesComponentPath(
      'src/components/Button.component.tsx',
      '/src/components/Button.preview.tsx'
    )
  ).toBe(false);
});

test('Treat dot files as file names', () => {
  expect(
    matchesComponentPath(
      'src/components/.button',
      '/src/components/.button.preview.tsx'
    )
  ).toBe(true);
});

test('Handle absolute path and dot file', () => {
  expect(
    matchesComponentPath(
      '/Users/project/src/components/.button',
      '/src/components/.button'
    )
  ).toBe(true);
});

test('Do not match partial file names', () => {
  expect(matchesComponentPath('b', '/src/components/Button.preview.tsx')).toBe(
    false
  );
});

test('Do not match different extensions', () => {
  expect(
    matchesComponentPath('Button.tsx', '/src/components/Button.preview.tsx')
  ).toBe(false);
});

test('Do not match different sub-dirs', () => {
  expect(
    matchesComponentPath('support/Button', '/src/components/Button.preview.tsx')
  ).toBe(false);
});
