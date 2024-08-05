import type { Modules } from '../Modules';

export type ViewComponentProps = {
  modules: Modules;
  moduleName: string;
  viewName?: string;
  viewTitle?: string;
};
