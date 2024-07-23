import { expect, test } from 'vitest';
import { normalizeGlob } from './normalizeGlob';

test('Add initial slash if missing', () => {
  expect(normalizeGlob('**/*.ts')).toBe('/**/*.ts');
});

test('Convert relative path to absolute', () => {
  expect(normalizeGlob('./**/*.ts')).toBe('/**/*.ts');
});

test('Leave absolute paths untouched', () => {
  expect(normalizeGlob('/**/*.ts')).toBe('/**/*.ts');
});
