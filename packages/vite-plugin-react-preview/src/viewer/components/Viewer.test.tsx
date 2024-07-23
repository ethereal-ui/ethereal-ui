// @vitest-environment happy-dom
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { Viewer } from './Viewer';

test('Render default view', async () => {
  const loader = async () => ({
    default: () => <div data-testid="test">Hello</div>,
  });

  render(<Viewer moduleName="Test" modules={{ loader }} loader={loader} />);

  expect(await screen.findByTestId('test')).toHaveTextContent('Hello');
});
