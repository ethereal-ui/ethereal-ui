import { resolve } from 'node:path';

import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    outDir: 'lib',
    sourcemap: true,
    lib: {
      entry: resolve('./src/index.ts'),
      fileName: 'index',
      formats: ['es'],
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
