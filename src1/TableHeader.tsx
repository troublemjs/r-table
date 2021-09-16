import React, {
  CSSProperties,
  HtmlHTMLAttributes,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';
import { IColumn, RecordType } from './types';

interface TableHeaderProps extends HtmlHTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  rowWidth: number;
  rowHeight: number;
  headerHeight: number[];
  columns: IColumn[];
  fixedColumns: IColumn[];
  dataSource: RecordType[];

  className?: string;
  renderHeader: (opts: {
    style: CSSProperties;
    columns: IColumn[];
    headerIndex: number;
  }) => ReactNode;
  renderRow: (opts: {
    style: CSSProperties;
    columns: IColumn[];
    record: RecordType;
    rowIndex: number;
  }) => ReactNode;
}

const TableHeader = React.forwardRef<
  { scrollTo: (offset: number) => void },
  TableHeaderProps
>((props, ref) => {
  const {
    width,
    height,
    className,
    renderHeader,
    renderRow,
    columns,
    rowHeight,
    fixedColumns,
    headerHeight,
  } = props;
  const headerRef = useRef<HTMLDivElement>();

  useImperativeHandle(ref, () => ({
    scrollTo,
  }));

  const scrollTo = (offset: number) => {
    console.log('TableHeader scrollTo ->', offset);
    if (!headerRef.current) return;
    headerRef.current.scrollLeft = offset;
  };

  const renderHeaderRow = (height: number, index: number) => {
    if (height <= 0) return null;

    const style: CSSProperties = { width: '100%', height };
    return renderHeader({ style, columns, headerIndex: index });
  };

  const renderFixedRow = (record: RecordType, index: number) => {
    const style: CSSProperties = { width: '100%', height: rowHeight };
    const rowIndex = -index - 1; // 定位列的下标都为负数
    return renderRow({ style, columns, record, rowIndex });
  };

  if (height <= 0) return null;

  const style: CSSProperties = {
    width,
    height: height,
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div role="grid" ref={headerRef} className={className} style={style}>
      <div role="rowgroup">
        {headerHeight?.map(renderHeaderRow)}
        {fixedColumns?.map(renderFixedRow)}
      </div>
    </div>
  );
});

export default TableHeader;
