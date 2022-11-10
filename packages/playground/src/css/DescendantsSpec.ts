export type DescendantsSpec<K extends string> = Readonly<
  Record<K, readonly string[]>
>;
