export const createPreviewPage = (
  include: string
) => /* html */ `<html lang="en">
  <head>
    <title>React Preview</title>
  </head>
  <body>
    <script type="module">
      import {render} from '@ethereal-ui/vite-plugin-react-preview/viewer';
      const params = new URLSearchParams(window.location.search);
      const modules = import.meta.glob(${JSON.stringify(include)});

      render(
        document.getElementById('root'),
        modules,
        params.get('path'),
        params.get('view')
      );
    </script>
    <div id="root"></div>
  </body>
</html>
`;
