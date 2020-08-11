import {Button, Card, Col, Row, message} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";

import {PlusOutlined} from "@ant-design/icons/lib";
import {FormInstance} from "antd/lib/form/Form";
import {Key} from "antd/es/table/interface";
import { SecondOrder, Wafer} from './data.d';
import {
  createTestItem,
  querySecondOrder,
  queryWaferWarehouse
} from './service';

const CreateTestItem: React.FC<{}> = () => {

  const secondOrderFormRef = useRef<FormInstance>();
  const stockFormRef = useRef<FormInstance>();

  const secondActionRef = useRef<ActionType>();
  const stockActionRef = useRef<ActionType>();

  const [waferNrList, handlerWaferNrList] = useState<{}>();

  const [secondOrderList, handleSecondOrderList] = useState<Key>();
  const [stockList, handleStockList] = useState<Key[]>();

  const proTableProps = {
    pagination: {pageSizeOptions: ["5", "10", "20"], pageSize: 10},
    scroll: {y: 300, scrollToFirstRowOnChange: true},
    rowKey: "id",
    search: {span: 8},
    bordered: true,
    beforeSearchSubmit: (searchInfo: any) => {
      return {
        params: searchInfo
      }
    }
  };

  const secondOrderColumns: ProColumns<SecondOrder>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '编号',
      dataIndex: 'nr',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '版号',
      dataIndex: 'waferNr',
    },
    {
      title: '订单类型',
      dataIndex: 'type',
    },
    {
      title: '订单状态',
      dataIndex: 'status',
    },
    {
      title: '产品类型',
      dataIndex: ['productType', "name"],
    }
  ];

  const waferColumn: ProColumns<Wafer>[] = [
    {
      title: '版号',
      dataIndex: ["wafer", 'nr'],
      valueEnum: waferNrList,
      hideInTable: true,
    },
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '版号',
      dataIndex: 'waferNr',
      hideInSearch:true
    },
    {
      title: '片号',
      dataIndex: 'sliceNr',
    },
  ];

  const createButton = (params: any) => {
    return createTestItem(params)
  };


// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSecondOrderSelect = (selectedRowKeys: Key[], selectedRows: any) => {
    handleSecondOrderList(selectedRowKeys[0]);
    if (selectedRows.length > 0) {
      const waferNrs: string[] | undefined = selectedRows[0].waferNr?.split(";");
      const object = {};
      if (waferNrs) {
        for (let i = 0; i < waferNrs?.length; i += 1) {
          object[waferNrs[i]] = waferNrs[i];
        }
      }
      handlerWaferNrList(object);
    } else {
      handlerWaferNrList({});
    }
  };

  return (
    <PageHeaderWrapper>
      <Row>
        <Col span={24}>
          <ProTable
            headerTitle="二级订单"
            actionRef={secondActionRef}
            formRef={secondOrderFormRef}
            {...proTableProps}
            request={(params) => querySecondOrder(params)}
            columns={secondOrderColumns}
            rowSelection={{
              type: 'radio',
              onChange: onSecondOrderSelect,
            }}/>
        </Col>
      </Row>

      <Row justify="start" style={{marginTop: 20}}>
        <Col span={24}>
          <ProTable
            headerTitle="库存信息"
            actionRef={stockActionRef}
            formRef={stockFormRef}
            {...proTableProps}
            // @ts-ignore
            beforeSearchSubmit={(searchInfo) => {
              return {
                params: {...searchInfo, waferNr: stockFormRef?.current?.getFieldValue("wafer-nr")}
              }
            }}
            request={(params) => {
              return queryWaferWarehouse(params);
            }}
            columns={waferColumn}
            rowSelection={{
              onChange: (selectedRowKeys) => {
                handleStockList(selectedRowKeys);
              }
            }}
          />
        </Col>
      </Row>
      <Card>
        <Row justify="end">
          <Col span={1.5}>
            <Button
              icon={<PlusOutlined/>}
              type="primary"
              onClick={async () => {
                const hide = message.loading('正在添加');
                try {
                  await createButton({
                    secondOrder: secondOrderList,
                    stock: stockList,
                  });
                  hide();
                  message.success('创建成功');
                  return true;
                } catch (e) {
                  hide();
                  message.error('添加失败请重试！');
                  return false;
                }
              }}
            >绑定明细</Button>
          </Col>
        </Row>
      </Card>


    </PageHeaderWrapper>
  )

};

export default CreateTestItem;
