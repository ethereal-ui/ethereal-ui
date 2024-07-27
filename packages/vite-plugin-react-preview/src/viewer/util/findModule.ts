import type { ModuleLoader, Modules } from '../Modules';
import { matchesComponentPath } from './matchesComponentPath';

export const findModule = (
  modules: Modules,
  path?: string
): [string, ModuleLoader] | undefined => {
  const entries = Object.entries(modules).sort(
    ([nameA], [nameB]) => nameA.length - nameB.length
  );

  if (entries.length === 0) return undefined;
  if (path === undefined) return entries[0];

  return entries.filter(([name]) => matchesComponentPath(path, name)).at(0);
};
