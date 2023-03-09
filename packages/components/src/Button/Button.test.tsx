import { test, expect } from 'vitest';
import { Button } from './Button.js';

test('cssNaming', () => {
  expect(Button.cssNaming).toBeTypeOf('object');
  expect(Button.cssNaming.cn).toBeTypeOf('function');
  expect(Button.cssNaming.sel).toBeTypeOf('function');
});
