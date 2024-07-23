import { type ElementType } from 'react';
import { isValidElementType } from 'react-is';

import { isObject } from './isObject';

export const getComponent = (
  loadedModule: unknown,
  view?: string
): ElementType | undefined => {
  if (!isObject(loadedModule)) return undefined;

  const entries = Object.entries(loadedModule);
  if (entries.length === 0) return undefined;

  const component =
    view === undefined
      ? (loadedModule['default'] ?? loadedModule[entries[0]![0]!])
      : loadedModule[view];

  return isValidElementType(component) ? component : undefined;
};
