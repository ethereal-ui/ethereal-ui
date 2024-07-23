// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { beforeEach, expect, test } from 'vitest';
import { act, screen } from '@testing-library/react';

import { render } from './render';
import type { Modules } from './types';

const modules: Modules = {
  test: async () => ({
    default: () => <div data-testid="test">Test Module</div>,
  }),
};

beforeEach(() => {
  document.body.innerHTML = '<div id="root"></div>';
});

test('Render existent module', async () => {
  const root = document.getElementById('root')!;
  const unmount = await act(async () => render(root, modules, 'test'));

  try {
    expect(await screen.findByTestId('test')).toHaveTextContent('Test Module');
  } finally {
    unmount();
  }
});

test('Not found message', async () => {
  const root = document.getElementById('root')!;
  const unmount = await act(async () => render(root, modules, 'other'));

  try {
    expect(root).toHaveTextContent('Not Found');
  } finally {
    unmount();
  }
});

test('No modules message', async () => {
  const root = document.getElementById('root')!;
  const unmount = await act(async () => render(root, {}));

  try {
    expect(root).toHaveTextContent('No Modules');
  } finally {
    unmount();
  }
});
