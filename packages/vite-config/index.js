import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export const library = (moduleUrl, fileName = 'index') =>
  defineConfig({
    build: {
      outDir: 'lib',
      sourcemap: true,
      lib: {
        entry: fileURLToPath(new URL('./src/index.ts', moduleUrl)),
        fileName,
        formats: ['es'],
      },
      rollupOptions: {
        external: [/^@ethereal-ui/],
      },
    },
    plugins: [dts()],
  });
