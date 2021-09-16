import React from 'react';

import { renderElement } from './utils';
import { MaybeElement, ReactElementType } from './type-utils';

export interface TableHeaderRowProps<T = any> {
  isScrolling?: boolean;
  className?: string;
  style?: React.CSSProperties;
  columns: T[];
  headerIndex?: number;
  cellRenderer?: (...args: any) => MaybeElement;
  headerRenderer?: ReactElementType;
  expandColumnKey?: string;
  expandIcon?: ReactElementType;
  tagName?: ReactElementType;
}

/**
 * HeaderRow component for BaseTable
 */
const TableHeaderRow: React.FC<TableHeaderRowProps> = ({
  className,
  style,
  columns,
  headerIndex,
  cellRenderer,
  headerRenderer,
  expandColumnKey,
  expandIcon,
  tagName,
  ...rest
}) => {
  const ExpandIcon = expandIcon!;
  const Tag = tagName!;

  let cells: React.ReactNode = columns.map(
    (column: { key: any }, columnIndex: any) =>
      cellRenderer!({
        columns,
        column,
        columnIndex,
        headerIndex,
        expandIcon: column.key === expandColumnKey && <ExpandIcon />,
      }),
  );

  if (headerRenderer) {
    cells = renderElement(headerRenderer, { cells, columns, headerIndex });
  }

  return (
    <Tag {...rest} className={className} style={style}>
      {cells}
    </Tag>
  );
};

TableHeaderRow.defaultProps = {
  tagName: 'div',
};

export default TableHeaderRow;
