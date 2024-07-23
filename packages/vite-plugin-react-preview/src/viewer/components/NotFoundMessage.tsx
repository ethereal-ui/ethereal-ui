interface NotFoundMessageProps {
  moduleNames: readonly string[];
  path?: string;
  view?: string;
}

export const NotFoundMessage = ({
  moduleNames,
  path,
}: NotFoundMessageProps) => (
  <div>
    <div>Component Not Found</div>
    <div>Path: {path}</div>
    <div>Modules: {moduleNames.join(',')}</div>
  </div>
);
