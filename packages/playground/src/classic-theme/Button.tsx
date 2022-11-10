import type { Component } from 'solid-js';
import { createGlobalStyles } from 'solid-styled-components';

import { ButtonProps, Button as UnstyledButton } from '../components/index.js';
import { selectorWithThemePrefix } from '../css/selectorWithThemePrefix';

const btn = selectorWithThemePrefix('classic', UnstyledButton.css);

export const ButtonStyles = createGlobalStyles`
  ${btn()} {
    border: 1px solid gray;
  }

  ${btn('outline')} {
    background-color: transparent;
    color: red;
  }
`;

export const Button: Component<ButtonProps> = (props: ButtonProps) => (
  <>
    <UnstyledButton class="eui-theme-classic" {...props}></UnstyledButton>
    <ButtonStyles />
  </>
);
