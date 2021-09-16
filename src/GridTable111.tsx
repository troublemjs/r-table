import React, { useRef } from 'react';
import cn from 'classnames';
import {
  FixedSizeGrid as Grid,
  FixedSizeGridProps,
  GridOnItemsRenderedProps,
  Align,
} from 'react-window';

import Header from './TableHeader';
import { fn } from './type-utils';
import { RowKey } from './TableRow';

export type PickProps = Pick<
  FixedSizeGridProps,
  | 'className'
  | 'width'
  | 'height'
  | 'rowHeight'
  | 'useIsScrolling'
  | 'overscanRowCount'
  | 'style'
  | 'onScroll'
>;

export interface GridTableProps<T = any> extends PickProps {
  containerStyle?: React.CSSProperties;
  classPrefix?: string;
  headerHeight: number | number[];
  headerWidth: number;
  bodyWidth: number;
  columns: T[];
  data: any[];
  rowKey: RowKey;
  frozenData?: any[];
  overscanRowCount?: number;
  hoveredRowKey?: RowKey | null;
  onScrollbarPresenceChange?: fn;
  onRowsRendered?: (p: {
    overscanStartIndex: number;
    overscanStopIndex: number;
    startIndex: number;
    stopIndex: number;
  }) => void;
  headerRenderer: fn;
  rowRenderer: fn;
}

const GridTable: React.FC<GridTableProps> = <T extends any>(
  props: GridTableProps,
) => {
  const {
    containerStyle,
    classPrefix,
    className,
    data,
    frozenData,
    width,
    height,
    rowHeight,
    headerWidth,
    bodyWidth,
    useIsScrolling,
    onScroll,
    hoveredRowKey,
    overscanRowCount,
    style,
    columns,
    headerRenderer,
    rowRenderer,
    onScrollbarPresenceChange,
    rowKey,
    onRowsRendered,
    headerHeight,
    ...rest
  } = props;
  const refHeader = useRef<Header>();
  const refBody = useRef<Grid>();

  const forceUpdateTable = () => {
    refHeader.current?.forceUpdate();
    refBody.current?.forceUpdate();
  };

  const scrollToPosition = (opts: {
    scrollLeft: number;
    scrollTop: number;
  }) => {
    refHeader.current?.scrollTo(opts.scrollLeft);
    refBody.current?.scrollTo(opts);
  };

  const scrollToTop = (scrollTop: number) => {
    refBody.current?.scrollTo({ scrollTop });
  };

  const scrollToLeft = (scrollLeft: number) => {
    refHeader.current?.scrollTo(scrollLeft);
    // TODO:
    (refBody.current as any)?.scrollToPosition({ scrollLeft });
  };

  const scrollToRow = (rowIndex = 0, align: Align = 'auto') => {
    refBody.current?.scrollToItem({ rowIndex, align });
  };

  const renderRow = (opts: { rowIndex: number }) => {
    const rowData = data[opts.rowIndex];
    return rowRenderer({ ...opts, columns, rowData });
  };

  // 上面可能为 ref 提供出去的

  const itemKey = ({ rowIndex }: { rowIndex: number }) => {
    return data[rowIndex][rowKey];
  };

  const getHeaderHeight = () => {
    if (Array.isArray(headerHeight)) {
      return headerHeight.reduce((sum, height) => sum + height, 0);
    }
    return headerHeight;
  };

  const handleItemsRendered = ({
    overscanRowStartIndex,
    overscanRowStopIndex,
    visibleRowStartIndex,
    visibleRowStopIndex,
  }: GridOnItemsRenderedProps) => {
    onRowsRendered({
      overscanStartIndex: overscanRowStartIndex,
      overscanStopIndex: overscanRowStopIndex,
      startIndex: visibleRowStartIndex,
      stopIndex: visibleRowStopIndex,
    });
  };

  const _headerHeight = getHeaderHeight();
  const frozenRowCount = frozenData!.length;
  const frozenRowsHeight = rowHeight * frozenRowCount;
  const cls = cn(`${classPrefix}__table`, className);
  const containerProps = containerStyle ? { style: containerStyle } : null;
  return (
    <div role="table" className={cls} {...containerProps}>
      <Grid
        {...(rest as any)}
        className={`${classPrefix}__body`}
        ref={refBody}
        data={data}
        itemKey={itemKey}
        frozenData={frozenData}
        width={width}
        height={Math.max(height - _headerHeight - frozenRowsHeight, 0)}
        rowHeight={rowHeight}
        rowCount={data.length}
        overscanRowCount={overscanRowCount}
        columnWidth={bodyWidth}
        columnCount={1}
        overscanColumnCount={0}
        useIsScrolling={useIsScrolling}
        hoveredRowKey={hoveredRowKey}
        onScroll={onScroll}
        onItemsRendered={handleItemsRendered}
        children={renderRow}
      />
      {_headerHeight + frozenRowsHeight > 0 && (
        // put header after body and reverse the display order via css
        // to prevent header's shadow being covered by body
        <Header
          {...rest}
          className={`${classPrefix}__header`}
          ref={refHeader}
          columns={columns}
          data={data}
          frozenData={frozenData}
          width={width}
          height={Math.min(_headerHeight + frozenRowsHeight, height)}
          rowWidth={headerWidth}
          rowHeight={rowHeight}
          headerHeight={headerHeight}
          headerRenderer={headerRenderer}
          rowRenderer={rowRenderer}
          hoveredRowKey={frozenRowCount > 0 ? hoveredRowKey : null}
        />
      )}
    </div>
  );
};

export default GridTable;
