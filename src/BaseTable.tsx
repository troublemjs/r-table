import React from 'react';
import {
  FixedSizeGrid,
  VariableSizeGrid,
  GridChildComponentProps,
  GridProps,
  GridOnScrollProps,
} from 'react-window';
import classNames from 'classnames';

import Header from './TableHeader';
import { useRef } from 'react';
import TableHeaderRow from './TableHeaderRow';
import { renderElement } from './utils';
import TableHeaderCell from './TableHeaderCell';
import GridTable from './GridTable';

interface TableProps extends Pick<GridProps, 'useIsScrolling' | 'onScroll'> {
  dataSource: any[];
  columns: any[];
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
  const refContainer = useRef<HTMLDivElement>();
  const refMainTable = useRef<any>();
  const refLeftTable = useRef<any>();
  const refRightTable = useRef<any>();

  const Grid: React.ComponentType<any> = variableRowHeight
    ? VariableSizeGrid
    : FixedSizeGrid;

  const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => (
    <div style={style}>
      Item {rowIndex},{columnIndex}
    </div>
  );

  const handleOnScroll = (opts: GridOnScrollProps) => {
    // console.log(opts.scrollLeft);
    // console.log(headerRef.current.scrollLeft);
    // headerRef.current.scrollLeft = opts.scrollLeft;
  };

  const renderRow = ({
    isScrolling,
    columns,
    rowData,
    rowIndex,
    style,
  }: any) => {
    <div style={style}>
      Item {rowIndex},{11}
    </div>;
  };

  const renderHeader = ({ columns, headerIndex, style }: any) => {
    const headerProps = {
      columns,
      headerIndex,
      style,
    };

    return <TableHeaderRow {...headerProps} />;
  };
  const renderHeaderCell = ({
    columns,
    column,
    columnIndex,
    headerIndex,
  }: any) => {
    // return <div key={`header-${headerIndex}-cell-${column.key}-placeholder`}>placeholder</div>

    const cellProps = {
      columns,
      column,
      columnIndex,
      headerIndex,
    };
    const cell = renderElement(<TableHeaderCell />, cellProps);

    return (
      <div
        role="gridcell"
        key={`header-${headerIndex}-cell-${column.key}`}
        data-key={column.key}
      >
        {cell}
      </div>
    );
  };

  const renderMainTable = () => {
    const tableWidth = columns.reduce((acc, cur) => (acc += cur.width), 0);
    return (
      <GridTable
        // dataSource={dataSource}
        // columns={columns}
        // height={600}
        // width={800}
        // rowHeight={35}
        // estimatedRowHeight={30}
        // getRowHeight={() => 30}
        dataSource={dataSource}
        columns={columns}
        bodyWidth={tableWidth}
        height={600}
        width={800}
        estimatedRowHeight={30}
        getRowHeight={(rowIndex) => 30}
        rowHeight={30}
        useIsScrolling
        // itemKey={({ columnIndex, rowIndex, data }: any) => {
        //   return `${rowIndex}_${columnIndex}`;
        // }}
        onScroll={handleOnScroll}
        // rowRenderer={renderRow}
      />
    );
  };

  const retNode = (
    <div role="table">
      {renderMainTable()}
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
          return `${rowIndex}_${columnIndex}`;
        }}
        onScroll={handleOnScroll}
      >
        {Cell}
      </VariableSizeGrid> */}
    </div>
  );

  return retNode;
};

export default Table;
