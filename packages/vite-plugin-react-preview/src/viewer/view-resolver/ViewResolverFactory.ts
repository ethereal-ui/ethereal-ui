import type { ViewResolver } from './ViewResolver';

export type ViewResolverFactory = {
  (loadedModule: unknown): ViewResolver;
};
