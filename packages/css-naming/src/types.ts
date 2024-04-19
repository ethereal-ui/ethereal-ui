export type ModifiersSpec = Record<string, readonly string[] | typeof Boolean>;

export type MapModifiersSpec<M extends ModifiersSpec> = {
  [K in keyof M]?: M[K] extends readonly string[]
    ? M[K][number] | boolean
    : boolean;
};

export type Modifiers = Partial<Record<string, string | boolean>>;

export interface ClassNameProp {
  className?: string;
}

export interface ClassNameFunctionWithModifiers<M extends Modifiers>
  extends Required<ClassNameProp> {
  (className?: string, modifiers?: M): ClassNameProp;
}

export interface ClassNameFunction extends Required<ClassNameProp> {
  (className?: string): ClassNameProp;
}

export type ComponentClassNames<
  E extends string,
  M extends ModifiersSpec,
> = ClassNameFunctionWithModifiers<MapModifiersSpec<M>> &
  Record<E, ClassNameFunction>;

export type ModifierSelectors<
  P extends string,
  N extends string,
  M extends ModifiersSpec,
> = {
  [k in keyof M]: M[k] extends readonly string[]
    ? k extends string
      ? { [s in M[k][number]]: `.${P}-${N}.${P}--${k}-${s}` }
      : never
    : k extends string
      ? `.${P}-${N}.${P}--${k}`
      : never;
};

export type ElementSelectors<
  P extends string,
  N extends string,
  E extends string,
> = {
  [K in E]: `.${P}-${N}-${K}`;
};

export type ComponentSelectors<
  P extends string,
  N extends string,
  E extends string,
  M extends ModifiersSpec,
> = {
  root: `.${P}-${N}`;
  modifiers: ModifierSelectors<P, N, M>;
} & ElementSelectors<P, N, E>;

export interface ComponentClassNameOptions<
  P extends string,
  E extends string,
  M extends ModifiersSpec,
> {
  prefix?: P;
  elements?: readonly E[];
  modifiers?: M;
}
