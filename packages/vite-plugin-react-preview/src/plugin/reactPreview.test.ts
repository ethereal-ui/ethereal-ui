import { expect, test } from 'vitest';
import { createServer } from 'vite';
import { reactPreview } from './reactPreview';

test('Return the preview html', async () => {
  const server = await createServer({
    configFile: false,
    mode: 'development',
    plugins: [reactPreview()],
    logLevel: 'silent',
    server: {
      port: 4242,
    },
  });

  try {
    await server.listen();

    const response = await fetch('http://localhost:4242/_preview');
    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toMatch(/<title>React Preview<\/title>/);
    expect(html).toMatch(
      /<script type="module" src=".*\/_preview.html.*"><\/script>/
    );
    expect(html).toMatch(/<div id="root"><\/div>/);
  } finally {
    server.close();
  }
});
