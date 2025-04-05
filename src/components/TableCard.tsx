import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface TableCardProps<T extends object> {
  title: string;
  data: T[];
  columns: TableProps<T>['columns'];
  color?: string;
}

const TableWrapper = styled.div<{ color?: string }>`
  background-color: ${props => props.color || '#1a1a1a'};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .ant-table {
    background: transparent;
    color: rgba(255, 255, 255, 0.85);
  }
  
  .ant-table-thead > tr > th {
    background-color: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.85);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .ant-table-tbody > tr:hover > td {
    background-color: rgba(255, 255, 255, 0.08);
  }
  
  .ant-pagination-item-active {
    border-color: #1890ff;
  }
  
  .ant-pagination-item-active a {
    color: #1890ff;
  }
`;

const TableTitle = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 16px;
  font-weight: bold;
`;

function TableCard<T extends object>({ title, data, columns, color }: TableCardProps<T>) {
  // 确保每行数据都有唯一的 key 属性
  const dataWithKeys = data.map((item, index) => {
    return {
      ...item,
      key: (item as any).id || `row-${index}`
    };
  });

  return (
    <TableWrapper color={color}>
      <TableTitle>{title}</TableTitle>
      <Table<T>
        columns={columns}
        dataSource={dataWithKeys as T[]}
        pagination={{ pageSize: 5 }}
        size="middle"
        rowKey={(record) => (record as any).key || (record as any).id || ''}
      />
    </TableWrapper>
  );
}

export default TableCard; 