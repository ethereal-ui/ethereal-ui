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
          import { DefaultComponentWrapper as __wrapper__ } from '@ethereal-ui/vite-plugin-react-preview/viewer';
          const params = new URLSearchParams(window.location.search);
          const modules = import.meta.glob("/**/*.preview.tsx");

          render(document.getElementById('root'), modules, {
            path: params.get('path') ?? params.get('p') ?? undefined,
            view: params.get('view') ??  params.get('v') ?? undefined,
            include: "/**/*.preview.tsx",
            route: "/_preview",
            componentWrapper: __wrapper__
          });
        </script>
        <div id="root"></div>
      </body>
    </html>
    "
  `);
});
