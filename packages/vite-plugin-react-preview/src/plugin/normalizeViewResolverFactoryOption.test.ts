import { test, expect } from 'vitest';

import { normalizeViewResolverFactoryOption } from './normalizeViewResolverFactoryOption';

test('Remove relative path from import module', () => {
  expect(
    normalizeViewResolverFactoryOption({ import: 'x', from: './path' }).from
  ).toBe('/path');
});

test('Throw error when passing an invalid identifier', () => {
  expect(
    () =>
      normalizeViewResolverFactoryOption({ import: 'x x x', from: './path' })
        .from
  ).toThrowError(/Invalid identifier/);
});

test('Leave modules untouched', () => {
  expect(
    normalizeViewResolverFactoryOption({ import: 'x', from: '@some/module' })
      .from
  ).toBe('@some/module');
});
