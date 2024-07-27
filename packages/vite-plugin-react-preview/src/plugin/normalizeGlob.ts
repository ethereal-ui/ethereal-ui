export const normalizeGlob = (glob: string): string => {
  if (glob.startsWith('./')) {
    return glob.slice(1);
  }

  return !glob.startsWith('/') ? `/${glob}` : glob;
};
