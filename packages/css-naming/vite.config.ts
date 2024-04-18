import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: 'lib',
    sourcemap: true,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      fileName: 'css-naming',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['@ethereal-ui/util'],
    },
  },
  plugins: [dts()],
});
