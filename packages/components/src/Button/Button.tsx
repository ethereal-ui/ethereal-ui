import type { ReactElement } from 'react';

import { componentClassNames } from '@ethereal-ui/css-naming';
import { upperFirst } from '@ethereal-ui/util';

import type { ButtonProps } from './ButtonProps';

const cssNaming = componentClassNames('Button', [
  // variant
  'solid',
  'outline',
  'plain',

  // color
  'primary',
  'secondary',
  'destructive',

  // size
  'small',
  'medium',
  'large',

  // iconSize
  'iconSmall',
  'iconMedium',
  'iconLarge',
]);
const { cn } = cssNaming;

export const Button = ({
  className,
  variant = 'solid',
  color = 'primary',
  size = 'medium',
  iconSize = 'medium',
  ...rest
}: ButtonProps): ReactElement => (
  <button
    type="button"
    className={cn(
      { className },
      variant,
      color,
      size,
      iconSize && `icon${upperFirst(iconSize)}`
    )}
    {...rest}
  />
);
Button.cssNaming = cssNaming;
