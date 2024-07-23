import { createContext } from 'react';
import type { ViewerContextValue } from './ViewerContextValue';

export const ViewerContext = createContext<ViewerContextValue | undefined>(
  undefined
);
