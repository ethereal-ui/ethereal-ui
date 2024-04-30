export const lazy = <T>(initialize: () => T): (() => T) => {
  let value: T;

  return () => {
    if (value) return value;

    value = initialize();
    return value;
  };
};
