import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import { helloWorldApiRef } from '../../apis/HelloWorlApi';
import { useApi } from '@backstage/core-plugin-api';

export const exampleUsers = {
  results: [
    {
      key: '1',
      value: 'John Doe',
    },
  ],
};

const useStyles = makeStyles({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
});

type KeyValue = {
  key: string;
  value: string;
};

type DenseTableProps = {
  data: KeyValue[];
};

export const DenseTable = ({ data }: DenseTableProps) => {
  const classes = useStyles();

  const columns: TableColumn[] = [
    { title: 'Key', field: 'key' },
    { title: 'Value', field: 'value' },
  ];

  const mappedData = data.map(item => {
    return {
      key: item.key,
      value: item.value,
    };
  });

  return (
    <Table
      title="Example Data list"
      options={{ search: false, paging: false }}
      columns={columns}
      data={mappedData}
    />
  );
};

export const ExampleFetchComponent = () => {
  const notificationsApi = useApi(helloWorldApiRef);

  const { value, loading, error } = useAsync(async (): Promise<KeyValue[]> => {
    // Would use fetch in a real world example
    const data =  await notificationsApi.getAll();
    console.log('data', data);
    return data;

  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <DenseTable data={value || []} />;
};
