export type ModuleLoader = () => Promise<unknown>;

export type Modules = Record<string, ModuleLoader>;
