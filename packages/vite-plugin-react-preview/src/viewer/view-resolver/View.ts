import type { ComponentType } from 'react';
import type { ViewComponentProps } from './ViewComponentProps';

export type View = Readonly<{
  name: string;
  title: string;
  component: ComponentType<ViewComponentProps>;
}>;
