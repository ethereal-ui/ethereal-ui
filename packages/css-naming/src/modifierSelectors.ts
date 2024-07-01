import type { ModifierSelectors, ModifiersSpec } from './types';

const modifierValuesSelector = (
  prefix: string,
  name: string,
  modifierName: string,
  value: readonly string[]
): Record<string, string> =>
  Object.fromEntries(
    value.map(modifierValue => [
      modifierValue,
      `.${prefix}-${name}.${prefix}--${modifierName}-${modifierValue}`,
    ])
  );

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
    Object.entries(modifiers).map(([modifierName, value]) => [
      modifierName,
      Array.isArray(value)
        ? modifierValuesSelector(prefix, name, modifierName, value)
        : `.${prefix}-${name}.${prefix}--${modifierName}`,
    ])
  ) as ModifierSelectors<P, N, M>;
