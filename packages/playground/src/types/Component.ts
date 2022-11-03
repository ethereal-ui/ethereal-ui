import { JSX } from 'solid-js';

import type { CssMeta } from '../css/CssMeta';
import type { DescendantsSpec } from '../css/DescendantsSpec';

export interface Component<P = {}, C = never> {
  (props: P): JSX.Element;
  readonly css: C;
}
