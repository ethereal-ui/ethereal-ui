import { useState, type CSSProperties, type ReactNode } from 'react';
import { column, textStyles } from '../util/styles';

type DetailsValue = Readonly<
  Record<string, string | readonly string[] | undefined>
>;

type ErrorMessageProps = {
  title: string;
  details?: DetailsValue;
  children: ReactNode;
};

// The styles objects are ugly but they don't introduce any CSS
// injection or CSS-in-JS package that could conflict with the displayed
// components.
const rootStyles = {
  container: {
    ...column('24px'),
    ...textStyles.body,
    maxWidth: '40rem',
    margin: 'auto',
    padding: '24px',
  },
  title: textStyles.title,
  showDetailsButton: {
    ...textStyles.small,
    background: 'none',
    padding: '4px 12px',
    borderRadius: '4px',
    border: '1px solid black',
    cursor: 'pointer',
  },
} as const satisfies Record<string, CSSProperties>;

const detailsStyles = {
  container: {
    ...column('12px'),
    ...textStyles.small,
    backgroundColor: 'oklch(0.96 0.01 282.79)',
    border: '1px solid #00000003',
    borderRadius: '12px',
    padding: '16px',
    margin: '16px -17px',
  },
  item: column('4px'),
  term: {
    fontWeight: 600,
    opacity: 0.7,
  },
  data: {
    marginInlineStart: 0,
    fontFamily: 'monospace',
  },
  dataList: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
  },
  dataListItem: {
    fontFamily: 'monospace',
  },
} as const satisfies Record<string, CSSProperties>;

const Details = ({ value }: { value: DetailsValue }) => (
  <dl style={detailsStyles.container}>
    {Object.entries(value).map(([title, data]) => (
      <div key={title} style={detailsStyles.item}>
        <dt style={detailsStyles.term}>{title}</dt>
        <dd style={detailsStyles.data}>
          {Array.isArray(data) ? (
            <ul style={detailsStyles.dataList}>
              {data.map(item => (
                <li key={item} style={detailsStyles.dataListItem}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            (data ?? <i>Undefined</i>)
          )}
        </dd>
      </div>
    ))}
  </dl>
);

export const ErrorMessage = ({
  title,
  details,
  children,
}: ErrorMessageProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={rootStyles.container}>
      <h1 style={rootStyles.title}>{title}</h1>
      <div>{children}</div>
      {details && (
        <div>
          <button
            type="button"
            style={rootStyles.showDetailsButton}
            onClick={() => setShowDetails(prev => !prev)}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          {showDetails && <Details value={details} />}
        </div>
      )}
    </div>
  );
};
