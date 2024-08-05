import type { ReactNode } from 'react';
import type { ViewComponentProps } from './ViewComponentProps';

export type ViewWrapperProps = ViewComponentProps & { children: ReactNode };
