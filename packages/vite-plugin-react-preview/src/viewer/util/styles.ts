import type { CSSProperties } from 'react';

const systemFontFamily =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const textStyles = {
  title: {
    fontFamily: systemFontFamily,
    fontSize: '1.2rem',
  },
  body: {
    fontFamily: systemFontFamily,
    fontSize: '1rem',
  },
  small: {
    fontFamily: systemFontFamily,
    fontSize: '0.75rem',
    fontWeight: 400,
  },
} as const satisfies Record<string, CSSProperties>;

export const column = (gap: '0' | '4px' | '12px' | '24px') =>
  ({
    display: 'flex',
    flexDirection: 'column',
    gap,
  }) as const;
