import type { PluginOption } from 'vite';
import { lazy } from '@ethereal-ui/util';

import type {
  GenerateCssFileConfig,
  GenerateCssOptions,
} from './GenerateCssOptions';
import { optimizeCssSource } from './optimizeCssSource';

const mapToString = (source: GenerateCssFileConfig['source']): string => {
  if (typeof source === 'string') return source;

  return Object.entries(source)
    .map(([, value]) => (typeof value === 'string' ? value : ''))
    .join(`\n`);
};

const normalize = <T extends unknown>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value];

interface GenerateCssFileEntry {
  fileName: string;
  source: string;
  endpoint: string;
}

const createCssFileEntry = ({
  fileName,
  source,
}: GenerateCssFileConfig): GenerateCssFileEntry => {
  const optimizedSource = lazy(() =>
    optimizeCssSource(fileName, mapToString(source))
  );

  return {
    fileName,

    get source() {
      return optimizedSource();
    },

    endpoint: fileName.startsWith('/') ? fileName : `/${fileName}`,
  };
};

const createCssFileEntries = (configs: GenerateCssFileConfig[]) =>
  configs.map(createCssFileEntry);

export const generateCss = (options: GenerateCssOptions): PluginOption => {
  const files = createCssFileEntries(normalize(options));

  return {
    name: 'generateCss',

    generateBundle() {
      for (const { fileName, source } of files) {
        this.emitFile({ type: 'asset', fileName, source });
      }
    },

    transformIndexHtml(html) {
      const styleTags = files
        .map(({ endpoint }) => `<link href=${endpoint} rel="stylesheet" />`)
        .join('\n');

      return html.replace('</head>', `${styleTags}</head>`);
    },

    configureServer(server) {
      for (const { endpoint, source } of files) {
        server.middlewares.use(endpoint, (_req, res) => {
          res.setHeader('Content-Type', 'text/css');
          res.end(source);
        });
      }
    },
  };
};
