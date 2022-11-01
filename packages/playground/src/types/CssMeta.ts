import { StringsToUnion } from './StringsToUnion';

export type DescendantsSpec = Readonly<Record<string, readonly string[]>>;

export interface ClassNames<Modifier extends string> {
  (
    ...names: (string | readonly Modifier[] | Record<Modifier, boolean>)[]
  ): string;
}

export interface Selectors<Modifier extends string> {
  (...names: readonly Modifier[]): string;
}

export type DescendantClassNames<Descendants extends DescendantsSpec> = {
  [K in keyof Descendants]: ClassNames<StringsToUnion<Descendants[K]>>;
};

export type DescendantSelectors<Descendants extends DescendantsSpec> = {
  [K in keyof Descendants]: Selectors<StringsToUnion<Descendants[K]>>;
};

export interface CssMeta<
  Modifier extends string,
  Descendants extends DescendantsSpec
> {
  classNames: ClassNames<Modifier> & DescendantClassNames<Descendants>;
  selectors: Selectors<Modifier> & DescendantSelectors<Descendants>;
}
