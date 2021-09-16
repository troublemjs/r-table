// import React from 'react';
import {
  FixedSizeGrid,
  VariableSizeGrid,
  GridChildComponentProps,
  GridProps,
  GridOnScrollProps,
} from 'react-window';
import classNames from 'classnames';

import Header from './TableHeader';
import type { IColumn, RecordType } from './types';
import { useRef } from 'react';

interface TableProps extends Pick<GridProps, 'useIsScrolling' | 'onScroll'> {
  dataSource: RecordType[];
  columns: IColumn[];
  prefixCls?: string;
  className?: string;
  width: number;
  height: number;
  headerHeight: number[];
  headerWidth: number;
  bodyWidth: number;
  rowHeight: number;
  variableRowHeight: boolean;
}
const Table: React.FC<Partial<TableProps>> = (props) => {
  const { dataSource, columns, variableRowHeight, headerWidth } = props;
  const headerRef = useRef<any>();

  const Grid: React.ComponentType<any> = variableRowHeight
    ? VariableSizeGrid
    : FixedSizeGrid;

  const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => (
    <div style={style}>
      Item {rowIndex},{columnIndex}
    </div>
  );

  const handleOnScroll = (opts: GridOnScrollProps) => {
    console.log(opts.scrollLeft);

    // console.log(headerRef.current.scrollLeft);
    // headerRef.current.scrollLeft = opts.scrollLeft;
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
      {/* <div
        className="grid-table_header"
        role="grid"
        ref={headerRef}
        style={{
          background: '#f8f8f8',
          border: '1px solid red',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div role="rowgroup" style={{ width: headerWidth }}>
          <div role="row" style={{ display: 'flex', width: '100%' }}>
            {columns.map((col) => (
              <div key={col.dataIndex} style={{ width: col.width }}>
                {col.title}
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <Header
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
      />
      <VariableSizeGrid
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
      </VariableSizeGrid>
    </div>
  );
};

export default Table;
