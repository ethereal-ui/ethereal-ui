import { expect, test } from 'vitest';
import { getComponent } from './getComponent';

test('Loaded module is not an object', () => {
  expect(getComponent('value')).toBeUndefined();
});

test('Loaded module is empty', () => {
  expect(getComponent({})).toBeUndefined();
});

test('Get default', () => {
  const loadedModule = {
    default: () => 'Test',
  };

  expect(getComponent(loadedModule)).toBe(loadedModule.default);
});

test('Get first named import', () => {
  const loadedModule = {
    Test: () => 'Test',
  };

  expect(getComponent(loadedModule)).toBe(loadedModule.Test);
});

test('Prefer default over first named import', () => {
  const loadedModule = {
    Test: () => 'Test',
    default: () => 'Default',
  };

  expect(getComponent(loadedModule)).toBe(loadedModule.default);
});

test('Get by view', () => {
  const loadedModule = {
    default: () => 'Test',
    Other: () => 'Other',
  };

  expect(getComponent(loadedModule, 'Other')).toBe(loadedModule.Other);
});

test('Component is not a valid element', () => {
  const loadedModule = {
    default: {},
  };

  expect(getComponent(loadedModule)).toBeUndefined();
});
