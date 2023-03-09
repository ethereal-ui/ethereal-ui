import type { ReactNode } from 'react';
import type {
  DataAttributes,
  SizeProp,
  SizeSML,
  StyleProps,
} from '../types/index.js';

export interface ButtonProps extends StyleProps, DataAttributes, SizeProp {
  variant?: 'solid' | 'outline' | 'plain';
  color?: 'primary' | 'secondary' | 'destructive';
  iconSize?: SizeSML;
  disabled?: boolean;
  children?: ReactNode;
}
