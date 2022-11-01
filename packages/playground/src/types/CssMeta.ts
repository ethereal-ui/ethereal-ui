import { StringsToUnion } from './StringsToUnion';

export type DescendantsSpec = Readonly<Record<string, readonly string[]>>;

export interface ClassName<Modifier extends string> {
  (
    ...names: (string | readonly Modifier[] | Record<Modifier, boolean>)[]
  ): string;
}

export interface Selector<Modifier extends string> {
  (...names: readonly Modifier[]): string;
}

export type DescendantClassName<Descendants extends DescendantsSpec> = {
  [K in keyof Descendants]: ClassName<StringsToUnion<Descendants[K]>>;
};

export type DescendantSelector<Descendants extends DescendantsSpec> = {
  [K in keyof Descendants]: Selector<StringsToUnion<Descendants[K]>>;
};

export interface CssMeta<
  Modifier extends string,
  Descendants extends DescendantsSpec
> {
  className: ClassName<Modifier> & DescendantClassName<Descendants>;
  selector: Selector<Modifier> & DescendantSelector<Descendants>;
}
