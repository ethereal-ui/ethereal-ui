import { expect, test } from 'vitest';
import { mapValues } from './mapValues.js';

test.each([
  [{}, () => {}, {}],
  [{ key: 1 }, (v: number) => v + 1, { key: 2 }],
  [
    { key: 1, other: 'test' },
    (v: number, name: string) => (name === 'other' ? 2 : v),
    { key: 1, other: 2 },
  ],
])('mapValues case %#', (input, mapping, result) => {
  expect(mapValues(input, mapping)).toEqual(result);
});
