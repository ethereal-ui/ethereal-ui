import { modifierClassName } from './modifierClassName';
import type { ClassNameFunctionWithModifiers, Modifiers } from './types';

export const createClassNameFunction = <M extends Modifiers>(
  prefix: string,
  name: string
): ClassNameFunctionWithModifiers<M> => {
  const root = `${prefix}-${name}`;

  const cn: ClassNameFunctionWithModifiers<Modifiers> = (
    className,
    modifiers
  ) => {
    const baseClassName = modifiers
      ? [
          root,
          ...Object.entries(modifiers).map(entry =>
            modifierClassName(prefix, ...entry)
          ),
        ].join(' ')
      : root;

    return { className: `${baseClassName}${className ? ` ${className}` : ''}` };
  };

  cn.className = root;

  return cn;
};
