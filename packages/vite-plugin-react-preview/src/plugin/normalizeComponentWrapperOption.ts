import type { Options } from './Options';

const isValidIdentifier = (identifier: string) =>
  /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(identifier);

export const normalizeComponentWrapperOption = ({
  import: importString,
  from,
}: Options['componentWrapper']): Options['componentWrapper'] => {
  if (!isValidIdentifier(importString)) {
    throw Error(
      [
        "Invalid identifier for 'componentWrapper.import' in reactPreview plugin configuration.",
        "The 'import' field must be a valid JavaScript identifier.",
      ].join('\n')
    );
  }

  return {
    import: importString,
    from: from.startsWith('./') ? from.slice(1) : from,
  };
};
