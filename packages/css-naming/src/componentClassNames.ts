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

/**
 * Returns a tuple with objects that help format CSS class names and
 * selectors according to a naming convention (for additional details,
 * see the module README).
 *
 * @param name the component's name
 * @param options optional
 * @param options.prefix the class names prefix (`eui` by default)
 * @param options.elements an array with the sub-elements names
 * @param options.modifiers an object specifying the modifiers
 */
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
