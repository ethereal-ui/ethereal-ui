import { createCssMeta } from '../../css/createCssMeta.js';
import { component } from '../../common/component.js';

import type { ButtonProps } from './ButtonProps';
import { Unstyled } from '../../types/Unstyled.js';

const css = createCssMeta('Button', [
  // variants
  'solid',
  'outline',
  'ghost',

  // sizes
  'small',
  'medium',
  'large',
] as const);

export const Button = component(css, (props: Unstyled<ButtonProps>) => (
  <button
    class={css.className(props.class, [props.variant])}
    style={props.style}
    type="button"
  >
    {props.children}
  </button>
));
