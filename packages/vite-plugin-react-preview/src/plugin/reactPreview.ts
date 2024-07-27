import type { PluginOption } from 'vite';

import type { Options } from './Options';
import { createPreviewPage } from './createPreviewPage';
import { normalizeGlob } from './normalizeGlob';
import { defaultOptions } from './defaultOptions';
import { normalizeComponentWrapperOption } from './normalizeComponentWrapperOption';

/**
 * Loads a dev server endpoint to show a React component preview.
 */
export const reactPreview = ({
  include = defaultOptions.include,
  route = defaultOptions.route,
  componentWrapper = defaultOptions.componentWrapper,
}: Partial<Options> = defaultOptions): PluginOption => {
  const previewPage = createPreviewPage({
    include: normalizeGlob(include),
    route,
    componentWrapper: normalizeComponentWrapperOption(componentWrapper),
  });

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
