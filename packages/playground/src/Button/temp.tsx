import type { JSX } from 'solid-js';

interface Component<P = {}, C extends () => string = never> {
  (props: P): JSX.Element;
  classNames?: C;
}

interface ButtonProps {
  variant: 'solid' | 'outline' | 'ghost';
}

type ClassNameSpecParts = readonly (string | ReadonlyArray<string>)[];

type ClassNamesSpec = readonly [
  name: string,
  ...modifiersOrDescendants: ClassNameSpecParts
];

type SpecParts<S extends ClassNamesSpec> = S extends readonly [
  string,
  ...infer P extends ClassNameSpecParts
]
  ? P
  : never;

type StringsToUnion<T> = T extends readonly [infer First, ...infer Rest]
  ? First extends string
    ? First | StringsToUnion<Rest>
    : StringsToUnion<Rest>
  : never;

type Modifiers<S extends ClassNamesSpec> = StringsToUnion<SpecParts<S>>;

type CnFn<S extends ClassNamesSpec> = (
  ...modifiers: readonly (Modifiers<S> | Record<Modifiers<S>, boolean>)[]
) => string;

type ArraysToDescendantRecord<T> = T extends readonly [
  infer First,
  ...infer Rest
]
  ? First extends readonly [infer N extends string, ...(readonly string[])]
    ? Record<N, CnFn<First>> & ArraysToDescendantRecord<Rest>
    : ArraysToDescendantRecord<Rest>
  : {};

type Descendants<S extends ClassNamesSpec> = ArraysToDescendantRecord<
  SpecParts<S>
>;

type ClassNamesFunction<S extends ClassNamesSpec> = CnFn<S> & Descendants<S>;

function componentClassNames<S extends ClassNamesSpec>(
  spec: S
): ClassNamesFunction<S> {
  const fn = () => 'test';
  return fn as ClassNamesFunction<S>;
}

// const classNames = componentClassNames([
//   'Button',
//   // variants
//   'solid',
//   'outline',
//   'ghost',
//   // sizes
//   'small',
//   'medium',
//   'large',
//   // icons
//   ['icon'],
//   ['trailingIcon'],
// ] as const);