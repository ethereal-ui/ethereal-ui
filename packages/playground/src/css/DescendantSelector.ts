import { TupleToUnion } from './TupleToUnion';
import { DescendantsSpec } from './DescendantsSpec';
import { Selector } from './Selector';

export type DescendantSelector<
  Descendants extends DescendantsSpec<DescendantName>,
  DescendantName extends string
> = {
  [K in keyof Descendants]: Selector<TupleToUnion<Descendants[K]>>;
};
