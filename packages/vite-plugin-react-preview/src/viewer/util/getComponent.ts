import type { ComponentType } from 'react';
import { isValidElementType } from 'react-is';

import { isObject } from './isObject';

export const getComponent = (
  loadedModule: unknown,
  view?: string
): ComponentType | undefined => {
  if (!isObject(loadedModule)) return undefined;

  const entries = Object.entries(loadedModule);
  if (entries.length === 0) return undefined;

  const component =
    view === undefined
      ? (loadedModule['default'] ?? loadedModule[entries[0]![0]!])
      : loadedModule[view];

  // An ElementType is a ComponentType + IntrinsicElements (div, etc).
  // Other React APIs like React.lazy only accept ComponentType, which
  // may be a mistake in React's TypeScript definitions. However, to
  // comply with the React API contracts, I decided to filter anything
  // that is not a ComponentType. It will be very rare to return only a
  // string like "div" and if users need to do that, they have an easy
  // workaround, which is to use `props => <div {...props}>`.
  return isValidElementType(component) && typeof component !== 'string'
    ? (component as ComponentType)
    : undefined;
};
