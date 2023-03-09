export const upperFirst = <S extends string>(str: S): Capitalize<S> =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}` as Capitalize<S>;
