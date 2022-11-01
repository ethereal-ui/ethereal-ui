import { JSX } from 'solid-js';

export interface Component<P = {}, C extends () => string = never> {
  (props: P): JSX.Element;
  css?: C;
}
