import { createRoot } from 'react-dom/client';
import { lazy, Suspense, type ReactNode } from 'react';

import { defaultOptions } from '../plugin/defaultOptions';

import { NoPreviewsMessage } from './components/NoPreviewsMessage';
import { NotFoundMessage } from './components/NotFoundMessage';

import { findModule } from './util/findModule';

import { LoadingIndicator } from './components/LoadingIndicator';
import { ViewNotFoundMessage } from './components/ViewNotFoundMessage';
import { PreviewIndex } from './components/PreviewIndex';

import type { Modules } from './Modules';
import type { ViewResolverFactory } from './view-resolver/ViewResolverFactory';
import { defaultViewResolverFactory } from './view-resolver/defaultViewResolverFactory';

type RenderParams = {
  include?: string | readonly string[];
  route?: string;
  path?: string;
  viewName?: string;
  viewResolverFactory?: ViewResolverFactory;
};

const renderNode = (container: Element, node: ReactNode): (() => void) => {
  const root = createRoot(container);
  root.render(node);
  return () => root.unmount();
};

export const render = (
  container: Element,
  modules: Modules,
  {
    path,
    viewName,
    include = defaultOptions.include,
    route = defaultOptions.route,
    viewResolverFactory = defaultViewResolverFactory,
  }: RenderParams = {}
): (() => void) => {
  const moduleNames = Object.keys(modules);

  if (moduleNames.length === 0) {
    return renderNode(container, <NoPreviewsMessage include={include} />);
  }

  if (!path) {
    return renderNode(
      container,
      <PreviewIndex moduleNames={moduleNames} route={route} />
    );
  }

  const found = findModule(modules, path);

  if (!found) {
    return renderNode(
      container,
      <NotFoundMessage
        path={path}
        viewName={viewName}
        moduleNames={moduleNames}
      />
    );
  }
  const [moduleName, loader] = found;

  const Component = lazy(async () => {
    const viewResolver = viewResolverFactory(await loader());
    const view = viewResolver.findView(viewName);
    const ViewComponent = view?.component ?? ViewNotFoundMessage;

    return {
      default: () => (
        <ViewComponent
          modules={modules}
          moduleName={moduleName}
          viewName={viewName ?? view?.name}
          viewTitle={view?.title}
        />
      ),
    };
  });

  return renderNode(
    container,
    <Suspense fallback={<LoadingIndicator />}>
      <Component />
    </Suspense>
  );
};
