export type StringsToUnion<T> = T extends readonly [infer First, ...infer Rest]
  ? First extends string
    ? First | StringsToUnion<Rest>
    : StringsToUnion<Rest>
  : never;
