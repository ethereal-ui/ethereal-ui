const fileAndPath = (path: string): [path: string, file: string] => {
  const parts = path.split('/');

  if (parts.length > 1) {
    return [parts.slice(0, -1).join('/'), parts[parts.length - 1]!];
  }
  return ['', parts[0]!];
};

const removeFileExtensions = (fileName: string): string => {
  const extIndex = fileName.indexOf('.');
  return extIndex > 0 ? fileName.substring(0, extIndex) : fileName;
};

export const matchesComponentPath = (
  path: string,
  modulePath: string
): boolean => {
  const lowerCasePath = path.toLowerCase();
  const lowerCaseModulePath = modulePath.toLowerCase();

  const [pathDir, pathFileName] = fileAndPath(lowerCasePath);
  const pathHasDir = pathDir !== '';
  const pathHasExtension = pathFileName.indexOf('.') > 0;

  const [moduleDir, moduleFileName] = fileAndPath(lowerCaseModulePath);

  return (
    (pathHasDir && lowerCaseModulePath.includes(lowerCasePath)) ||
    (!pathHasDir && pathHasExtension && moduleFileName === pathFileName) ||
    (!pathHasDir &&
      !pathHasExtension &&
      removeFileExtensions(moduleFileName) === pathFileName) ||
    (pathHasExtension
      ? lowerCasePath.includes(lowerCaseModulePath)
      : lowerCasePath.includes(
          `${moduleDir}/${removeFileExtensions(moduleFileName)}`
        ))
  );
};
