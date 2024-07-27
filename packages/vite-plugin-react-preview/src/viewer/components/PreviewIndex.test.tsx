// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { test, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import { PreviewIndex } from './PreviewIndex';

afterEach(() => {
  cleanup();
});

test('Show links for each module available', () => {
  render(<PreviewIndex moduleNames={['First', 'Second']} route="/test" />);

  const [firstLink, secondLink] = screen.getAllByRole('link');
  expect(firstLink).toHaveTextContent('First');
  expect(secondLink).toHaveTextContent('Second');
  expect(firstLink).toHaveAttribute('href', '/test?path=First');
  expect(secondLink).toHaveAttribute('href', '/test?path=Second');
});
