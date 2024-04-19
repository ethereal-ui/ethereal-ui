import { expect, test } from 'vitest';

import { createClassNameFunction } from './createClassNameFunction';

test('Returns object with className', () => {
  const fn = createClassNameFunction('eui', 'Component');

  expect(Object.keys(fn)).toEqual(['className']);
  expect(fn.className).toBe('eui-Component');
});

test('Returns a function that accepts arbitrary class names', () => {
  const fn = createClassNameFunction('eui', 'Component');

  expect(fn().className).toBe('eui-Component');
  expect(fn('some-class').className).toBe('eui-Component some-class');
});

test('Supports modifiers', () => {
  const fn = createClassNameFunction<{ size: string }>('eui', 'Component');

  expect(fn('', { size: 'small' }).className).toBe(
    'eui-Component eui--size-small'
  );
});
