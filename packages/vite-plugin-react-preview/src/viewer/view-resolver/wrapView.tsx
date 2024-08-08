import type { ComponentType } from 'react';

import type { ViewComponentProps } from './ViewComponentProps';
import type { ViewWrapperProps } from './ViewWrapperProps';

type ViewComponent = ComponentType<ViewComponentProps>;
type ViewWrapperComponent = ComponentType<ViewWrapperProps>;

export const wrapView = (
  Component: ViewComponent,
  Wrapper?: ViewWrapperComponent
): ViewComponent => {
  if (Wrapper === undefined) return Component;

  return (props: ViewComponentProps) => (
    <Wrapper {...props}>
      <Component {...props} />
    </Wrapper>
  );
};
