import { ErrorMessage } from './ErrorMessage';

export const NoPreviewsMessage = ({
  include,
}: {
  include: string | readonly string[];
}) => (
  <ErrorMessage
    title="No Previews Available"
    details={{ 'Include Pattern': JSON.stringify(include) }}
  >
    Please check your plugin configuration, as no modules match the current
    include pattern.
  </ErrorMessage>
);
