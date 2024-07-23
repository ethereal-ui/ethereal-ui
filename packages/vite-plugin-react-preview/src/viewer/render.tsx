import { createRoot } from 'react-dom/client';

import type { Modules } from './types';
import { findModule } from './util';
import { NoModulesMessage, NotFoundMessage, Viewer } from './components';

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

    root.render(
      <Viewer
        modules={modules}
        moduleName={moduleName}
        loader={loader}
        view={view}
      />
    );
  }

  return () => root.unmount();
};
