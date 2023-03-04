import { test, assertType } from 'vitest';
import { mapValues } from './mapValues.js';

test('Infer value arg', () => {
  assertType<Record<'a' | 'b', number>>(mapValues({ a: 1, b: 2 }, v => v + 1));
});

test('Infer key arg', () => {
  assertType<{ a: 'a'; b: 'b' }>(mapValues({ a: 1, b: 2 }, (_v, k) => k));
});
