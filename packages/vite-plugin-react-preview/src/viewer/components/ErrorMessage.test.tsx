// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { test, expect, afterEach } from 'vitest';
import { act, cleanup, render, screen } from '@testing-library/react';

import { ErrorMessage } from './ErrorMessage';

afterEach(() => {
  // Testing library only calls cleanup if afterEach is globally defined
  // by Vitest. I prefer to make the explicit call rather than relying
  // to defining test globals.
  cleanup();
});

test('Initially details are collapsed', () => {
  render(
    <ErrorMessage title="Title" details={{ test: 'Value' }}>
      Error description
    </ErrorMessage>
  );

  expect(
    screen.getByRole('button', { name: 'Show Details' })
  ).toBeInTheDocument();
});

test('Expand details', async () => {
  render(
    <ErrorMessage title="Title" details={{ test: 'Value' }}>
      Error description
    </ErrorMessage>
  );

  expect(screen.queryByText('Value')).not.toBeInTheDocument();

  await act(async () => {
    screen.getByRole('button', { name: 'Show Details' }).click();
  });

  expect(screen.getByText('Value')).toBeInTheDocument();
});

test('Show details with an array', async () => {
  render(
    <ErrorMessage title="Title" details={{ list: ['Value 1', 'Value 2'] }}>
      Error description
    </ErrorMessage>
  );

  await act(async () => {
    screen.getByRole('button', { name: 'Show Details' }).click();
  });

  expect(screen.getByText('Value 1')).toBeInTheDocument();
  expect(screen.getByText('Value 2')).toBeInTheDocument();
});

test('Render undefined as Undefined', async () => {
  render(
    <ErrorMessage title="Title" details={{ test: undefined }}>
      Error description
    </ErrorMessage>
  );

  await act(async () => {
    screen.getByRole('button', { name: 'Show Details' }).click();
  });

  expect(screen.getByText('Undefined')).toBeInTheDocument();
});
