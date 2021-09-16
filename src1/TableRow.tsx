import React, { Attributes, ReactNode, ReactNodeArray, useEffect } from 'react';
import { RecordType } from './types';
import { renderElement } from './utils';

type a = ValueOf<HTMLElementTagNameMap>;
type ValueOf<T> = T[keyof T];

type b = React.ReactElement;

export interface RenderRowProps<C = any> {
  isScrolling?: boolean;
  cells?: ReactNode | ReactNodeArray;
  columns: C[];
  rowData: any;
  rowIndex: number;
  depth?: number;
}

interface TableRowProps<C = any> extends React.HTMLAttributes<HTMLElement> {
  columns: C[];
  rowData: RecordType;
  rowIndex: number;
  isScrolling?: boolean;
  className?: string;
  style?: React.CSSProperties;
  key?: number | string;
  expandColumnKey?: string;
  depth?: number;
  rowEventHandlers?: object;
  renderRow?: Parameters<typeof renderElement>[0];
  renderCell?: (opts: any) => ReactNode;
  renderExpandIcon?: () => ReactNode;
  onRowHover?: VoidFunction;
  onRowExpand?: VoidFunction;
  onRowHeightChange?: VoidFunction;
  tagName?: React.ElementType;
}
const TableRow: React.FC<TableRowProps> = (props) => {
  const {
    columns,
    rowData,
    rowIndex,
    tagName: Tag,
    className,
    style,
    isScrolling,
    renderCell,
    renderRow,
    depth,
    onRowHeightChange,
  } = props;
  const ref = React.useRef<HTMLElement>();

  useEffect(() => {
    measureHeight(true);
  }, []);

  // useEffect(() => {
  //   measureHeight(true);
  // }, []);

  const measureHeight = (isInit: boolean) => {
    if (!ref.current) return;

    const height = ref.current.getBoundingClientRect().height;
    console.log(height);

    // onRowHeightChange?.(dataIndex, size, );
  };

  let cells: ReactNode = columns.map((column, columnIndex) =>
    renderCell({
      isScrolling,
      columns,
      column,
      columnIndex,
      rowData,
      rowIndex,
    }),
  );

  if (renderRow) {
    cells = renderElement(renderRow, {
      isScrolling,
      cells,
      columns,
      rowData,
      rowIndex,
      depth,
    });
  }

  return (
    <Tag ref={ref} className={className} style={style}>
      {cells}
    </Tag>
  );
};

export default TableRow;
