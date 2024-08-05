import type { ReactNode } from 'react';
import { expect, test } from 'vitest';

import { defaultViewResolverFactory as viewResolverFactory } from './defaultViewResolverFactory';

test('Loaded module is not an object', () => {
  const resolver = viewResolverFactory('value');
  expect(resolver.views).toEqual([]);
  expect(resolver.findView('default')).toBeUndefined();
  expect(resolver.findView('other')).toBeUndefined();
});

test('Loaded module is empty', () => {
  const resolver = viewResolverFactory({});
  expect(resolver.views).toEqual([]);
  expect(resolver.findView('default')).toBeUndefined();
  expect(resolver.findView('other')).toBeUndefined();
});

test('Get default', () => {
  const loadedModule = {
    default: () => 'Test',
  };
  const resolver = viewResolverFactory(loadedModule);

  expect(resolver.findView()).toEqual({
    name: 'default',
    title: 'Default',
    component: loadedModule.default,
  });
});

test('Get first named import', () => {
  const loadedModule = {
    Test: () => 'Test',
  };
  const resolver = viewResolverFactory(loadedModule);

  expect(resolver.findView()).toEqual({
    name: 'Test',
    title: 'Test',
    component: loadedModule.Test,
  });
});

test('Prefer default over first named import', () => {
  const loadedModule = {
    Test: () => 'Test',
    default: () => 'Default',
  };
  const resolver = viewResolverFactory(loadedModule);

  expect(resolver.findView()).toEqual({
    name: 'default',
    title: 'Default',
    component: loadedModule.default,
  });
});

test('Get by view', () => {
  const loadedModule = {
    default: () => 'Test',
    Other: () => 'Other',
  };
  const resolver = viewResolverFactory(loadedModule);

  expect(resolver.findView('Other')).toEqual({
    name: 'Other',
    title: 'Other',
    component: loadedModule.Other,
  });
});

test('Component is not a valid element', () => {
  const loadedModule = {
    default: {},
  };
  const resolver = viewResolverFactory(loadedModule);

  expect(resolver.findView()).toBeUndefined();
});

test('Prioritize case sensitivity', () => {
  const loadedModule = {
    other: () => 'Test',
    Other: () => 'Other',
  };
  const resolver = viewResolverFactory(loadedModule);

  expect(resolver.findView('Other')).toEqual({
    name: 'Other',
    title: 'Other',
    component: loadedModule.Other,
  });
});

test('Fallback to case insensitive when not found', () => {
  const loadedModule = {
    Test: () => 'Test',
    Other: () => 'Other',
  };
  const resolver = viewResolverFactory(loadedModule);

  expect(resolver.findView('test')).toEqual({
    name: 'Test',
    title: 'Test',
    component: loadedModule.Test,
  });
});

test('Apply viewWrapper', () => {
  const Test = () => 'Test';
  const loadedModule = {
    Test,
    Other: () => 'Other',
  };

  const Wrapper: (props: { children: ReactNode }) => ReactNode = () =>
    'Wrapper';

  const resolver = viewResolverFactory(loadedModule, {
    viewWrapper: Wrapper,
  });

  expect((resolver.findView('Test')?.component as Function)()).toEqual(
    <Wrapper>
      <Test />
    </Wrapper>
  );
});
