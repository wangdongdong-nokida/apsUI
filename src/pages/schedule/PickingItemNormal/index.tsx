import {Button, Col, Row, message, Menu, Dropdown} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";

import {DownOutlined, PlusOutlined} from "@ant-design/icons/lib";
import {FormInstance} from "antd/lib/form/Form";
import {Key} from "antd/es/table/interface";
import {Wafer} from './data.d';
import {
  createPackingItem, deletePackingOrders, queryPackingOrders, queryWaferProductWarehouse,
  queryWaferWarehouse
} from './service';

const CreateTestItem: React.FC<{}> = () => {

  const stockFormRef = useRef<FormInstance>();
  const stockActionRef = useRef<ActionType>();
  const productActionRef = useRef<ActionType>();
  const productFormRef = useRef<FormInstance>();

  const [stockList, handleStockList] = useState<Key[]>();
  const [productList, handleProductList] = useState<Key[]>();

  const handleRemove= async (ids:any)=>{
    await deletePackingOrders(ids);
  };

  const proTableProps = {
    pagination: {pageSizeOptions: ["5", "10", "20"], pageSize: 5},
    rowKey: "id",
    search: {span: 8},
    bordered: true,
    beforeSearchSubmit: (searchInfo: any) => {
      return {
        params: searchInfo
      }
    }
  };

  const waferColumn: ProColumns<Wafer>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '版号',
      dataIndex: 'waferNr',
    },
    {
      title: '片号',
      dataIndex: 'sliceNr',
    },
    {
      title: "父版号",
      dataIndex: "fatherWaferNr"
    },
    {
      title: "类型",
      dataIndex: "type"
    },
    {
      title: "批次号",
      dataIndex: "batchNr"
    },
    {
      title: "状态",
      dataIndex: "status"
    },
    {
      title: "备注",
      dataIndex: "brief"
    }
  ];


  const productColumn: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: "id",
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '版号',
      dataIndex: ["waferWarehouse",'waferNr'],
    },
    {
      title: '片号',
      dataIndex: ["waferWarehouse",'sliceNr'],
    },
    {
      title: '型号',
      dataIndex: 'modelNr',
    },
    {
      title: "电路序号",
      dataIndex: "circuitNr"
    },
    {
      title: '圆片状态',
      dataIndex: ["waferWarehouse",'status'],
    },
    {
      title: '销售订单',
      dataIndex: 'bindSalesOrder',
    }
  ];

  const packingOrderColumn: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: ["packingOrder","id"],
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '版号',
      dataIndex: ["packingOrder",'waferNr'],
    },
    {
      title: '片号',
      dataIndex: ["packingOrder",'sliceNr'],
    },
    {
      title: '型号',
      dataIndex: ["packingOrder",'modelNr'],
    },
    {
      title: "电路序号",
      dataIndex: ["packingOrder","circuitNr"]
    },
    {
      title: '圆片状态',
      dataIndex: ["packingOrder",'sliceState'],
    },
    {
      title: '销售订单',
      dataIndex: ["packingOrder",'bindSalesOrder'],
    }
  ];


  const createButton = (params: any) => {
    return createPackingItem(params)
  };


  return (
    <PageHeaderWrapper>
      <Row gutter={[30, 16]}>
        <Col span={12}>
          <ProTable
            headerTitle="库存信息"
            actionRef={stockActionRef}
            formRef={stockFormRef}
            {...proTableProps}
            scroll={{y: 500,x:1000, scrollToFirstRowOnChange: true}}
            request={(params) => {
              return queryWaferWarehouse(params);
            }}
            columns={waferColumn}
            rowSelection={{
              type: "radio",
              onChange: (selectedRowKeys) => {
                handleStockList(selectedRowKeys);
                if (productFormRef && productFormRef.current) {
                  productFormRef.current.submit();
                }
              }
            }}
          />
        </Col>
        <Col span={12}>
          <ProTable
            headerTitle="型号信息(片装)"
            actionRef={productActionRef}
            formRef={productFormRef}
            {...proTableProps}
            scroll={{y: 500, x:1000,scrollToFirstRowOnChange: true}}
            beforeSearchSubmit={(searchInfo) => {
              return {
                params: {...searchInfo}
              }
            }}
            toolBarRender={
              (action, {selectedRowKeys}) => [
                selectedRowKeys && selectedRowKeys.length > 0 && <Button
                  icon={<PlusOutlined/>}
                  type="primary"
                  onClick={async () => {
                    // const submitForm = await form.validateFields();
                    const hide = message.loading('正在添加');
                    try {
                      await createButton({
                        modelIds: productList
                      });
                      hide();
                      message.success('创建成功');
                      return true;
                    } catch (e) {
                      hide();
                      message.error('添加失败请重试！');
                      return false;
                    } finally {
                      if (stockFormRef.current) {
                        stockFormRef.current.submit();
                      }
                    }
                  }}
                >创建挑粒订单</Button>
              ]
            }
            search={false}
            params={{params: {"waferWarehouse-ID": stockList ? stockList[0] : ''}}}
            request={(params) => {
              return queryWaferProductWarehouse(params);
            }}
            columns={productColumn}
            rowSelection={{
              onChange: (selectedRowKeys) => {
                handleProductList(selectedRowKeys);
              }
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ProTable
            headerTitle="已建挑粒订单"
            actionRef={productActionRef}
            formRef={productFormRef}
            {...proTableProps}
            scroll={{y: 250, scrollToFirstRowOnChange: true}}
            search={false}
            beforeSearchSubmit={(searchInfo) => {
              return {
                params: {...searchInfo}
              }
            }}
            toolBarRender={(action, {selectedRowKeys}) => [
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
                      <Menu.Item key="remove">删除挑粒订单</Menu.Item>
                    </Menu>
                  }
                >
                  <Button>
                    批量操作 <DownOutlined/>
                  </Button>
                </Dropdown>
              )
            ]}
            params={{params: {"waferGearWarehouse-waferModelWarehouse-waferWarehouse-ID": stockList ? stockList[0] : ''}}}
            request={(params) => {
              return queryPackingOrders(params);
            }}
            columns={packingOrderColumn}
            rowSelection={{
              onChange: (selectedRowKeys) => {
                handleProductList(selectedRowKeys);
              }
            }}
          />
        </Col>
      </Row>

    </PageHeaderWrapper>
  )

};

export default CreateTestItem;
