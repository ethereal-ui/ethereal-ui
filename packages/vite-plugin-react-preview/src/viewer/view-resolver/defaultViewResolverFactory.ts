import type { ComponentType } from 'react';

import { isObject } from '../util/isObject';

import type { ViewResolverFactory } from './ViewResolverFactory';
import type { ViewWrapperProps } from './ViewWrapperProps';
import { nullViewResolver } from './nullViewResolver';
import { createViews } from './createViews';

export type DefaultViewResolverFactoryOptions = {
  /**
   * A React component that will envelop each view. The component
   * receives `ViewWrapperProps`, the view resolver implementation will
   * pass the original view in the `children` property.
   */
  viewWrapper?: ComponentType<ViewWrapperProps>;

  /**
   * This function filters views in the loaded module. Regardless of the
   * filter function, the view resolver ignores any value not recognized
   * as a React component.
   */
  viewFilter?: (name: string, value: unknown) => boolean;
};

export const defaultViewResolverFactory = ((
  loadedModule: unknown,
  { viewWrapper, viewFilter }: DefaultViewResolverFactoryOptions = {}
) => {
  if (!isObject(loadedModule)) return nullViewResolver;

  const views = createViews(loadedModule, viewWrapper, viewFilter);

  return {
    views,

    findView(viewName) {
      const lowerCaseViewName = viewName?.toLowerCase() ?? 'default';

      const found =
        views.find(({ name }) => name === viewName) ??
        views.find(({ name }) => name.toLowerCase() === lowerCaseViewName);

      return !viewName && !found ? views[0] : found;
    },
  };
}) satisfies ViewResolverFactory;
