import { expect, test } from 'vitest';

import { elementSelectors } from './elementSelectors';

test('Create object with selectors', () => {
  expect(elementSelectors('eui', 'Component', ['elem1', 'elem2'])).toEqual({
    elem1: '.eui-Component-elem1',
    elem2: '.eui-Component-elem2',
  });
});
