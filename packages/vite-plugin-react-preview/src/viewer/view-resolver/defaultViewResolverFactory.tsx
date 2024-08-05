import { isValidElementType } from 'react-is';
import type { ComponentType } from 'react';

import { isObject } from '../util/isObject';
import { startCase } from '../util/startCase';

import type { View } from './View';
import type { ViewResolverFactory } from './ViewResolverFactory';
import type { ViewComponentProps } from './ViewComponentProps';
import type { ViewWrapperProps } from './ViewWrapperProps';
import { nullViewResolver } from './nullViewResolver';

type ViewComponent = ComponentType<ViewComponentProps>;
type ViewWrapperComponent = ComponentType<ViewWrapperProps>;

type ViewResolverFactoryOptions = {
  viewWrapper?: ViewWrapperComponent;
};

const wrap = (
  Component: ViewComponent,
  Wrapper?: ViewWrapperComponent
): ViewComponent => {
  if (Wrapper === undefined) return Component;

  return (props: ViewComponentProps) => (
    <Wrapper {...props}>
      <Component {...props} />
    </Wrapper>
  );
};

const createViews = (
  loadedModule: Record<string, unknown>,
  viewWrapper?: ViewWrapperComponent
): readonly View[] =>
  Object.entries(loadedModule)
    .filter(
      ([, value]) => isValidElementType(value) && typeof value !== 'string'
    )
    .map(([name, value]) => ({
      name,
      title: startCase(name),
      component: wrap(value as ViewComponent, viewWrapper),
    }));

export const defaultViewResolverFactory = ((
  loadedModule: unknown,
  { viewWrapper }: ViewResolverFactoryOptions = {}
) => {
  if (!isObject(loadedModule)) return nullViewResolver;

  const views = createViews(loadedModule, viewWrapper);

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
