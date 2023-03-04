export const filterTruthy = <T>(
  arr: readonly (T | '' | 0 | undefined | null | false)[]
): T[] => arr.filter(Boolean) as T[];
