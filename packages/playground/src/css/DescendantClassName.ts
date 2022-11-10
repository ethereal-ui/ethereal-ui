import { TupleToUnion } from './TupleToUnion';
import { ClassName } from './ClassName';
import { DescendantsSpec } from './DescendantsSpec';

export type DescendantClassName<
  Descendants extends DescendantsSpec<DescendantName>,
  DescendantName extends string
> = {
  [K in keyof Descendants]: ClassName<TupleToUnion<Descendants[K]>>;
};
