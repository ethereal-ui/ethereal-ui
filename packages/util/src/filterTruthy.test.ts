import { test, expect } from 'vitest';
import { filterTruthy } from './filterTruthy.js';

test('Remove undefined', () => {
  expect(filterTruthy([1, undefined, 2])).toEqual([1, 2]);
});

test('Remove null', () => {
  expect(filterTruthy([1, null, 2])).toEqual([1, 2]);
});

test('Remove 0', () => {
  expect(filterTruthy([1, 0, 2])).toEqual([1, 2]);
});

test('Remove false', () => {
  expect(filterTruthy([1, false, 2])).toEqual([1, 2]);
});
