// import React from 'react';
import {
  FixedSizeGrid,
  VariableSizeGrid,
  GridChildComponentProps,
  GridProps,
  GridOnScrollProps,
  GridItemKeySelector,
  GridOnItemsRenderedProps,
} from 'react-window';
import classNames from 'classnames';

import Header from './TableHeader';
import { useRef } from 'react';

const getGrid = (fixed: boolean) => {
  return fixed ? FixedSizeGrid : VariableSizeGrid;
};

interface TableProps extends Pick<GridProps, 'useIsScrolling' | 'onScroll'> {
  dataSource: any[];
  columns: any[];
  rowKey?: string;
  prefixCls?: string;
  className?: string;
  width: number;
  height: number;
  headerHeight: number[];
  headerWidth: number;
  bodyWidth: number;
  rowHeight: number;
  variableRowHeight: boolean;
  onRowsRendered?: (opts: {
    overscanStartIndex: number;
    overscanStopIndex: number;
    startIndex: number;
    stopIndex: number;
  }) => void;
  rowRenderer?: (opts?: any) => any;
  /** 是否预估行高 */
  estimatedRowHeight?: number;
  getRowHeight?: (rowIndex: number) => number;
  /**
   * 要在可见区域之外呈现的行数。由于两个原因，此属性可能很重要：
   * - 过扫描一行或一列允许 Tab 键专注于下一个（尚不可见）的项目。
   * - 当用户第一次开始滚动时，稍微过扫描可以减少或防止空白区域的闪烁。
   *
   * 请注意，过度扫描会对性能产生负面影响。默认情况下，网格过扫描一项
   */
  overscanRowCount?: number;
}
const Table: React.FC<Partial<TableProps>> = (props) => {
  const {
    dataSource,
    columns,
    estimatedRowHeight,
    getRowHeight,
    headerWidth,
    rowKey,
    width,
    height,
    overscanRowCount,
    bodyWidth,
    rowHeight,
    useIsScrolling,
    onScroll,
    onRowsRendered,
    rowRenderer,
  } = props;
  const headerRef = useRef<any>();
  const refGrid = useRef<any>();
  const refGridInner = useRef<any>();

  const handleOnScroll = (opts: GridOnScrollProps) => {
    // console.log(opts.scrollLeft);
  };

  const handleItemsRendered = ({
    overscanRowStartIndex: overscanStartIndex,
    overscanRowStopIndex: overscanStopIndex,
    visibleRowStartIndex: startIndex,
    visibleRowStopIndex: stopIndex,
  }: Pick<
    GridOnItemsRenderedProps,
    | 'overscanRowStartIndex'
    | 'overscanRowStopIndex'
    | 'visibleRowStartIndex'
    | 'visibleRowStopIndex'
  >) => {
    onRowsRendered?.({
      overscanStartIndex,
      overscanStopIndex,
      startIndex,
      stopIndex,
    });
  };

  const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => (
    <div style={style}>
      Item {rowIndex},{columnIndex}
    </div>
  );

  const renderRow = (args: GridChildComponentProps) => {
    // const { data, columns, rowRenderer } = this.props;
    const rowData = dataSource[args.rowIndex];
    return rowRenderer({ ...args, columns, rowData });
  };

  const renderGrid = () => {
    const itemKey: GridItemKeySelector = ({ rowIndex }) =>
      dataSource[rowIndex][rowKey];

    const commonProps: GridProps = {
      innerRef: refGridInner,
      itemKey,
      width,
      height,
      rowCount: dataSource?.length,
      overscanRowCount: overscanRowCount,
      columnCount: 1,
      overscanColumnCount: 0,
      useIsScrolling,
      onScroll,
      onItemsRendered: handleItemsRendered,
      children: renderRow,
    };

    // 一些未找到的 hoveredRowKey data frozenData
    if (estimatedRowHeight) {
      const props = {
        ...commonProps,
        estimatedRowHeight,
        rowHeight: getRowHeight,
        columnWidth: (idx: number) => columns[idx].width,
      };
      console.log(props);
      return (
        <VariableSizeGrid
          {...props}
          ref={refGrid}
          // columnWidth={() => bodyWidth}

          // columnCount={10}
          // columnWidth={(idx) => columns[idx].width}
          // height={600}
          // width={800}
          // rowCount={1000}
          // rowHeight={(idx) => 35}
          // // data={dataSource}
          // useIsScrolling
          // itemKey={({ columnIndex, rowIndex, data }: any) => {
          //   return `${rowIndex}_${columnIndex}`;
          // }}
          // onScroll={handleOnScroll}
          children={Cell}
        />
      );
    }
    return (
      <FixedSizeGrid
        {...commonProps}
        ref={refGrid}
        rowHeight={rowHeight}
        columnWidth={bodyWidth}
      />
    );
  };

  return (
    <div role="table">
      <button
        onClick={() => {
          // const node = document.querySelector('.grid-table_header');
          // node.scrollLeft = 300;
          // console.log(headerRef.current, node);
          headerRef.current.scrollLeft = 300;
        }}
      >
        test btn
      </button>
      {renderGrid()}
      {/* <Header
        width={800}
        height={30}
        rowWidth={headerWidth}
        rowHeight={30}
        columns={columns}
        fixedColumns={[]}
        headerHeight={[30]}
        dataSource={dataSource}
        renderHeader={(opts) => (
          <div role="row" style={opts.style}>
            {opts.columns.map((col) => (
              <div key={col.dataIndex} style={{ width: col.width }}>
                {col.title}
              </div>
            ))}
          </div>
        )}
        renderRow={(opts) => <div>header div row</div>}
      /> */}
      {/* <VariableSizeGrid
        columnCount={10}
        columnWidth={(idx) => columns[idx].width}
        height={600}
        width={800}
        rowCount={1000}
        rowHeight={(idx) => 35}
        // data={dataSource}
        useIsScrolling
        itemKey={({ columnIndex, rowIndex, data }: any) => {
          // console.log(data);

          // const { data, rowKey } = props;
          return `${rowIndex}_${columnIndex}`;
        }}
        onScroll={handleOnScroll}
      >
        {Cell}
      </VariableSizeGrid> */}
    </div>
  );
};

export default Table;
