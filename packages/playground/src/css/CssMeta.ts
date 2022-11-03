import type { ClassName } from './ClassName';
import type { DescendantClassName } from './DescendantClassName';
import type { DescendantSelector } from './DescendantSelector';
import type { DescendantsSpec } from './DescendantsSpec';
import type { Selector } from './Selector';

export interface CssMeta<
  Modifier extends string,
  Descendants extends DescendantsSpec
> {
  readonly className: ClassName<Modifier> & DescendantClassName<Descendants>;
  readonly selector: Selector<Modifier> & DescendantSelector<Descendants>;
  readonly allClassNames: () => Generator<string, void, unknown>;
}
