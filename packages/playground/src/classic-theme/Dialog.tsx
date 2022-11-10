import { ParentComponent } from 'solid-js';
import { Dialog as UnstyledDialog } from '../components/Dialog';
import { ButtonStyles } from './Button';

export const Dialog: ParentComponent = () => (
  <>
    <UnstyledDialog class="eui-theme-classic" />
    <ButtonStyles />
  </>
);
