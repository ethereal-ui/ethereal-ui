export const mapValues = <
  Source extends Record<string, unknown>,
  F extends (value: Source[keyof Source], key: keyof Source) => unknown,
  Result extends Record<keyof Source, ReturnType<F>>,
>(
  obj: Source,
  fn: F
): Result =>
  Object.fromEntries(
    Object.entries(obj).map(([name, value]) => [
      name,
      fn(value as Source[keyof Source], name),
    ])
  ) as Result;
