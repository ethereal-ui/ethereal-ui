export const normalizeGlobString = (glob: string): string => {
  if (glob.startsWith('./')) {
    return glob.slice(1);
  }

  return !glob.startsWith('/') ? `/${glob}` : glob;
};

export const normalizeGlob = <T extends string | readonly string[]>(
  glob: T
): T =>
  (typeof glob === 'string'
    ? normalizeGlobString(glob)
    : glob.map(normalizeGlobString)) as T;
