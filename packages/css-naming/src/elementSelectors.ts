import type { ElementSelectors } from './types';

export const elementSelectors = <
  P extends string,
  N extends string,
  E extends string,
>(
  prefix: P,
  name: N,
  elements: readonly E[]
): ElementSelectors<P, N, E> =>
  Object.fromEntries(
    elements.map(e => [e, `.${prefix}-${name}-${e}`])
  ) as ElementSelectors<P, N, E>;
