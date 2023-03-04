import { assertType, expectTypeOf, test } from 'vitest';
import { componentClassNames } from './componentClassNames.js';

test('ClassNames function', () => {
  const names = componentClassNames('Comp', ['x']);
  expectTypeOf(names.cn).toBeFunction();

  assertType<string>(names.cn('x'));
  assertType<string>(names.cn(false));
  assertType<string>(names.cn(undefined));
  assertType<string>(names.cn(null));
  assertType<string>(names.cn({ x: false }));

  // @ts-expect-error "k" is not assignable to parameter
  names.cn('k');
});

test('Descendant without modifiers', () => {
  const names = componentClassNames('Comp', undefined, {
    elem: undefined,
  } as const);
  assertType<() => string>(names.cn.elem);
});

test('Descendant with modifiers', () => {
  const names = componentClassNames('Comp', undefined, {
    elem: ['active'],
  } as const);

  assertType<string>(names.cn.elem());
  assertType<string>(names.cn.elem('active'));

  // @ts-expect-error
  names.cn.elem('other');
});
