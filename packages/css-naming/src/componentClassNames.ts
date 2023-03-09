import { filterTruthy } from '@ethereal-ui/util';

export const defaultClassNamePrefix = 'eui';

type ClassNamesArgs<Modifier extends string = string> = ReadonlyArray<
  | Modifier
  | Record<Modifier, boolean>
  | { className?: string | undefined }
  | false
  | null
  | undefined
>;

// https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379094672
export type ClassNames<Modifier extends string> = [Modifier] extends [never]
  ? () => string
  : (...modifier: ClassNamesArgs<Modifier>) => string;

export type SelectorNames<Modifier extends string> = [Modifier] extends [never]
  ? () => string
  : (...modifier: readonly Modifier[]) => string;

export type DescendantsSpec<K extends string> = Readonly<
  Record<K, readonly string[] | undefined | null>
>;

export type DescendantClassNames<Descendants extends DescendantsSpec<string>> =
  {
    [K in keyof Descendants]: ClassNames<
      Exclude<Descendants[K], undefined | null>[number]
    >;
  };

export type DescendantSelectorNames<
  Descendants extends DescendantsSpec<string>
> = {
  [K in keyof Descendants]: SelectorNames<
    Exclude<Descendants[K], undefined | null>[number]
  >;
};

export interface ComponentClassNames<
  Modifier extends string,
  Descendants extends DescendantsSpec<string>
> {
  cn: ClassNames<Modifier> &
    ([Descendants] extends [never] ? {} : DescendantClassNames<Descendants>);

  sel: SelectorNames<Modifier> &
    ([Descendants] extends [never] ? {} : DescendantSelectorNames<Descendants>);
}

export interface ComponentClassNamesOptions {
  prefix?: string;
}

const modifierClassNames = (
  prefix: string,
  modifiers: ClassNamesArgs
): string =>
  filterTruthy(modifiers)
    .flatMap(modifier => {
      switch (typeof modifier) {
        case 'string':
          return `${prefix}_${modifier}`;
        case 'object':
          return Object.entries(modifier)
            .filter(([, value]) => Boolean(value))
            .map(([mod, value]) =>
              mod === 'className' ? value : `${prefix}_${mod}`
            );
        default:
          return [];
      }
    })
    .join(' ');

const createClassNames =
  (prefix: string) =>
  (...modifiers: readonly string[]) =>
    modifiers.length > 0
      ? [prefix, modifierClassNames(prefix, modifiers)].join(' ').trimEnd()
      : prefix;

const createSelectorNames =
  (prefix: string) =>
  (...modifiers: readonly string[]) =>
    modifiers.length > 0
      ? [`.${prefix}`, modifierClassNames(prefix, modifiers)].join('.')
      : `.${prefix}`;

const { assign, fromEntries, keys } = Object;

export const componentClassNames = <
  Modifier extends string = never,
  Descendants extends DescendantsSpec<string> = never
>(
  componentName: string,
  _modifiers?: readonly Modifier[],
  descendants: Descendants = {} as any,
  { prefix = defaultClassNamePrefix }: ComponentClassNamesOptions = {}
): ComponentClassNames<Modifier, Descendants> => {
  const componentPrefix = `${prefix}-${componentName}`;

  const cn = assign(
    createClassNames(componentPrefix),
    fromEntries(
      keys(descendants).map(name => [
        name,
        createClassNames(`${componentPrefix}-${name}`),
      ])
    )
  );

  const sel = assign(
    createSelectorNames(componentPrefix),
    fromEntries(
      keys(descendants).map(name => [
        name,
        createSelectorNames(`${componentPrefix}-${name}`),
      ])
    )
  );

  return {
    cn,
    sel,
  } as ComponentClassNames<Modifier, Descendants>;
};
