import type { ModifierSelectors, ModifiersSpec } from './types';

export const modifierSelectors = <
  P extends string,
  N extends string,
  M extends ModifiersSpec,
>(
  prefix: P,
  name: N,
  modifiers: M
): ModifierSelectors<P, N, M> =>
  Object.fromEntries(
    Object.entries(modifiers).map(([modifierName, value]) => {
      if (Array.isArray(value)) {
        return [
          modifierName,
          Object.fromEntries(
            value.map(modifierValue => [
              modifierValue,
              `.${prefix}-${name}.${prefix}--${modifierName}-${modifierValue}`,
            ])
          ),
        ];
      }
      return [modifierName, `.${prefix}-${name}.${prefix}--${modifierName}`];
    })
  ) as ModifierSelectors<P, N, M>;
