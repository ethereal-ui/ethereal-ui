import { createClassNameFunction } from './createClassNameFunction';

export const elementClassNamePropertyDescriptors = (
  prefix: string,
  name: string,
  elements: readonly string[]
): PropertyDescriptorMap =>
  Object.fromEntries(
    elements.map(element => [
      element,
      {
        value: createClassNameFunction(prefix, `${name}-${element}`),
        enumerable: false,
      },
    ])
  );
