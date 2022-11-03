import { StringsToUnion } from '../types/StringsToUnion';
import { DescendantsSpec } from './DescendantsSpec';
import { Selector } from './Selector';

export type DescendantSelector<Descendants extends DescendantsSpec> = {
  [K in keyof Descendants]: Selector<StringsToUnion<Descendants[K]>>;
};
