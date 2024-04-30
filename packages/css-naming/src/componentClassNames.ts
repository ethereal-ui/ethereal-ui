import type {
  ComponentClassNameOptions,
  ComponentClassNames,
  ComponentSelectors,
  MapModifiersSpec,
  ModifiersSpec,
} from './types';

import { createClassNameFunction } from './createClassNameFunction';
import { modifierSelectors } from './modifierSelectors';
import { elementSelectors } from './elementSelectors';
import { elementClassNamePropertyDescriptors } from './elementClassNamePropertyDescriptors';

export const defaultPrefix = 'eui' as const;

export const componentClassNames = <
  N extends string,
  E extends string,
  M extends ModifiersSpec,
  P extends string = typeof defaultPrefix,
>(
  name: N,
  {
    prefix = defaultPrefix as P,
    elements = [],
    modifiers,
  }: ComponentClassNameOptions<P, E, M> = {
    elements: [],
  }
): readonly [ComponentClassNames<E, M>, ComponentSelectors<P, N, E, M>] => [
  Object.defineProperties(
    createClassNameFunction<MapModifiersSpec<M>>(prefix, name),
    elementClassNamePropertyDescriptors(prefix, name, elements)
  ) as ComponentClassNames<E, M>,
  {
    ...elementSelectors(prefix, name, elements),
    root: `.${prefix}-${name}`,
    modifiers: modifierSelectors(prefix, name, modifiers ?? ({} as M)),
  },
];
