import type { Options } from './Options';

const isValidIdentifier = (identifier: string) =>
  /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(identifier);

export const normalizeViewResolverFactoryOption = ({
  import: importString,
  from,
}: Options['viewResolverFactory']): Options['viewResolverFactory'] => {
  if (!isValidIdentifier(importString)) {
    throw Error(
      [
        "Invalid identifier for 'viewResolverFactory.import' in reactPreview plugin configuration.",
        "The 'import' field must be a valid JavaScript identifier.",
      ].join('\n')
    );
  }

  return {
    import: importString,
    from: from.startsWith('./') ? from.slice(1) : from,
  };
};
