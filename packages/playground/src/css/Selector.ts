export interface Selector<Modifier extends string> {
  (...names: readonly Modifier[]): string;
}
