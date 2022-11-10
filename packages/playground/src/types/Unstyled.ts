import { StyleProps } from './StyleProps';

export type Unstyled<Props extends {}> = Props & StyleProps;
