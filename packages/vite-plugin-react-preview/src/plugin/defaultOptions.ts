import type { Options } from './Options';

export const defaultOptions: Options = {
  include: '/**/*.preview.{jsx,tsx}',
  route: '/_preview',
  viewResolverFactory: {
    import: 'defaultViewResolverFactory',
    from: '@ethereal-ui/vite-plugin-react-preview/viewer',
  },
};
