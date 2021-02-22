import { Button, Col, Row, message, Menu, Dropdown } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ActionType, ProColumns } from '@ant-design/pro-table/lib/Table';

import { DownOutlined, PlusOutlined } from '@ant-design/icons/lib';
import { FormInstance } from 'antd/lib/form/Form';
import { Key } from 'antd/es/table/interface';
import {
  createPickingItem,
  deletePickingOrders,
  queryPickingOrders,
  queryOccupyBySalesOrder,
  querySalesOrder,
} from './service';

const CreateTestItem: React.FC<{}> = () => {

  const secondOrderFormRef = useRef<FormInstance>();
  const secondOrderActionRef = useRef<ActionType>();
  const occupyActionRef = useRef<ActionType>();
  const occupyFormRef = useRef<FormInstance>();

  const pickingOrderActionRef = useRef<ActionType>();
  const pickingOrderFormRef = useRef<FormInstance>();

  const [salesOrder, handleSalesOrder] = useState<Key[]>();
  const [ddh, handlerddh] = useState<any>();

  const handleRemove = async (ids: any) => {
    await deletePickingOrders(ids);
  };


  const proTableProps = {
    pagination: { pageSizeOptions: ['5', '10', '20'], pageSize: 5 },
    rowKey: 'id',
    search: { span: 8 },
    bordered: true,
    beforeSearchSubmit: (searchInfo: any) => {
      return {
        searchInfo,
      };
    },
  };

  const order: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: ['salesOrder', 'id'],
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '状态',
      dataIndex: 'createState',
      hideInTable: true,
      valueEnum: {
        created: '已创建',
        uncreated: '未创建',
      },
    },
    {
      title: '合同类别',
      dataIndex: ['salesOrder', 'lHt', 'ddlx'],
      fixed: true,
      width:130
    },
    {
      title: '型号',
      dataIndex: ['salesOrder', 'xh'],
      fixed: true,
      width:130
    },
    {
      title: '订单数量',
      dataIndex: ['salesOrder', 'dgsl'],
      hideInSearch: true,
      fixed: true,
      width:130
    },
    {
      title: '合同号',
      dataIndex: ['salesOrder', 'lHt', 'lHtname'],
      fixed: true,
      width:130
    },
    {
      title: '客户',
      dataIndex: ['salesOrder', 'lHt', 'kh'],
      fixed: true,
      width:130
    },
    {
      title: '检验完成时间',
      dataIndex: ['salesOrder', 'jywcsj'],
      hideInSearch: true,
    },
    {
      title: '预发货日期',
      dataIndex: ['salesOrder', 'yfhrq'],
      hideInSearch: true,
    },
    {
      title: '提供方式',
      dataIndex: ['salesOrder', 'lTgfs', 'lTgfsname'],
      hideInSearch: true,
    },
    {
      title: '质量等级',
      dataIndex: ['salesOrder', 'zldj'],
      hideInSearch: true,
    },
    {
      title: '合同备注',
      dataIndex: ['salesOrder', 'lHt', 'bz'],
    },
    {
      title: '备注',
      dataIndex: ['salesOrder', 'ckbz'],
      hideInSearch: true,
    },
    {
      title: '订单号',
      dataIndex: ['salesOrder', 'lDdname'],
    },
    // {
    //   title: '版号',
    //   dataIndex: 'bh',
    // },
    {
      title: '订单状态',
      dataIndex: ['salesOrder', 'ddzt'],
      hideInSearch: true,
    },

    {
      title: '是否军检',
      dataIndex: ['salesOrder', 'sfjj'],
      hideInSearch: true,
    },
    {
      title: '是否监制',
      dataIndex: ['salesOrder', 'sfjz'],
      hideInSearch: true,
    },
    {
      title: '是否重点',
      dataIndex: ['salesOrder', 'sfzdgc'],
      hideInSearch: true,
    },
    {
      title: '父版号',
      dataIndex: ['salesOrder', 'fatherWaferNr'],
      hideInSearch: true,
    },
    {
      title: '类型',
      dataIndex: ['salesOrder', 'type'],
      hideInSearch: true,
    },
    {
      title: '批次号',
      dataIndex: ['salesOrder', 'batchNr'],
      hideInSearch: true,
    },
  ];


  const productColumn: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '版号',
      dataIndex: ['waferModelWarehouse', 'waferWarehouse', 'waferNr'],
      // fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '片号',
      dataIndex: ['waferModelWarehouse', 'waferWarehouse', 'sliceNr'],
      hideInSearch: true,
    },
    {
      title: '型号',
      dataIndex: ['xh'],
      hideInSearch: true,
    },
    {
      title: '电路序号',
      dataIndex: ['waferModelWarehouse', 'circuitNr'],
      hideInSearch: true,
    },
    {
      title: '物理形态',
      dataIndex: ['wlxt'],
      hideInSearch: true,
    },
    {
      title: '圆片状态',
      dataIndex: ['wlzt'],
      // hideInSearch: true,
    },
    {
      title: '占料数量',
      dataIndex: ['zlsl'],
      // hideInSearch: true,
    },
    {
      title: '销售订单',
      dataIndex: 'bindSalesOrder',
      // hideInSearch: true,
    },
  ];

  const pickingOrderColumn: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: ['pickingOrder', 'id'],
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '版号',
      dataIndex: ['waferNr'],
    },
    {
      title: '片号',
      dataIndex: ['sliceNr'],
    },
    {
      title: '型号',
      dataIndex: ['modelNr'],
    },
    {
      title: '电路序号',
      dataIndex: ['circuitNr'],
    },
    {
      title: '圆片状态',
      dataIndex: ['sliceState'],
    },
    {
      title: '销售订单',
      dataIndex: ['bindSalesOrder'],
    },
  ];


  const createButton = (params: any) => {
    return createPickingItem(params);
  };


  return (
    <PageHeaderWrapper>
      <Row gutter={[30, 16]}>
        <Col span={24}>
          <ProTable
            headerTitle="销售订单"
            actionRef={secondOrderActionRef}
            formRef={secondOrderFormRef}
            {...proTableProps}
            rowKey={(record, index) => {
              return record?.salesOrder?.id;
            }}
            toolBarRender={(action, { selectedRowKeys }) => [
              selectedRowKeys && selectedRowKeys.length > 0 && <Button
                icon={<PlusOutlined/>}
                type="primary"
                onClick={async () => {
                  // const submitForm = await form.validateFields();
                  const hide = message.loading('正在添加');
                  try {
                    await createButton({
                      salesOrderIds: selectedRowKeys,
                    });
                    hide();
                    message.success('创建成功');
                    return true;
                  } catch (e) {
                    hide();
                    message.error('添加失败请重试！');
                    return false;
                  } finally {
                    pickingOrderActionRef?.current?.reload();
                  }
                }}
              >创建挑粒明细</Button>,
            ]}
            scroll={{ y: 500, x: 2500, scrollToFirstRowOnChange: true }}
            request={(params) => {
              return querySalesOrder(params);
            }}
            params={{ params: { 'waferGearWarehouse-WLXT': '芯片' } }}
            columns={order}
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys, selectRowItem) => {
                handleSalesOrder(selectedRowKeys);
                handlerddh(selectRowItem ? selectRowItem[0]?.salesOrder?.lDdname : '');
              },
            }}
          />
        </Col>

      </Row>

      <Row>
        <Col span={24}>
          <Row gutter={[30, 16]}>
            <Col span={24}>
              <ProTable
                headerTitle="占料信息（盒装芯片）"
                actionRef={occupyActionRef}
                formRef={occupyFormRef}
                {...proTableProps}
                scroll={{ y: 500, x: 800, scrollToFirstRowOnChange: true }}
                beforeSearchSubmit={(searchInfo) => {
                  return {
                    params: { ...searchInfo },
                  };
                }}
                postData={(data) => {
                  return data ? data?.map((value) => {
                    value.zlsl = 0;
                    value?.occupies?.map((occupy) => {
                      value.zlsl += occupy?.zlsl;
                    });
                    return value;
                  }) : data;
                }}
                search={false}
                params={{
                  params: {
                    'salesOrder-ID': salesOrder ? salesOrder[0] : '',
                    'waferGearWarehouse-WLXT': '芯片',
                  },
                }}
                request={(params) => {
                  return queryOccupyBySalesOrder(params);
                }}
                columns={productColumn}
                // rowSelection={{
                //   onChange: (selectedRowKeys) => {
                //     handleProductList(selectedRowKeys);
                //   }
                // }}
              />
            </Col>
          </Row>
        </Col>

      </Row>

      <Row gutter={[30, 16]}>
        <Col span={24}>
          <ProTable
            headerTitle="已建挑粒明细"
            actionRef={pickingOrderActionRef}
            formRef={pickingOrderFormRef}
            {...proTableProps}
            scroll={{ y: 500, x: 1000, scrollToFirstRowOnChange: true }}
            search={false}
            beforeSearchSubmit={(searchInfo) => {
              return {
                params: { ...searchInfo },
              };
            }}
            toolBarRender={(action, { selectedRowKeys }) => [
              selectedRowKeys && selectedRowKeys.length > 0 && (
                <Dropdown
                  overlay={
                    <Menu
                      onClick={async (e) => {
                        if (e.key === 'remove') {
                          await handleRemove(selectedRowKeys);
                          action.reload();
                        }
                      }}
                      selectedKeys={[]}
                    >
                      <Menu.Item key="remove">删除挑粒明细</Menu.Item>
                    </Menu>
                  }
                >
                  <Button>
                    批量操作 <DownOutlined/>
                  </Button>
                </Dropdown>
              ),
            ]}
            params={{ params: { '<>bindSalesOrder': ddh, 'salesOrder': true } }}
            request={(params) => {
              return queryPickingOrders(params);
            }}
            columns={pickingOrderColumn}
            rowSelection={{
              // onChange: (selectedRowKeys) => {
              //   handleProductList(selectedRowKeys);
              // }
            }}
          />
        </Col>
      </Row>

    </PageHeaderWrapper>
  );

};

export default CreateTestItem;
