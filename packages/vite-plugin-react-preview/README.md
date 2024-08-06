# @ethereal-ui/vite-plugin-react-preview
![NPM Version](https://img.shields.io/npm/v/%40ethereal-ui%2Fvite-plugin-react-preview?label=%20)


Quickly preview React components with Vite.

- 🍃 **Lightweight:** Thin layer on top of Vite functionality.
- 🛠️ **Minimal configuration:** Add one plugin, and you’re ready.
- ⚡️ **Hot-reload:** Instant preview updates.
- 🚀 **Non-intrusive:** Doesn’t interfere with your production bundle.
- 🔌 **Extensible:** Wrap previews with your React components for theming or visual helpers.
- 🤝 **Compatible with StoryBook**
- ✅ **No Telemetry**

## Installation

```sh
# npm
npm install @ethereal-ui/vite-plugin-react-preview

# yarn
yarn add @ethereal-ui/vite-plugin-react-preview

# pnpm
pnpm add @ethereal-ui/vite-plugin-react-preview
```

## Usage

Once you install the plugin, add it to your Vite configuration:

```js
import { defineConfig } from 'vite';
import reactPreview from '@ethereal-ui/vite-plugin-react-preview';

export default defineConfig({
  // ...
  plugins: [reactPreview()],
});
```

Create a file with the extension `.preview.tsx` (or `.preview.jsx`) in your
source directory. The plugin will treat each export containing a valid React
component type as a view to visualize.

Run Vite and open a browser using the route `/_preview`. Your preview file will
be listed there; click it to view it. The preview uses Vite’s hot reload,
keeping it up-to-date as you change the code.

<!-- prettier-ignore-start -->
> [!TIP]
> Combine this plugin with **VSCode built-in Simple Browser**
> -or a [similar extension](https://marketplace.visualstudio.com/items?itemName=antfu.browse-lite)-
> to get a side-by-side instant preview of your React component.
<!-- prettier-ignore-end -->

### Usage with Storybook

In most cases, the preview files are compatible with the
[Storybook CSFv2 format](https://storybook.js.org/docs/6/writing-stories#component-story-format),
so you can include them as another story. The plugin will ignore any exports
that are not React component types, allowing you to use
[CSFv3 objects](https://storybook.js.org/docs/api/csf) side-by-side with the
exported previews.

## Configuration

### Files to Include

The plugin will look for files matching `**/*.preview.{jsx,tsx}` by default, but
you can change that with the `include` option:

```js
export default defineConfig({
  plugins: [
    reactPreview({
      include: '**/*.stories.tsx',
    }),
  ],
});
```

<!-- prettier-ignore-start -->
> [!NOTE]
> While it’s possible to include any file exporting a valid React
> component, using `**/*.tsx` is not recommended. A project may
> contain many React components; not all will render correctly
> without the proper setup.
<!-- prettier-ignore-end -->

The `include` option supports string arrays and excludes patterns (the plugin
uses [Vite glob imports](https://vitejs.dev/guide/features.html#glob-import)):

```js
export default defineConfig({
  plugins: [
    reactPreview({
      include: ['./dir/*.js', '!**/bar.js'],
    }),
  ],
});
```

### Preview Server Route

The plugin hooks into the dev server’s `/_preview` route, but you can change
that with the `route` option:

```js
export default defineConfig({
  plugins: [
    reactPreview({
      route: '/other', // respond to http://localhost:<port>/other
    }),
  ],
});
```

## Advanced Configuration

While this plugin provides minimal functionality for previewing React
components, you can extend it and customize how components are obtained and
rendered from a module.

The plugin supports an option called `viewResolverFactory`. This option receives
an object that imitates the JavaScript `import` statement. The `from` field
indicates the module to import, and the `import` field indicates the name to
import:

```js
export default defineConfig({
  plugins: [
    reactPreview({
      viewResolverFactory: {
        import: 'myViewResolverFactory',
        from: './src/myViewResolverFactory',
      },
    }),
  ],
});
```

### What is a `viewResolverFactory`?

A `viewResolverFactory` is a function that receives the loaded preview module
and returns an object implementing the `ViewResolver` interface. To parse the
previous sentence, we'll need to explain some of the terms used by the plugin
implementation.

A preview module exports views. A `View` is an object with a name, title, and
the React component to render.

```ts
type View = Readonly<{
  name: string;
  title: string;
  component: ComponentType<ViewComponentProps>;
}>;
```

A `ViewResolver` translates a module (an unknown object loaded by a dynamic
import) into instances of `View`:

```ts
type ViewResolver = {
  readonly views: readonly View[];
  findView(viewName?: string): View | undefined;
};
```

A `ViewResolverFactory` is a function that receives the loaded module and
returns a `ViewResolver`:

```ts
type ViewResolverFactory = {
  (loadedModule: unknown): ViewResolver;
};
```

### Putting all together

If you like to wrap the views with your component, you can create a custom
`ViewResolverFactory` that uses the default factory included in the plugin:

```tsx
import {
  defaultViewResolverFactory,
  type ViewResolverFactory,
  type ViewWrapperProps,
} from '@ethereal-ui/vite-plugin-react-preview/viewer';

const MyViewWrapper = ({ viewTitle, children }: ViewWrapperProps) => (
  <div>
    <h1>{viewTitle}</h1>
    <div>{children}</div>
  </div>
);

export const myViewResolverFactory: ViewResolverFactory = loadedModule =>
  defaultViewResolverFactory(loadedModule, { viewWrapper: MyViewWrapper });
```

Then, set up that `ViewResolverFactory` in the plugin options:

```js
export default defineConfig({
  plugins: [
    reactPreview({
      viewResolverFactory: {
        import: 'myViewResolverFactory',
        from: './src/myViewResolverFactory',
      },
    }),
  ],
});
```

A complex `ViewResolverFactory` implementation can take the loaded module and
create a React component based on its exported value (like StoryBook's CSFv3
does):

```tsx
import type { ViewResolverFactory } from '@ethereal-ui/vite-plugin-react-preview/viewer';

export const myViewResolverFactory: ViewResolverFactory = loadedModule => {
  // This is an example; these functions don't exist in the plugin
  const views = transformCSFObjectsIntoViews(loadedModule);
  const findView = createFindViewImpl(views);

  return {
    views,
    findView,
  };
};
```
