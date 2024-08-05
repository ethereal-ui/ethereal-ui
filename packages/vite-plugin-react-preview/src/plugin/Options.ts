export type Options = {
  /**
   * Glob expression for preview files to include. It must follow a
   * syntax accepted by
   * [Vite's Glob Import](https://vitejs.dev/guide/features#glob-import).
   */
  include: string | readonly string[];

  /**
   * HTTP route for the preview endpoint. (default: `/_preview`)
   */
  route: string;

  /**
   * Configuration to import a view resolver factory.
   *
   * Example:
   *
   * ```ts
   * {
   *   import: 'myViewResolverFactory',
   *   from: './src/myViewResolverFactory',
   * }
   * ```
   */
  viewResolverFactory: {
    import: string;
    from: string;
  };
};
