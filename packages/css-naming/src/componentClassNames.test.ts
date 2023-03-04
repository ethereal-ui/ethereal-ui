import { describe, expect, test } from 'vitest';

import {
  componentClassNames,
  defaultClassNamePrefix,
} from './componentClassNames.js';

describe('ClassNames (cn)', () => {
  test('Default prefix', () => {
    const names = componentClassNames('Test');
    expect(names.cn()).toBe(`${defaultClassNamePrefix}-Test`);
  });

  test('Modifier and default prefix', () => {
    const names = componentClassNames('Test', ['modifier']);
    expect(names.cn('modifier')).toBe(
      `${defaultClassNamePrefix}-Test ${defaultClassNamePrefix}-Test_modifier`
    );
  });

  test('Descendant and default prefix', () => {
    const names = componentClassNames('Test', [], { descendant: [] } as const);

    expect(names.cn.descendant()).toBe(
      `${defaultClassNamePrefix}-Test-descendant`
    );
  });

  test('Custom prefix', () => {
    const names = componentClassNames('Test', undefined, undefined, {
      prefix: 'custom',
    });
    expect(names.cn()).toBe(`custom-Test`);
  });

  test('Modifier and custom prefix', () => {
    const names = componentClassNames(
      'Test',
      ['modifier'] as const,
      undefined,
      {
        prefix: 'custom',
      }
    );
    expect(names.cn('modifier')).toBe(`custom-Test custom-Test_modifier`);
  });

  test('Descendant and custom prefix', () => {
    const names = componentClassNames(
      'Test',
      undefined,
      { descendant: [] } as const,
      { prefix: 'custom' }
    );

    expect(names.cn.descendant()).toBe(`custom-Test-descendant`);
  });

  test('Works with destructuring', () => {
    const { cn } = componentClassNames(
      'Test',
      ['modifier'],
      { elem: ['submod'] } as const,
      { prefix: 't' }
    );
    expect(cn()).toBe('t-Test');
    expect(cn('modifier')).toBe('t-Test t-Test_modifier');
    expect(cn.elem('submod')).toBe('t-Test-elem t-Test-elem_submod');
  });

  test('Ignore false/undefined/null', () => {
    const { cn } = componentClassNames('Test', ['modifier'], undefined, {
      prefix: 't',
    });
    expect(cn(false)).toBe('t-Test');
    expect(cn(undefined)).toBe('t-Test');
    expect(cn(null)).toBe('t-Test');
  });

  test('Toggle modifiers with an object', () => {
    const { cn } = componentClassNames('Test', ['modifier'], undefined, {
      prefix: 't',
    });
    expect(cn({ modifier: false })).toBe('t-Test');
    expect(cn({ modifier: true })).toBe('t-Test t-Test_modifier');
  });

  test('Ignore bogus modifier argument', () => {
    const { cn } = componentClassNames('Test', ['modifier'], undefined, {
      prefix: 't',
    });
    expect(cn(122 as any)).toBe('t-Test');
  });
});

describe('SelectorName (sel)', () => {
  test('Default prefix', () => {
    const names = componentClassNames('Test');
    expect(names.sel()).toBe(`.${defaultClassNamePrefix}-Test`);
  });

  test('Modifier and default prefix', () => {
    const names = componentClassNames('Test', ['modifier']);
    expect(names.sel('modifier')).toBe(
      `.${defaultClassNamePrefix}-Test.${defaultClassNamePrefix}-Test_modifier`
    );
  });

  test('Descendant and default prefix', () => {
    const names = componentClassNames('Test', [], { descendant: [] } as const);

    expect(names.sel.descendant()).toBe(
      `.${defaultClassNamePrefix}-Test-descendant`
    );
  });

  test('Custom prefix', () => {
    const names = componentClassNames('Test', undefined, undefined, {
      prefix: 'custom',
    });
    expect(names.sel()).toBe(`.custom-Test`);
  });

  test('Modifier and custom prefix', () => {
    const names = componentClassNames(
      'Test',
      ['modifier'] as const,
      undefined,
      {
        prefix: 'custom',
      }
    );
    expect(names.sel('modifier')).toBe(`.custom-Test.custom-Test_modifier`);
  });

  test('Descendant and custom prefix', () => {
    const names = componentClassNames(
      'Test',
      undefined,
      { descendant: [] } as const,
      { prefix: 'custom' }
    );

    expect(names.sel.descendant()).toBe(`.custom-Test-descendant`);
  });

  test('Works with destructuring', () => {
    const { sel } = componentClassNames(
      'Test',
      ['modifier'],
      { elem: ['submod'] } as const,
      { prefix: 't' }
    );
    expect(sel()).toBe('.t-Test');
    expect(sel('modifier')).toBe('.t-Test.t-Test_modifier');
    expect(sel.elem('submod')).toBe('.t-Test-elem.t-Test-elem_submod');
  });
});
