import { expect, test } from 'vitest';

import { defaultOptions } from './defaultOptions';
import { createPreviewPage } from './createPreviewPage';

test('Quote include pattern', () => {
  expect(createPreviewPage(defaultOptions)).toMatchInlineSnapshot(`
    "<html lang="en">
      <head>
        <title>React Preview</title>
      </head>
      <body>
        <script type="module">
          import {render} from '@ethereal-ui/vite-plugin-react-preview/viewer';
          import { defaultViewResolverFactory as __viewResolverFactory__ } from '@ethereal-ui/vite-plugin-react-preview/viewer';
          const params = new URLSearchParams(window.location.search);
          const modules = import.meta.glob("/**/*.preview.{jsx,tsx}");

          render(document.getElementById('root'), modules, {
            path: params.get('path') ?? params.get('p') ?? undefined,
            viewName: params.get('view') ??  params.get('v') ?? undefined,
            include: "/**/*.preview.{jsx,tsx}",
            route: "/_preview",
            viewResolverFactory: __viewResolverFactory__
          });
        </script>
        <div id="root"></div>
      </body>
    </html>
    "
  `);
});

test('Supports an include array', () => {
  expect(
    createPreviewPage({ ...defaultOptions, include: ['*.tsx', '!demo.tsx'] })
  ).toMatchInlineSnapshot(`
    "<html lang="en">
      <head>
        <title>React Preview</title>
      </head>
      <body>
        <script type="module">
          import {render} from '@ethereal-ui/vite-plugin-react-preview/viewer';
          import { defaultViewResolverFactory as __viewResolverFactory__ } from '@ethereal-ui/vite-plugin-react-preview/viewer';
          const params = new URLSearchParams(window.location.search);
          const modules = import.meta.glob(["*.tsx","!demo.tsx"]);

          render(document.getElementById('root'), modules, {
            path: params.get('path') ?? params.get('p') ?? undefined,
            viewName: params.get('view') ??  params.get('v') ?? undefined,
            include: ["*.tsx","!demo.tsx"],
            route: "/_preview",
            viewResolverFactory: __viewResolverFactory__
          });
        </script>
        <div id="root"></div>
      </body>
    </html>
    "
  `);
});
