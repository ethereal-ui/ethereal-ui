import { createCssMeta } from '../../css/createCssMeta.js';
import { component } from '../../common/component.js';

import type { ButtonProps } from './ButtonProps';

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

export const Button = component(
  css,
  ({ class: className, style, children }: ButtonProps) => (
    <button class={css.className(className)} style={style} type="button">
      {children}
    </button>
  )
);
