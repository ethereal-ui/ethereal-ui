export interface ClassName<Modifier extends string> {
  (
    ...names: (
      | readonly (Modifier | undefined)[]
      | Record<Modifier, boolean>
      | string
      | undefined
    )[]
  ): string;
}
