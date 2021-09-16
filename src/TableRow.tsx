import React from 'react';

import { renderElement } from './utils';
import { fn, ReactElementType } from './type-utils';

export type RowKey = string | number;

export interface RowRendererProps<T = any> {
  isScrolling?: boolean;
  cells: any;
  columns: T[];
  rowData: any;
  rowIndex: number;
  depth?: number;
}

export interface TableRowProps<T = unknown> {
  columns: T[];
  rowData: any;
  rowIndex: number;
  isScrolling?: boolean;
  className?: string;
  style?: React.CSSProperties;
  rowKey?: RowKey;
  expandColumnKey?: string;
  depth?: number;
  rowEventHandlers?: object;
  rowRenderer?: Parameters<typeof renderElement>[0];
  cellRenderer?: fn;
  expandIconRenderer?: fn;
  /** 预估的行高 */
  estimatedRowHeight?: number | VoidFunction;
  getIsResetting?: VoidFunction;
  onRowHeightChange?: (
    rowKey: string,
    height: number,
    rowIndex: number,
    frozen: any, // 冻结列的方向 left | right
  ) => VoidFunction;
  onRowHover?: fn;
  onRowExpand?: fn;
  tagName: ReactElementType;
}

const TableRow: React.FC<TableRowProps> = (props) => {
  const {
    isScrolling,
    className,
    style,
    columns,
    rowIndex,
    rowData,
    expandColumnKey,
    depth,
    rowEventHandlers,
    rowRenderer,
    cellRenderer,
    expandIconRenderer,
    tagName: Tag,
    rowKey,
    onRowHover,
    onRowExpand,
    estimatedRowHeight,
    getIsResetting,
    onRowHeightChange,
    ...rest
  } = props;

  const handleExpand = (expanded: any) => {
    onRowExpand?.({ expanded, rowData, rowIndex, rowKey });
  };

  const getEventHandlers = (handlers: any = {}) => {
    const eventHandlers: any = {};
    Object.keys(handlers).forEach((eventKey) => {
      const callback = handlers[eventKey];
      if (typeof callback === 'function') {
        eventHandlers[eventKey] = (event: any) => {
          callback({ rowData, rowIndex, rowKey, event });
        };
      }
    });

    if (onRowHover) {
      const mouseEnterHandler = eventHandlers['onMouseEnter'];
      eventHandlers['onMouseEnter'] = (event: any) => {
        onRowHover({
          hovered: true,
          rowData,
          rowIndex,
          rowKey,
          event,
        });
        mouseEnterHandler && mouseEnterHandler(event);
      };

      const mouseLeaveHandler = eventHandlers['onMouseLeave'];
      eventHandlers['onMouseLeave'] = (event: any) => {
        onRowHover({
          hovered: false,
          rowData,
          rowIndex,
          rowKey,
          event,
        });
        mouseLeaveHandler && mouseLeaveHandler(event);
      };
    }

    return eventHandlers;
  };

  const expandIcon = expandIconRenderer?.({
    rowData,
    rowIndex,
    depth,
    onExpand: handleExpand,
  });
  let cells: React.ReactNode = columns.map((column, columnIndex) =>
    cellRenderer?.({
      isScrolling,
      columns,
      column,
      columnIndex,
      rowData,
      rowIndex,
      expandIcon: (column as any).key === expandColumnKey && expandIcon,
    }),
  );
  if (rowRenderer) {
    cells = renderElement(rowRenderer, {
      isScrolling,
      cells,
      columns,
      rowData,
      rowIndex,
      depth,
    });
  }
  const eventHandlers = getEventHandlers(rowEventHandlers);
  return (
    <Tag {...rest} className={className} style={style} {...eventHandlers}>
      {cells}
    </Tag>
  );
};

export default TableRow;
