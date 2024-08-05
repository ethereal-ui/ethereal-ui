import type { ViewResolver } from './ViewResolver';

export const nullViewResolver: ViewResolver = {
  views: [],
  findView: () => undefined,
};
