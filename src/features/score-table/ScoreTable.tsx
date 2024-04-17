import React from 'react';
import {Table} from 'antd';
import {mockData, TableRow} from './mock-data';
import {Medal, NoMedal} from './styled';

export const ScoreTable = () => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: 60,
      render: (value: number) => {
        return value > 3 ? (
          <NoMedal>{value}</NoMedal>
        ) : (
          <Medal value={value}>{value}</Medal>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: 'Ratio',
      dataIndex: 'ratio',
      key: 'ratio',
      sorter: (a: TableRow, b: TableRow) => a.ratio - b.ratio,
      width: 200,
    },
    {
      title: 'Clue',
      dataIndex: 'clue',
      key: 'clue',
      render: (value: boolean) => (value ? 'Yes' : 'No'),
    },
  ];

  const personalScore = localStorage.getItem('lake_monster');
  let lastScore = JSON.parse(personalScore || '{}');
  lastScore = personalScore ? [lastScore] : [];

  const dataSource = [...mockData, ...lastScore].map((row, index) => {
    return {...row, no: index + 1, key: index + 1};
  });

  const getData = (current: number, pageSize: number) => {
    return dataSource.slice((current - 1) * pageSize, current * pageSize);
  };

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ['2', '5'],
          onChange: (page: number, pageSize: number) => getData(page, pageSize),
        }}
      />
    </>
  );
};
