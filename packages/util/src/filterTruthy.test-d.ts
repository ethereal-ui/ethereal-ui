import { expectTypeOf, test, assertType } from 'vitest';
import { filterTruthy } from './filterTruthy.js';

test('Accept readonly array', () => {
  const arr = [1, 2, 3] as const;
  expectTypeOf(filterTruthy(arr)).toBeArray();
});

test('Return array of the same type', () => {
  assertType<number[]>(filterTruthy([1, 2, 3]));
});
