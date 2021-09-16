import React from 'react';

/** data item type */
export type RecordType = unknown;

export interface IColumn {
  dataIndex: string;
  key: string;
  title: React.ReactNode;
  width?: number;
}
