import { JSX } from 'solid-js';

export interface Component<P = {}, C = never> {
  (props: P): JSX.Element;
  readonly css: C;
}
