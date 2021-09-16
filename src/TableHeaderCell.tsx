import React from 'react';

export interface TableHeaderCellProps<T = any> {
  className?: string;
  column?: T;
  columnIndex?: number;
}

/**
 * HeaderCell component for BaseTable
 */
const TableHeaderCell: React.FunctionComponent<TableHeaderCellProps> = ({
  className,
  column,
}) => <div className={className}>{column.title}</div>;

export default TableHeaderCell;
