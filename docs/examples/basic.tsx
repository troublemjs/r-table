/**
 * title: 基础 Table
 * desc: 演示 Table 组件的基础示例
 */

import React, { useState } from 'react';
import Table from 'r-table';

import { generateColumns, generateData } from './utils';
import '../../assets/index.less';
import './basic.less';

const columns = generateColumns(10);
const dataSource = generateData(columns, 2000);

export default () => {
  return <Table data={dataSource} dataSource={dataSource} columns={columns} />;
};
