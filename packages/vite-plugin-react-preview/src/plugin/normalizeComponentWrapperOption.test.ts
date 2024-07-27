import { test, expect } from 'vitest';

import { normalizeComponentWrapperOption } from './normalizeComponentWrapperOption';

test('Remove relative path from import module', () => {
  expect(
    normalizeComponentWrapperOption({ import: 'x', from: './path' }).from
  ).toBe('/path');
});

test('Throw error when passing an invalid identifier', () => {
  expect(
    () =>
      normalizeComponentWrapperOption({ import: 'x x x', from: './path' }).from
  ).toThrowError(/Invalid identifier/);
});

test('Leave modules untouched', () => {
  expect(
    normalizeComponentWrapperOption({ import: 'x', from: '@some/module' }).from
  ).toBe('@some/module');
});
