import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';

import type { Modules } from './types';
import { findModule, getComponent } from './util';
import { NoModulesMessage, NotFoundMessage } from './components';
import type { ViewerContextValue } from './ViewerContextValue';
import { ViewerContext } from './ViewerContext';

export const render = (
  container: Element,
  modules: Modules,
  path?: string,
  view?: string
): (() => void) => {
  const root = createRoot(container);

  if (Object.keys(modules).length === 0) {
    root.render(<NoModulesMessage />);
    return () => root.unmount();
  }

  const found = findModule(modules, path);

  if (!found) {
    root.render(
      <NotFoundMessage
        moduleNames={Object.keys(modules)}
        path={path}
        view={view}
      />
    );
  } else {
    const [moduleName, loader] = found;

    const context: ViewerContextValue = {
      modules,
      moduleName,
      view,
    };

    const Component = lazy(async () => ({
      default:
        getComponent(await loader(), view) ?? (() => <div>View not found</div>),
    }));

    root.render(
      <ViewerContext.Provider value={context}>
        <Suspense fallback={<div>Loading...</div>}>
          <Component />
        </Suspense>
      </ViewerContext.Provider>
    );
  }

  return () => root.unmount();
};
