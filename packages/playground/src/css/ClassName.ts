export interface ClassName<Modifier extends string> {
  (
    ...names: (
      | readonly Modifier[]
      | Record<Modifier, boolean>
      | string
      | undefined
    )[]
  ): string;
}
