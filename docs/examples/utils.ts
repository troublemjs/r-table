export const generateColumns = (count = 10, prefix = 'column-') =>
  new Array(count).fill(0).map((col, colIdx) => ({
    dataIndex: `${prefix}${colIdx}`,
    key: `${prefix}${colIdx}`,
    title: `Column ${colIdx}`,
    width: 150,
  }));

export const generateData = (columns: any[], count = 200, prefix = 'row-') =>
  new Array(count).fill(0).map((row, rowIdx) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[
          column.key || column.dataIndex
        ] = `Row ${rowIdx} - Col ${columnIndex}`;
        return rowData;
      },
      {
        id: `${prefix}${rowIdx}`,
        parentId: null,
      },
    );
  });
