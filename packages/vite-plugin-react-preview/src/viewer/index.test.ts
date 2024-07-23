import { expect, test } from 'vitest';

import * as libExports from './index';

test('Only export the expected externals', () => {
  // This test aims to catch any unwanted export.
  // Update the snapshot accordingly.
  expect(Object.keys(libExports).sort()).toMatchInlineSnapshot(`
    [
      "ViewerContext",
      "render",
    ]
  `);
});
