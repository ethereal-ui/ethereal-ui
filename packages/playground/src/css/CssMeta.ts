import type { ClassName } from './ClassName';
import type { DescendantClassName } from './DescendantClassName';
import type { DescendantSelector } from './DescendantSelector';
import type { DescendantsSpec } from './DescendantsSpec';
import type { Selector } from './Selector';

export interface CssMeta<
  Modifier extends string,
  Descendants extends DescendantsSpec<DescendantName>,
  DescendantName extends string
> {
  readonly className: ClassName<Modifier> &
    DescendantClassName<Descendants, DescendantName>;

  readonly selector: Selector<Modifier> &
    DescendantSelector<Descendants, DescendantName>;

  readonly allClassNames: () => Generator<string, void, unknown>;

  readonly descendants: () => Generator<
    keyof DescendantsSpec<DescendantName>,
    void,
    unknown
  >;
}
