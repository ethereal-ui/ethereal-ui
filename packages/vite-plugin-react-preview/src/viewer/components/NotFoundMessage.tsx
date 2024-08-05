import { ErrorMessage } from './ErrorMessage';

type NotFoundMessageProps = {
  moduleNames: readonly string[];
  path?: string;
  viewName?: string;
};

export const NotFoundMessage = (props: NotFoundMessageProps) => (
  <ErrorMessage title="Component Preview Not Found" details={props}>
    The path parameter doesn't match any of the existing preview files.
    <br />
    Please check the URL parameters and try again.
  </ErrorMessage>
);
