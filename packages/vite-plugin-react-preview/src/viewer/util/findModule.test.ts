import { expect, test } from 'vitest';

import { findModule } from './findModule';
import type { Modules } from '../types';

const modules: Modules = {
  '/src/components/Button.preview.tsx': async () => {},
  '/src/components/util/support/Button.preview.tsx': async () => {},
};

test('Get a module', () => {
  expect(findModule(modules, 'button')).toEqual([
    '/src/components/Button.preview.tsx',
    modules['/src/components/Button.preview.tsx'],
  ]);
});

test('Get the closest module', () => {
  expect(findModule(modules, 'button')).toEqual([
    '/src/components/Button.preview.tsx',
    modules['/src/components/Button.preview.tsx'],
  ]);
});

test('Get a specific module', () => {
  expect(findModule(modules, 'support/Button')).toEqual([
    '/src/components/util/support/Button.preview.tsx',
    modules['/src/components/util/support/Button.preview.tsx'],
  ]);
});

test('Not found', () => {
  expect(findModule(modules, 'text')).toBeUndefined();
});

test('Return first when path is undefined', () => {
  expect(findModule(modules)).toEqual([
    '/src/components/Button.preview.tsx',
    modules['/src/components/Button.preview.tsx'],
  ]);
});

test('Return undefined when modules is empty', () => {
  expect(findModule({})).toBeUndefined();
});
