import { transform } from 'lightningcss';

export const optimizeCssSource = (filename: string, source: string): string => {
  const res = transform({
    filename,
    code: Buffer.from(source),
    minify: true,
    targets: {
      chrome: 95,
    },
  });

  return res.code.toString();
};
