import type { Plugin, PluginOption } from 'vite';

import { expect, test, vitest, type Mock } from 'vitest';
import { generateCss } from './generateCss';

const mockBundleGeneration = (plugin: PluginOption): { emitFile: Mock } => {
  const mockPluginContext = {
    emitFile: vitest.fn(),
  } as const;

  (
    (plugin as Plugin).generateBundle as unknown as (
      this: typeof mockPluginContext
    ) => {}
  ).apply(mockPluginContext);

  return mockPluginContext;
};

test('Generate single file', () => {
  const mockPluginContext = mockBundleGeneration(
    generateCss({
      fileName: 'test.css',
      source: '.test{color:red}',
    })
  );

  expect(mockPluginContext.emitFile).toHaveBeenCalledWith({
    type: 'asset',
    fileName: 'test.css',
    source: '.test{color:red}',
  });
});

test('Generate multiple files', () => {
  const mockPluginContext = mockBundleGeneration(
    generateCss([
      { fileName: 'test1.css', source: '.a{color:red}' },
      { fileName: 'test2.css', source: '.b{color:red}' },
    ])
  );

  expect(mockPluginContext.emitFile).toHaveBeenNthCalledWith(1, {
    type: 'asset',
    fileName: 'test1.css',
    source: '.a{color:red}',
  });

  expect(mockPluginContext.emitFile).toHaveBeenNthCalledWith(2, {
    type: 'asset',
    fileName: 'test2.css',
    source: '.b{color:red}',
  });
});

test('Optimize CSS', () => {
  const mockPluginContext = mockBundleGeneration(
    generateCss({
      fileName: 'test.css',
      source: '.test{color:red}\n.other{}',
    })
  );

  expect(mockPluginContext.emitFile).toHaveBeenCalledWith({
    type: 'asset',
    fileName: 'test.css',
    source: '.test{color:red}',
  });
});

test('Transform HTML index', () => {
  const plugin = generateCss({
    fileName: 'test.css',
    source: '.test{color:red}',
  });

  const result = (plugin as any).transformIndexHtml(
    '<html><head></head><body></body></html>'
  );

  expect(result).toBe(
    '<html><head><link href=/test.css rel="stylesheet" /></head><body></body></html>'
  );
});

test('Handle dev server request', () => {});
