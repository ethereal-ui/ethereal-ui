import { useState, type CSSProperties } from 'react';

interface NotFoundMessageProps {
  moduleNames: readonly string[];
  path?: string;
  view?: string;
}

// The styles objects are ugly but they don't introduce any CSS
// injection or CSS-in-JS package that could conflict with the displayed
// components.
const rootStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    fontFamily:
      'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    maxWidth: '40rem',
    margin: 'auto',
    padding: '24px',
  },
  title: {
    fontSize: '120%',
  },
  showDetailsButton: {
    background: 'none',
    padding: '4px 12px',
    borderRadius: '4px',
    border: '1px solid black',
    fontSize: '75%',
    fontWeight: 400,
    cursor: 'pointer',
  },
} as const satisfies Record<string, CSSProperties>;

const detailsStyles = {
  defList: {
    fontSize: '75%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: 'oklch(0.96 0.01 282.79)',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #00000003',
    margin: '16px -17px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  term: {
    fontWeight: 600,
    opacity: 0.7,
  },
  def: {
    marginInlineStart: 0,
  },
  moduleList: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
  },
  moduleName: {
    fontFamily: 'monospace',
  },
} as const satisfies Record<string, CSSProperties>;

const Details = ({ moduleNames, path, view }: NotFoundMessageProps) => (
  <dl style={detailsStyles.defList}>
    <div style={detailsStyles.item}>
      <dt style={detailsStyles.term}>Path</dt>
      <dd style={detailsStyles.def}>{path}</dd>
    </div>
    <div style={detailsStyles.item}>
      <dt style={detailsStyles.term}>View</dt>
      <dd style={detailsStyles.def}>{view ?? <i>Not Specified</i>}</dd>
    </div>
    <div style={detailsStyles.item}>
      <dt style={detailsStyles.term}>Available Modules</dt>
      <dd style={detailsStyles.def}>
        <ul style={detailsStyles.moduleList}>
          {moduleNames.map(name => (
            <li key={name} style={detailsStyles.moduleName}>
              {name}
            </li>
          ))}
        </ul>
      </dd>
    </div>
  </dl>
);

export const NotFoundMessage = (props: NotFoundMessageProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={rootStyles.container}>
      <h1 style={rootStyles.title}>Component Preview Not Found</h1>
      <div>
        The path parameter doesn't match any of the existing preview files.
        <br />
        Please check the URL parameters and try again.
      </div>
      <div>
        <button
          type="button"
          style={rootStyles.showDetailsButton}
          onClick={() => setShowDetails(prev => !prev)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {showDetails && <Details {...props} />}
      </div>
    </div>
  );
};
