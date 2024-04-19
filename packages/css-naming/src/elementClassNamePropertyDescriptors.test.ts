import { expect, test } from 'vitest';

import { elementClassNamePropertyDescriptors } from './elementClassNamePropertyDescriptors';

test('Create descriptors', () => {
  const result = elementClassNamePropertyDescriptors('eui', 'Component', [
    'elem1',
    'elem2',
  ]);

  expect(Object.keys(result)).toEqual(['elem1', 'elem2']);

  const { elem1, elem2 } = result;

  expect(elem1).toBeDefined();
  expect(elem2).toBeDefined();

  expect(elem1?.value.className).toBe('eui-Component-elem1');
  expect(elem2?.value.className).toBe('eui-Component-elem2');

  expect(elem1?.value('test').className).toBe('eui-Component-elem1 test');
  expect(elem2?.value('test').className).toBe('eui-Component-elem2 test');
});
