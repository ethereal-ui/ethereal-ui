import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export const library = (moduleUrl, fileName = 'index') => {
  const pkg = JSON.parse(
    readFileSync(fileURLToPath(new URL('package.json', moduleUrl)))
  );

  return defineConfig({
    build: {
      outDir: 'lib',
      sourcemap: true,
      lib: {
        entry: fileURLToPath(new URL('./src/index.ts', moduleUrl)),
        fileName,
        formats: ['es'],
      },
      rollupOptions: {
        external: Object.keys(pkg.dependencies ?? {}),
      },
    },
    plugins: [dts()],
  });
};
