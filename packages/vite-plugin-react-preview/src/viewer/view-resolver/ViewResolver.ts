import type { View } from './View';

export type ViewResolver = {
  readonly views: readonly View[];
  findView(viewName?: string): View | undefined;
};
