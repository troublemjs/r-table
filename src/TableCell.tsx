import React from 'react';
import { toString } from './utils';

export interface TableCellProps<C = any> {
  className?: string;
  cellData?: any;
  column?: C;
  columnIndex?: number;
  rowData?: object;
  rowIndex?: number;
}

/**
 * Cell component for BaseTable
 */
const TableCell: React.FC<TableCellProps> = ({ className, cellData }) => (
  <div className={className}>
    {React.isValidElement(cellData) ? cellData : toString(cellData)}
  </div>
);

export default TableCell;
