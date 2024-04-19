import { expect, test } from 'vitest';

import { componentClassNames, defaultPrefix } from './componentClassNames.js';

test('Use default prefix', () => {
  const [cn, selectors] = componentClassNames('TestComponent');

  expect(cn.className).toBe(`${defaultPrefix}-TestComponent`);
  expect(selectors.root).toBe(`.${defaultPrefix}-TestComponent`);
});

test('Use custom prefix', () => {
  const [cn, selectors] = componentClassNames('TestComponent', {
    prefix: 'pre',
  });

  expect(cn.className).toBe(`pre-TestComponent`);
  expect(selectors.root).toBe(`.pre-TestComponent`);
});

test('Elements', () => {
  const [cn, selectors] = componentClassNames('TestComponent', {
    prefix: 'pre',
    elements: ['a', 'b'],
  });

  expect(cn.className).toBe(`pre-TestComponent`);
  expect(cn.a.className).toBe(`pre-TestComponent-a`);
  expect(cn.b.className).toBe(`pre-TestComponent-b`);

  expect(selectors.root).toBe(`.pre-TestComponent`);
  expect(selectors.a).toBe(`.pre-TestComponent-a`);
  expect(selectors.b).toBe(`.pre-TestComponent-b`);
});
