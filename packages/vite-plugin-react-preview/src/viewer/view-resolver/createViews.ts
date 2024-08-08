import { isValidElementType } from 'react-is';
import type { ComponentType } from 'react';

import { startCase } from '../util/startCase';

import type { View } from './View';
import type { ViewComponentProps } from './ViewComponentProps';
import type { ViewWrapperProps } from './ViewWrapperProps';
import { wrapView } from './wrapView';

type ViewComponent = ComponentType<ViewComponentProps>;
type ViewWrapperComponent = ComponentType<ViewWrapperProps>;

export const createViews = (
  loadedModule: Record<string, unknown>,
  viewWrapper?: ViewWrapperComponent,
  viewFilter: (name: string, value: unknown) => boolean = () => true
): readonly View[] =>
  Object.entries(loadedModule)
    .filter(
      ([name, value]) =>
        viewFilter(name, value) &&
        isValidElementType(value) &&
        typeof value !== 'string'
    )
    .map(([name, value]) => ({
      name,
      title: startCase(name),
      component: wrapView(value as ViewComponent, viewWrapper),
    }));
