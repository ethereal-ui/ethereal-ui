import { useEffect, useMemo, useState, type ElementType } from 'react';

import type { ModuleLoader, Modules } from '../types';
import { getComponent } from '../util';
import { ViewerContext } from '../ViewerContext';
import type { ViewerContextValue } from '../ViewerContextValue';

interface ViewerProps {
  modules: Modules;
  moduleName: string;
  loader: ModuleLoader;
  view?: string;
}

export const Viewer = ({ modules, moduleName, loader, view }: ViewerProps) => {
  const [Component, setComponent] = useState<ElementType>();

  const context: ViewerContextValue = useMemo(
    () => ({
      modules,
      moduleName,
      view,
    }),
    [modules, moduleName, view]
  );

  useEffect(() => {
    loader().then(loadedModule => {
      const component = getComponent(loadedModule, view);

      // We need to wrap component with as function as React's set state
      // may receive a function and incorrectly evaluates the functional
      // component
      setComponent(() => component);
    });
  }, [loader]);

  return (
    <ViewerContext.Provider value={context}>
      {Component && <Component />}
    </ViewerContext.Provider>
  );
};
