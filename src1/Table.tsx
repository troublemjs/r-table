// import React from 'react';
import { FixedSizeGrid } from 'react-window';
import classNames from 'classnames';

import GridTable from './GridTable';
import { IColumn, RecordType } from './types';
import { useEffect, useState } from 'react';
import { getScrollBarSize } from './utils';

interface TableProps {
  dataSource: RecordType[];
  columns: IColumn[];
}
const Table: React.FC<TableProps> = (props) => {
  const { dataSource, columns } = props;
  const [count, setCount] = useState<number>(0);
  console.log(props, 111);

  const columnCount = columns.length;
  const rowCount = dataSource.length;

  return (
    <div>
      {/* <div style={{ border: '1px solid #ccc', position: '' }}>Table Title</div> */}
      <button
        onClick={() => {
          // setCount(old => old + 1);
          const width = columns.reduce(
            (acc, cur) => (acc += cur.width ?? 0),
            0,
          );
          console.log(width + getScrollBarSize());
        }}
      >
        test btn{count}
      </button>
      <GridTable
        dataSource={dataSource}
        columns={columns}
        variableRowHeight={false}
        headerWidth={columns.reduce(
          (acc, cur) => (acc += cur.width ?? 0),
          getScrollBarSize(),
        )}
      />
    </div>
  );
};

export default Table;
