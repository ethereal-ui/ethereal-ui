import { ErrorMessage } from './ErrorMessage';

type ViewNotFoundMessageProps = {
  moduleName: string;
  viewName?: string;
};

export const ViewNotFoundMessage = (props: ViewNotFoundMessageProps) => (
  <ErrorMessage title="Component View Not Found" details={props}>
    The view parameter doesn't match a React component in any of the names
    exported by the module.
    <br />
    Please check the URL parameters and try again.
  </ErrorMessage>
);
