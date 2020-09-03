import {Button, Col, Row, message, Menu, Dropdown, Modal} from 'antd';
import React, {useState, useRef, Key} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";

import {DownOutlined} from "@ant-design/icons/lib";
import {FormInstance} from "antd/lib/form/Form";
import {
  createOperation,
  deletePackingOrders, getWorkFlow, getWorkStep, queryOperations,
  queryPackingOrders,
} from './service';

const CreateTestItem: React.FC<{}> = () => {


  const packingOrderActionRef = useRef<ActionType>();
  const packingOrderFormRef = useRef<FormInstance>();

  const handleRemove = async (ids: any) => {
    await deletePackingOrders(ids);
  };


  const inputStyle = {width: "80%"};

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
    {
      title: '片号',
      dataIndex: ['sliceNr'],
    },
    {
      title: '型号',
      dataIndex: ['modelNr'],
    },
    {
      title: "电路序号",
      dataIndex: ["circuitNr"]
    },
    {
      title: '销售订单',
      dataIndex: ['bindSalesOrder'],
    },
    {
      title: '订单数量',
      dataIndex: ['salesOrderQuantities'],
    }
  ];

  const operationColumn: ProColumns<{}>[] = [
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
    {
      title: '片号',
      dataIndex: ['sliceNr'],
    },
    {
      title: '型号',
      dataIndex: ['modelNr'],
    },
    {
      title: "电路序号",
      dataIndex: ["circuitNr"]
    },
    {
      title: '销售订单',
      dataIndex: ['bindSalesOrder'],
    },
    {
      title: '订单数量',
      dataIndex: ['salesOrderQuantities'],
    }
  ];


  const [packingOrder, handlePackingOrder] = useState<Key>();
  const [workFlow, handleWorkFlow] = useState<Key>();
  const [workFlowStep, handleWorkFlowStep] = useState<Key[]>();
  const [modalVisible, handleModalVisible] = useState<boolean>(false);

  const createOperationItem = async (params:any) => {
    const hide = message.loading("正在创建工序,请稍后");
    try {
      await createOperation(params);
      hide();
    } catch (e) {
      hide();
      message.error("创建失败请重试");
    }
  };


  return (
    <PageHeaderWrapper>
      <Row gutter={[30, 16]}>
        <Col span={24}>
          <ProTable
            headerTitle="挑粒订单"
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
              selectedRowKeys && selectedRowKeys.length > 0 && (<Button type="primary"
                                                                        onClick={() => {
                                                                          handleModalVisible(!modalVisible)
                                                                        }}
              >创建挑粒工序</Button>),
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
            // params={{params: {"<>bindSalesOrder": ddh, "salesOrder": true}}}
            request={(params) => {
              return queryPackingOrders(params);
            }}
            columns={packingOrderColumn}
            rowSelection={{
              type: "radio",
              onChange: (selectedRowKeys) => {
                handlePackingOrder(selectedRowKeys?selectedRowKeys[0]:"");
              }
            }}
          />
        </Col>
      </Row>
      <Row gutter={[30, 16]}>
        <Col span={24}>
          <ProTable
            headerTitle="已建工序"
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
              selectedRowKeys && selectedRowKeys.length > 0 && (<Button type="primary"
                                                                        onClick={() => {
                                                                          handleModalVisible(!modalVisible)
                                                                        }}
              >创建挑粒工序</Button>),
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
            params={{params: {"packingOrder-ID": packingOrder}}}
            request={(params) => {
              return queryOperations(params);
            }}
            columns={operationColumn}
            rowSelection={{
              type: "checkbox",
              // onChange: (selectedRowKeys) => {
              //   handlePackingOrder(selectedRowKeys?selectedRowKeys[0]:"");
              // }
            }}
          />
        </Col>
      </Row>

      <Modal visible={modalVisible}
             width={800}
             onCancel={() => {
               handleModalVisible(false)
             }}
             destroyOnClose
             onOk={async () => {
               const params={
                 packingOrder:[packingOrder],
                 workFlow:[workFlow],
                 workFlowStep
               };
               await createOperationItem(params);
             }
             }
      >
        <Row gutter={[10, 8]}>
          <Col span={12}>
            <ProTable
              search={false}
              options={false}
              rowKey="id"
              rowSelection={
                {
                  type: "radio",
                  onChange: (selectedRowKeys) => {
                    handleWorkFlow(selectedRowKeys ? selectedRowKeys[0] : "");
                  }
                }
              }
              request={async (params) => {
                return getWorkFlow(params)
              }}
              columns={[
                {
                  title: "工艺路径名称",
                  dataIndex: ["workFlowName", "workFlowName"],
                },
                {
                  title: "ID",
                  dataIndex: "id",
                  // hideInTable: true
                }
              ]}
            />
          </Col>
          <Col span={12}>
            <ProTable
              search={false}
              options={false}
              rowKey="id"
              rowSelection={{
                onChange: (selectRowKeys) => {
                  handleWorkFlowStep(selectRowKeys)
                }
              }}
              request={async (params) => {
                return getWorkStep(params);
              }}
              params={{params: {"workFlow-ID": workFlow}}}
              columns={[
                {
                  title: "工序名称",
                  dataIndex: ["workStepName", "stepName"],
                },
                {
                  title: "ID",
                  dataIndex: "id",
                  hideInTable: true
                }
              ]}
            />
          </Col>

        </Row>
      </Modal>
    </PageHeaderWrapper>
  )

};

export default CreateTestItem;
