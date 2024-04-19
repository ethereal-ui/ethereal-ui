import { expect, test } from 'vitest';

import { modifierClassName } from './modifierClassName';

test('Boolean modifier on', () => {
  expect(modifierClassName('eui', 'modifier', true)).toBe('eui--modifier');
});

test('Boolean modifier off', () => {
  expect(modifierClassName('eui', 'modifier', false)).toBe('');
  expect(modifierClassName('eui', 'modifier', undefined)).toBe('');
  expect(modifierClassName('eui', 'modifier')).toBe('');
  expect(modifierClassName('eui', 'modifier', 0)).toBe('');
  expect(modifierClassName('eui', 'modifier', null)).toBe('');
});

test('String modifier', () => {
  expect(modifierClassName('eui', 'modifier', 'value')).toBe(
    'eui--modifier-value'
  );
});
