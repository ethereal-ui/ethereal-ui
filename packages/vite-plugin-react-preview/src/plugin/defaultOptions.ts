import type { Options } from './Options';

export const defaultOptions: Options = {
  include: '/**/*.preview.tsx',
  route: '/_preview',
  componentWrapper: {
    import: 'DefaultComponentWrapper',
    from: '@ethereal-ui/vite-plugin-react-preview/viewer',
  },
};
