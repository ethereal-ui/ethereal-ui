import type { ReactNode } from 'react';
import type { Modules } from './Modules';

export type ComponentWrapperProps = {
  modules: Modules;
  moduleName: string;
  view?: string;
  children: ReactNode;
};
