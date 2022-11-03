import { StringsToUnion } from '../types/StringsToUnion';
import { ClassName } from './ClassName';
import { DescendantsSpec } from './DescendantsSpec';

export type DescendantClassName<Descendants extends DescendantsSpec> = {
  [K in keyof Descendants]: ClassName<StringsToUnion<Descendants[K]>>;
};
