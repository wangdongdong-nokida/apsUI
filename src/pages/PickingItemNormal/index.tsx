import { Button, Col, Row, message, Menu, Dropdown, Select, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ActionType, ProColumns } from '@ant-design/pro-table/lib/Table';

import { DownOutlined, PlusOutlined } from '@ant-design/icons/lib';
import { FormInstance } from 'antd/lib/form/Form';
import { Key } from 'antd/es/table/interface';
import { ViewBhInfo } from '@/pages/ScribingNormal/components/ViewBhInfo';
import { Wafer } from './data';
import {
  createPickingItem, deletePickingOrders, queryPickingOrders, queryWaferProductWarehouse,
  queryWaferWarehouse, queryWaferWarehouseSalesOrder,
} from './service';

const CreateTestItem: React.FC<{}> = () => {
  const stockFormRef = useRef<FormInstance>();
  const salesOrderFormRef = useRef<FormInstance>();
  const stockActionRef = useRef<ActionType>();
  const salesOrderActionRef = useRef<ActionType>();
  const productActionRef = useRef<ActionType>();
  const productFormRef = useRef<FormInstance>();

  const [stockList, handleStockList] = useState<Key[]>();
  const modelNr = {};
  const [productList, handleProductList] = useState<Key[]>();

  const [ViewBhInfoVisible, handleViewBhInfoVisible] = useState<boolean>(false);
  const [bhClickRow, handleBhClickRow] = useState<any>();

  const handleRemove = async (ids: any) => {
    await deletePickingOrders(ids);
  };

  const proTableProps = {
    pagination: { pageSizeOptions: ['10', '20','50'], pageSize: 20 },
    rowKey: 'id',
    search: { span: 8 },
    bordered: true,
    beforeSearchSubmit: (searchInfo: any) => {
      return {
        params: searchInfo,
      };
    },
  };

  const waferColumn: ProColumns<Wafer>[] = [
    {
      title: 'id',
      dataIndex: 'id',
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
      title: '版号',
      dataIndex: 'waferNr',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              handleBhClickRow(dom);
              handleViewBhInfoVisible(!ViewBhInfoVisible);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '片号',
      dataIndex: 'sliceNr',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
    },
  ];

  const salesOrderDetail = [
    {
      title: '合同号',
      dataIndex: 'bindingContracts',
      hideInSearch: true,
    },
    {
      title: '客户',
      dataIndex: 'bindingCustomers',
      hideInSearch: true,
    },
    {
      title: '订单数量',
      dataIndex: 'bindingQuantity',
      hideInSearch: true,
    },
    {
      title: '订单类型',
      dataIndex: 'bindingSalesOrderType',
      hideInSearch: true,
    },
    {
      title: '销售订单号',
      dataIndex: 'bindingSalesOrders',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'bindingContractBrief',
      hideInSearch: true,
    },
    {
      title: '检验完成时间',
      dataIndex: 'bindingjywcsj',
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
      dataIndex: ['waferWarehouse', 'waferNr'],
    },
    {
      title: '片号',
      dataIndex: ['waferWarehouse', 'sliceNr'],
    },
    {
      title: '型号选择',
      dataIndex: 'modelNrs',
      render(text, record, action) {
        const options = text?.map((value, number, record) => (
          <Select.Option value={value} key={number}>
            {value}
          </Select.Option>
        ));
        modelNr[record?.id] = text ? text[0] : null;
        return (
          <Select style={{ width: '100%' }} defaultValue={text ? text[0] : null} onChange={(value) => {
            modelNr[record?.id] = value;
          }}>
            {options}
          </Select>);
      },
    },
    {
      title: '型号',
      dataIndex: 'modelNrs',
      render(text, record, action) {
        return (
          text?.map((value) => {
            return (
              <Tag>
                {value}
              </Tag>
            );
          })
        );
      },
    },
    {
      title: '电路序号',
      dataIndex: 'circuitNr',
    },
    {
      title: '圆片状态',
      dataIndex: ['waferWarehouse', 'status'],
    },
    {
      title: '销售订单',
      dataIndex: 'bindSalesOrder',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
    },
  ];

  const pickingOrderColumn: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: ['id'],
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
    {
      title: '数量',
      dataIndex: ['quantity'],
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
            headerTitle="库存信息"
            actionRef={stockActionRef}
            formRef={stockFormRef}
            {...proTableProps}
            scroll={{ y: 500, scrollToFirstRowOnChange: true }}
            request={(params) => {
              return queryWaferWarehouse(params);
            }}
            columns={waferColumn}
            rowSelection={{
              type: 'radio',
              onChange: (selectedRowKeys) => {
                handleStockList(selectedRowKeys);
                if (productFormRef && productFormRef.current) {
                  productFormRef.current.submit();
                }
                if (salesOrderActionRef && salesOrderActionRef.current) {
                  salesOrderActionRef.current.reload();
                }
              },
            }}
          />
        </Col>

      </Row>

      <Row>
        <Col span={24}>
          <ProTable
            headerTitle="订单信息"
            search={false}
            actionRef={salesOrderActionRef}
            formRef={salesOrderFormRef}
            {...proTableProps}
            scroll={{ y: 500, scrollToFirstRowOnChange: true }}
            // params={{ params: { 'waferWarehouse-ID': stockList ? stockList[0] : '' } }}
            request={() => {
              return queryWaferWarehouseSalesOrder({ 'waferWarehouse-ID': stockList ? stockList[0] : '' });
            }}
            columns={salesOrderDetail}
          />
        </Col>

      </Row>
      <Row>
        <Col span={24}>
          <ProTable
            headerTitle="物料状态(片装)"
            actionRef={stockActionRef}
            formRef={stockFormRef}
            {...proTableProps}
            scroll={{ y: 500, x: 1000, scrollToFirstRowOnChange: true }}
            beforeSearchSubmit={(searchInfo) => {
              return {
                params: { ...searchInfo },
              };
            }}
            toolBarRender={
              (action, { selectedRowKeys }) => [
                selectedRowKeys && selectedRowKeys.length > 0 && <Button
                  icon={<PlusOutlined/>}
                  type="primary"
                  onClick={async () => {
                    // const submitForm = await form.validateFields();
                    const hide = message.loading('正在添加');
                    try {
                      // console.log(...modelNr);
                      await createButton({
                        modelIds: productList,
                        modelNrs:
                        modelNr,
                      });
                      hide();
                      message.success('创建成功');
                      return true;
                    } catch (e) {
                      hide();
                      message.error('添加失败请重试！');
                      return false;
                    } finally {
                      if (productActionRef.current) {
                        productActionRef.current.reload();
                      }
                    }
                  }}
                >创建挑粒明细</Button>,
              ]
            }
            search={false}
            params={{ params: { 'waferWarehouse-ID': stockList ? stockList[0] : '' } }}
            request={(params) => {
              return queryWaferProductWarehouse(params);
            }}
            columns={productColumn}
            rowSelection={{
              onChange: (selectedRowKeys) => {
                handleProductList(selectedRowKeys);
              },
            }}
          />
        </Col>
      </Row>
      <Row gutter={[30, 16]}>
        <Col span={24}>
          <ProTable
            headerTitle="已建挑粒明细"
            actionRef={productActionRef}
            formRef={productFormRef}
            {...proTableProps}
            scroll={{ y: 250, x: 1500, scrollToFirstRowOnChange: true }}
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
            params={{ params: { 'waferGearWarehouse-waferModelWarehouse-waferWarehouse-ID': stockList ? stockList[0] : '' } }}
            request={(params) => {
              return queryPickingOrders(params);
            }}
            columns={pickingOrderColumn}
            rowSelection={{
              onChange: (selectedRowKeys) => {
                handleProductList(selectedRowKeys);
              },
            }}
          />
        </Col>
      </Row>
      <ViewBhInfo modalVisible={ViewBhInfoVisible} onCancel={() => {
        handleViewBhInfoVisible(false);
      }} bhRow={bhClickRow}/>
    </PageHeaderWrapper>
  );

};

export default CreateTestItem;
