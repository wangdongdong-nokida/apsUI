import {Button, Col, Row, message, Menu, Dropdown} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";

import {DownOutlined, PlusOutlined} from "@ant-design/icons/lib";
import {FormInstance} from "antd/lib/form/Form";
import {Key} from "antd/es/table/interface";
import {
  createPackingItem,
  deletePackingOrders,
  queryPackingOrders,
  queryOccupyBySalesOrder,
  querySalesOrder
} from './service';

const CreateTestItem: React.FC<{}> = () => {

  const secondOrderFormRef = useRef<FormInstance>();
  const secondOrderActionRef = useRef<ActionType>();
  const occupyActionRef = useRef<ActionType>();
  const occupyFormRef = useRef<FormInstance>();

  const packingOrderActionRef = useRef<ActionType>();
  const packingOrderFormRef = useRef<FormInstance>();

  const [salesOrder, handleSalesOrder] = useState<Key[]>();
  const [ddh, handlerddh] = useState<any>();

  const handleRemove = async (ids: any) => {
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


  const order: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '版号',
      dataIndex: 'bh',
    },

    {
      title: '型号',
      dataIndex: 'xh',
    },
    {
      title: '订单号',
      dataIndex: 'ddh',
    },
    {
      title: '订单数量',
      dataIndex: 'ddsl',
    },
    {
      title: '订单状态',
      dataIndex: 'ddzt',
    },
    {
      title: '客户',
      dataIndex: 'khjc',
    },
    {
      title: '是否军检',
      dataIndex: 'sfjj',
    },
    {
      title: '是否监制',
      dataIndex: 'sfjz',
    },
    {
      title: '提供方式',
      dataIndex: 'tgfs',
    },
    {
      title: '预发货日期',
      dataIndex: 'yfhrq',
    },
    {
      title: '检验完成时间',
      dataIndex: 'jywcsj',
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
      dataIndex: "bz"
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
      dataIndex: ["waferModelWarehouse", "waferWarehouse", 'waferNr'],
      // fixed: 'left',
      hideInSearch: true,
    },
    {
      title: '片号',
      dataIndex: ["waferModelWarehouse", "waferWarehouse", 'sliceNr'],
      hideInSearch: true,
    },
    {
      title: '型号',
      dataIndex: ["waferModelWarehouse", 'modelNr'],
      hideInSearch: true,
    },
    {
      title: "电路序号",
      dataIndex: ["waferModelWarehouse", "circuitNr"],
      hideInSearch: true,
    },
    {
      title: "物理形态",
      dataIndex: ["wlxt"],
      hideInSearch: true,
    },
    {
      title: '圆片状态',
      dataIndex: ["waferModelWarehouse", "waferWarehouse", 'sliceState'],
      hideInSearch: true,
    },
    {
      title: '销售订单',
      dataIndex: 'bindSalesOrder',
      // hideInSearch: true,
    }
  ];

  const packingOrderColumn: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: ["packingOrder", "id"],
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '版号',
      dataIndex: ['waferNr'],
    },
    // {
    //   title: '片号',
    //   dataIndex: ['sliceNr'],
    // },
    {
      title: '型号',
      dataIndex: ['modelNr'],
    },
    {
      title: "电路序号",
      dataIndex: ["circuitNr"]
    },
    // {
    //   title: '圆片状态',
    //   dataIndex: ['sliceState'],
    // },
    {
      title: '销售订单',
      dataIndex: ['bindSalesOrder'],
    }
  ];


  const createButton = (params: any) => {
    return createPackingItem(params)
  };


  return (
    <PageHeaderWrapper>
      <Row gutter={[30, 16]}>
        <Col span={14}>
          <ProTable
            headerTitle="销售订单"
            actionRef={secondOrderActionRef}
            formRef={secondOrderFormRef}
            {...proTableProps}
            toolBarRender={(action, {selectedRowKeys}) => [
              selectedRowKeys && selectedRowKeys.length > 0 && <Button
                icon={<PlusOutlined/>}
                type="primary"
                onClick={async () => {
                  // const submitForm = await form.validateFields();
                  const hide = message.loading('正在添加');
                  try {
                    await createButton({
                      salesOrderIds: selectedRowKeys
                    });
                    hide();
                    message.success('创建成功');
                    return true;
                  } catch (e) {
                    hide();
                    message.error('添加失败请重试！');
                    return false;
                  } finally {
                    if (secondOrderFormRef.current) {
                      secondOrderFormRef.current.submit();
                    }
                  }
                }}
              >创建挑粒订单</Button>
            ]}
            scroll={{y: 500, x: 1800, scrollToFirstRowOnChange: true}}
            request={(params) => {
              return querySalesOrder(params);
            }}
            params={{params: {"!*occupies": ""}}}
            columns={order}
            rowSelection={{
              type: "radio",
              onChange: (selectedRowKeys, selectRowItem) => {
                handleSalesOrder(selectedRowKeys);
                handlerddh(selectRowItem ? selectRowItem[0]?.ddh : "");
              }
            }}
          />
        </Col>

        <Col span={10}>
          <Row gutter={[30, 16]}>
            <Col span={24}>
              <ProTable
                headerTitle="占料信息（盒装芯片）"
                actionRef={occupyActionRef}
                formRef={occupyFormRef}
                {...proTableProps}
                scroll={{y: 500, x: 800, scrollToFirstRowOnChange: true}}
                beforeSearchSubmit={(searchInfo) => {
                  return {
                    params: {...searchInfo}
                  }
                }}
                search={false}
                params={{params: {"salesOrder-ID": salesOrder ? salesOrder[0] : '',"waferGearWarehouse-WLXT":"芯片"}}}
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
            headerTitle="已建挑粒订单"
            actionRef={packingOrderActionRef}
            formRef={packingOrderFormRef}
            {...proTableProps}
            scroll={{y: 500, x: 1000, scrollToFirstRowOnChange: true}}
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
            params={{params: {"<>bindSalesOrder": ddh, "salesOrder": true}}}
            request={(params) => {
              return queryPackingOrders(params);
            }}
            columns={packingOrderColumn}
            rowSelection={{
              // onChange: (selectedRowKeys) => {
              //   handleProductList(selectedRowKeys);
              // }
            }}
          />
        </Col>
      </Row>

    </PageHeaderWrapper>
  )

};

export default CreateTestItem;
