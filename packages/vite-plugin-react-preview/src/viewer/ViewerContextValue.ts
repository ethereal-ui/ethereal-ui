import type { Modules } from './types';

export interface ViewerContextValue {
  modules: Modules;
  moduleName: string;
  view?: string;
}
