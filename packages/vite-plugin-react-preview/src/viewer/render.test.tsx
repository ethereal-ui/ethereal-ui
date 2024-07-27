// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { act, cleanup, screen } from '@testing-library/react';

import { render } from './render';
import type { Modules } from './Modules';

// We are testing a render function that is not the render from
// testing-library, so we need to wrap it with act to make
// state changes work.

/* eslint-disable testing-library/no-unnecessary-act */

const modules: Modules = {
  test: async () => ({
    default: () => <div data-testid="test">Test Module</div>,
  }),
};

beforeEach(() => {
  document.body.innerHTML = '<div id="root" data-testid="root"></div>';
});

afterEach(() => {
  cleanup();
});

test('Render existent module', async () => {
  const root = screen.getByTestId('root');
  const unmount = await act(async () =>
    render(root, modules, { path: 'test' })
  );

  try {
    expect(await screen.findByTestId('test')).toHaveTextContent('Test Module');
  } finally {
    unmount();
  }
});

test('Preview not found message', async () => {
  const root = screen.getByTestId('root');
  const unmount = await act(async () =>
    render(root, modules, { path: 'other' })
  );

  try {
    expect(root).toHaveTextContent('Not Found');
  } finally {
    unmount();
  }
});

test('View not found message', async () => {
  const root = screen.getByTestId('root');
  const unmount = await act(async () =>
    render(root, modules, { path: 'test', view: 'notFound' })
  );

  try {
    expect(root).toHaveTextContent('Not Found');
  } finally {
    unmount();
  }
});

test('No previews message', async () => {
  const root = screen.getByTestId('root');
  const unmount = await act(async () => render(root, {}, { path: '' }));

  try {
    expect(root).toHaveTextContent('No Previews');
  } finally {
    unmount();
  }
});

test('Show the index when no path is specified', async () => {
  const root = screen.getByTestId('root');
  const unmount = await act(async () => render(root, modules));

  try {
    expect(screen.getByRole('link')).toHaveTextContent('test');
  } finally {
    unmount();
  }
});
