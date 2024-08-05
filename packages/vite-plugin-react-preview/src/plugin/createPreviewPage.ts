import type { Options } from './Options';

export const createPreviewPage = ({
  include,
  route,
  viewResolverFactory,
}: Options) => /* html */ `<html lang="en">
  <head>
    <title>React Preview</title>
  </head>
  <body>
    <script type="module">
      import {render} from '@ethereal-ui/vite-plugin-react-preview/viewer';
      import { ${viewResolverFactory.import} as __viewResolverFactory__ } from '${viewResolverFactory.from}';
      const params = new URLSearchParams(window.location.search);
      const modules = import.meta.glob(${JSON.stringify(include)});

      render(document.getElementById('root'), modules, {
        path: params.get('path') ?? params.get('p') ?? undefined,
        viewName: params.get('view') ??  params.get('v') ?? undefined,
        include: ${JSON.stringify(include)},
        route: ${JSON.stringify(route)},
        viewResolverFactory: __viewResolverFactory__
      });
    </script>
    <div id="root"></div>
  </body>
</html>
`;
