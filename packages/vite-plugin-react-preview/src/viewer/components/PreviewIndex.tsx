import type { CSSProperties } from 'react';
import { column, textStyles } from '../util/styles';

type PreviewIndexProps = {
  moduleNames: readonly string[];
  route: string;
};

const styles = {
  container: {
    ...textStyles.body,
    ...column('4px'),
    margin: '20px',
  },
  title: textStyles.title,
  list: {
    margin: 0,
  },
} as const satisfies Record<string, CSSProperties>;

export const PreviewIndex = ({ moduleNames, route }: PreviewIndexProps) => (
  <div style={styles.container}>
    <h1 style={styles.title}>Index</h1>
    <ul style={styles.list}>
      {moduleNames.map(moduleName => (
        <li key={moduleName}>
          <a href={`${route}?path=${moduleName}`}>{moduleName}</a>
        </li>
      ))}
    </ul>
  </div>
);
