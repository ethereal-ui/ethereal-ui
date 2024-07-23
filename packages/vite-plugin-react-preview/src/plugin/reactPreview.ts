import type { PluginOption } from 'vite';

import type { Options } from './Options';
import { createPreviewPage } from './createPreviewPage';
import { normalizeGlob } from './normalizeGlob';

const defaultOptions: Options = {
  include: '/**/*.preview.tsx',
  route: '/_preview',
};

export const reactPreview = ({
  include = defaultOptions.include,
  route = defaultOptions.route,
}: Partial<Options> = defaultOptions): PluginOption => {
  const previewPage = createPreviewPage(normalizeGlob(include));

  return {
    name: 'reactPreview',
    apply: 'serve',

    configureServer(server) {
      server.middlewares.use(route, async (_req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.end(await server.transformIndexHtml(route, previewPage));
      });
    },
  };
};
