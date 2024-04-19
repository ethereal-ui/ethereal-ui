export const modifierClassName = (
  prefix: string,
  modifierName: string,
  value?: string | boolean | 0 | null
): string => {
  if (!value) return '';

  return typeof value === 'string'
    ? `${prefix}--${modifierName}-${value}`
    : `${prefix}--${modifierName}`;
};
