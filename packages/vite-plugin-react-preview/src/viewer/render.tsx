import { createRoot } from 'react-dom/client';
import { lazy, Suspense, type ComponentType, type ReactNode } from 'react';

import { defaultOptions } from '../plugin/defaultOptions';

import { NoPreviewsMessage } from './components/NoPreviewsMessage';
import { NotFoundMessage } from './components/NotFoundMessage';

import { findModule } from './util/findModule';
import { getComponent } from './util/getComponent';

import { LoadingIndicator } from './components/LoadingIndicator';
import { ViewNotFoundMessage } from './components/ViewNotFoundMessage';
import { PreviewIndex } from './components/PreviewIndex';

import type { Modules } from './Modules';
import type { ComponentWrapperProps } from './ComponentWrapperProps';
import { DefaultComponentWrapper } from './DefaultComponentWrapper';

type RenderParams = {
  include?: string;
  route?: string;
  path?: string;
  view?: string;
  componentWrapper?: ComponentType<ComponentWrapperProps>;
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
    view,
    include = defaultOptions.include,
    route = defaultOptions.route,
    componentWrapper: ComponentWrapper = DefaultComponentWrapper,
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
      <NotFoundMessage path={path} view={view} moduleNames={moduleNames} />
    );
  }
  const [moduleName, loader] = found;

  const Component = lazy(async () => ({
    default:
      getComponent(await loader(), view) ??
      (() => <ViewNotFoundMessage moduleName={moduleName} view={view} />),
  }));

  const contextValue: Omit<ComponentWrapperProps, 'children'> = {
    modules,
    moduleName,
    view,
  };

  return renderNode(
    container,
    <Suspense fallback={<LoadingIndicator />}>
      <ComponentWrapper {...contextValue}>
        <Component />
      </ComponentWrapper>
    </Suspense>
  );
};
