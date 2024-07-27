import { resolve } from 'node:path';

import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    outDir: 'lib',
    sourcemap: true,
    lib: {
      entry: {
        plugin: resolve('./src/plugin/index.ts'),
        viewer: resolve('./src/viewer/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vite', /^node:/, /^react/],
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
