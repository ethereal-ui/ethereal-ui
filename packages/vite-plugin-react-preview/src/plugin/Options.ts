export type Options = {
  /**
   * Glob expression for preview files to include. It must follow a
   * syntax accepted by
   * [Vite's Glob Import](https://vitejs.dev/guide/features#glob-import).
   */
  include: string;

  /**
   * HTTP route for the preview endpoint. (default: `/_preview`)
   */
  route: string;

  /**
   * Configuration to import a wrapper component for preview contents.
   *
   * Example:
   *
   * ```ts
   * {
   *   import: 'Wrapper',
   *   from: './src/Wrapper',
   * }
   * ```
   */
  componentWrapper: {
    import: string;
    from: string;
  };
};
