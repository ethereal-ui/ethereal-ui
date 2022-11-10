import type { CssMeta } from './CssMeta.js';
import { Selector } from './Selector';
import { DescendantsSpec } from './DescendantsSpec';
import { ClassName } from './ClassName';

const isModifierArray = <Modifier extends string>(
  arrayOrObject: readonly Modifier[] | Record<Modifier, boolean>
): arrayOrObject is readonly Modifier[] => Array.isArray(arrayOrObject);

const createClassNames =
  <Modifier extends string>(
    prefix: string,
    _modifiers?: readonly Modifier[]
  ): ClassName<Modifier> =>
  (...names) =>
    [prefix, ...names]
      .flatMap(name => {
        if (typeof name === 'undefined') return [];
        if (typeof name === 'string') return name;

        return isModifierArray(name)
          ? name.map(n => `${prefix}-${n}`)
          : Object.keys(name)
              .filter(n => Boolean(name[n as Modifier]))
              .map(n => `${prefix}-${n}`);
      })
      .join(' ');

const createSelectors =
  <Modifier extends string>(
    prefix: string,
    _modifiers?: readonly Modifier[]
  ): Selector<Modifier> =>
  (...names) =>
    `.${prefix}${names.map(name => `.${prefix}-${name}`).join('')}`;

const mapValues = <O extends {}, F extends (v: O[keyof O], n: keyof O) => R, R>(
  obj: O,
  fn: F
) => {
  type K = keyof O;
  return Object.fromEntries(
    Object.entries(obj).map(([name, value]) => [
      name,
      fn(value as O[K], name as K),
    ])
  ) as Record<K, R>;
};

export const createCssMeta = <
  Modifier extends string,
  Descendants extends DescendantsSpec<DescendantName>,
  DescendantName extends string
>(
  componentName: string,
  modifiers?: readonly Modifier[],
  descendantsSpec?: Descendants
): CssMeta<Modifier, Descendants, DescendantName> => {
  const prefix = `eui-${componentName}`;

  function* allClassNames() {
    yield prefix;

    for (const modifier of modifiers ?? []) yield `${prefix}-${modifier}`;

    if (descendantsSpec) {
      for (const [descendant, descModifiers] of Object.entries<
        readonly string[]
      >(descendantsSpec))
        for (const modifier of descModifiers)
          yield `${prefix}_${descendant}-${modifier}`;
    }
  }

  function* descendants() {
    for (const name of Object.keys(descendantsSpec ?? {}))
      yield name as DescendantName;
  }

  return {
    className: Object.assign(
      createClassNames(prefix, modifiers),
      mapValues(descendantsSpec ?? {}, (mods, descendant) =>
        createClassNames(`${prefix}_${String(descendant)}`, mods)
      )
    ) as CssMeta<Modifier, Descendants, DescendantName>['className'],

    selector: Object.assign(
      createSelectors(prefix, modifiers),
      mapValues(descendantsSpec ?? {}, (mods, descendant) =>
        createSelectors(`${prefix}_${String(descendant)}`, mods)
      )
    ) as CssMeta<Modifier, Descendants, DescendantName>['selector'],

    allClassNames,

    descendants,
  };
};
