import { expect, test, vitest } from 'vitest';
import { lazy } from './lazy';

test('Return value from initializer', () => {
  expect(lazy(() => 42)()).toBe(42);
});

test('Run the initializer once', () => {
  const fn = vitest.fn(() => 42);
  const lazyValue = lazy(fn);

  expect(lazyValue()).toBe(42);
  expect(lazyValue()).toBe(42);
  expect(fn).toHaveBeenCalledOnce();
});
