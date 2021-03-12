import { Button, Col, Row, message, Menu, Dropdown, Modal, Select } from 'antd';
import React, { useState, useRef, Key, ReactText } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ActionType, ProColumns } from '@ant-design/pro-table/lib/Table';

import { DownOutlined, EditOutlined } from '@ant-design/icons/lib';
import { FormInstance } from 'antd/lib/form/Form';
import { EditEquipment } from './components/EditEquipment';
import {
  autoCreateOperation,
  createOperation,
  deleteOperations,
  deletePickingOrders,
  getWorkFlow, getWorkStep,
  queryOperations,
  queryPickingOrders,
} from './service';
import { ViewBhInfo } from '@/pages/ScribingNormal/components/ViewBhInfo';

const CreateTestItem: React.FC<{}> = () => {

  const pickingOrderActionRef = useRef<ActionType>();
  const pickingOrderFormRef = useRef<FormInstance>();

  const operationActionRef = useRef<ActionType>();
  const operationFormRef = useRef<FormInstance>();

  const [equipmentVisible, handlerEquipmentVisible] = useState<boolean>(false);

  const [operationKeys, handleOperationKeys] = useState<ReactText[]>([]);
  const [equipments, handleEquipments] = useState<any>([]);

  const [ViewBhInfoVisible, handleViewBhInfoVisible] = useState<boolean>(false);
  const [bhClickRow, handleBhClickRow] = useState<any>();

  const handleRemove = async (ids: any) => {
    await deletePickingOrders(ids);
  };

  const handleOperationRemove = async (ids: any) => {
    await deleteOperations(ids);
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

  const pickingOrderColumn: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: ['pickingOrder', 'id'],
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '状态',
      dataIndex: 'createState',
      hideInTable: true,
      valueEnum: {
        created: '已设置',
        uncreated: '未设置',
      },
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
      hideInSearch: true,
    },
    {
      title: '物料状态',
      dataIndex: ['sliceState'],
      hideInSearch: true,
    },
    {
      title: '物料类型',
      dataIndex: ['salesOrder'],
      render: (text) => {
        return text ? '芯片' : '圆片';
      },
      hideInSearch: true,
    },
    // {
    //   title: '销售订单',
    //   dataIndex: ['bindSalesOrder'],
    // },
    {
      title: '客户',
      dataIndex: ['bindCustomer'],
    },
    {
      title: '合同',
      dataIndex: ['bindContract'],
    },
    {
      title: '订单数量',
      dataIndex: ['salesOrderQuantities'],
      hideInSearch: true,
    },
    {
      title: '数量',
      dataIndex: ['quantity'],
      hideInSearch: true,
    },
  ];

  const operationColumn: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: ['id'],
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '显示方式',
      dataIndex: ['showType'],
      hideInTable: true,
      valueEnum: {
        total: '所有',
        created: '已排',
        uncreated: '未排',
      },
    },
    {
      title: '版号',
      dataIndex: ['waferNr'],
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              handleBhClickRow(dom);
              handleViewBhInfoVisible(!ViewBhInfoVisible)
            }}
          >
            {dom}
          </a>
        );
      },
      // hideInSearch: true
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
      hideInSearch: true,
    },
    {
      title: '工艺路径',
      dataIndex: ['workFlowName'],
      hideInSearch: true,
    },
    {
      title: '工序',
      dataIndex: ['workStepName'],
      // hideInSearch: true
    },
    {
      title: '工位',
      dataIndex: ['equipmentName'],
      hideInSearch: true,
    },
    {
      title: '生产时长',
      dataIndex: ['durationTime'],
      hideInSearch: true,
    },
    {
      title: '数量',
      dataIndex: ['quantity'],
      hideInSearch: true,
    },
    {
      title: '排产开始时间',
      dataIndex: ['startDate'],
      hideInSearch: true,
    },
    {
      title: '排产结束时间',
      dataIndex: ['endDate'],
      hideInSearch: true,
    },
    // {
    //   title: '销售订单',
    //   dataIndex: ['bindSalesOrder'],
    //   width: 300,
    //   hideInSearch: true
    // },
    {
      title: '客户',
      dataIndex: ['bindCustomer'],
    },
    {
      title: '合同',
      dataIndex: ['bindContract'],
    },
    {
      title: '订单数量',
      dataIndex: ['salesOrderQuantities'],
      hideInSearch: true,
    },
    {
      title: '要求检验完成时间',
      dataIndex: ['salesOrderTestDate'],
      hideInSearch: true,
    },
    {
      title: '明细备注',
      dataIndex: ['itemBrief'],
      hideInSearch: true,
    },
  ];


  const [pickingOrder, handlePickingOrder] = useState<Key>();
  const [workFlow, handleWorkFlow] = useState<Key>();
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  // const [operationDataState, handlerOperationDataState] = useState<Key[]>();

  const createOperationItem = async (params: any) => {
    const hide = message.loading('正在创建工序,请稍后');
    try {
      await createOperation(params);
      hide();
    } catch (e) {
      hide();
      operationFormRef?.current.submit();
      message.error(e.data.message);
    }
  };


  return (
    <PageHeaderWrapper>
      <Row gutter={[30, 16]}>
        <Col span={24}>
          <ProTable
            headerTitle="挑粒明细"
            actionRef={pickingOrderActionRef}
            formRef={pickingOrderFormRef}
            {...proTableProps}
            scroll={{ y: 500, scrollToFirstRowOnChange: true }}
            // search={false}
            beforeSearchSubmit={(searchInfo) => {
              return {
                params: { ...searchInfo },
              };
            }}
            toolBarRender={(action, { selectedRowKeys }) => [
              selectedRowKeys && selectedRowKeys.length > 0 &&
              (<Button type="primary"
                       onClick={async () => {
                         const params = { pickingOrder };
                         await autoCreateOperation(params);
                         operationActionRef.current?.reload();
                       }}
              >自动设置挑粒工序</Button>),
              selectedRowKeys && selectedRowKeys.length > 0 &&
              (<Button type="primary"
                       onClick={() => {
                         handleModalVisible(!modalVisible);
                       }}
              >设置挑粒工序</Button>),
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
            // params={{params: {"<>bindSalesOrder": ddh, "salesOrder": true}}}
            request={(params) => {
              return queryPickingOrders(params);
            }}
            columns={pickingOrderColumn}
            rowSelection={{
              type: 'checkbox',
              onChange: (selectedRowKeys) => {
                handlePickingOrder(selectedRowKeys ? selectedRowKeys : '');
              },
            }}
          />
        </Col>
      </Row>
      <Row gutter={[30, 16]}>
        <Col span={24}>
          <ProTable
            headerTitle="已建工序"
            actionRef={operationActionRef}
            formRef={operationFormRef}
            {...proTableProps}
            scroll={{ y: 500, x: 2200, scrollToFirstRowOnChange: true }}
            // search={false}
            beforeSearchSubmit={(searchInfo) => {
              return {
                params: { ...searchInfo },
              };
            }}
            toolBarRender={(action, { selectedRowKeys, selectedRows }) => [
              selectedRowKeys && selectedRowKeys.length > 0 &&
              <Button type="primary" icon={<EditOutlined/>}
                      onClick={() => {
                        if (selectedRows && selectedRows.length > 0) {
                          let operationType = null;
                          for (let row = 0; row < selectedRows.length; row += 1) {
                            if (operationType && operationType !== selectedRows[row].workStepName) {
                              message.error('请选中相同的工序');
                              return;
                            }
                            operationType = selectedRows[row].workStepName;
                          }
                          const insideEquipments = selectedRows[0] && selectedRows[0].equipments ? selectedRows[0].equipments : null;
                          const options = insideEquipments ? insideEquipments.map((key) => (
                            <Select.Option key={key.id} value={key.id}>
                              {key.name}
                            </Select.Option>),
                          ) : null;

                          handleEquipments(options);
                          handlerEquipmentVisible(true);
                        }
                      }}>排产</Button>,
              selectedRowKeys && selectedRowKeys.length > 0 && (
                <Dropdown
                  overlay={
                    <Menu
                      onClick={async (e) => {
                        if (e.key === 'remove') {
                          await handleOperationRemove(selectedRowKeys);
                          action.reload();
                        }
                      }}
                      selectedKeys={[]}
                    >
                      <Menu.Item key="remove">删除工序</Menu.Item>
                    </Menu>
                  }
                >
                  <Button>
                    批量操作 <DownOutlined/>
                  </Button>
                </Dropdown>
              ),
            ]}
            // params={{params: {"pickingOrder-ID": pickingOrder}}}
            request={(params) => {
              return queryOperations(params);
            }}
            columns={operationColumn}
            rowSelection={{
              type: 'checkbox',
              onChange: (selectedRowKeys) => {
                handleOperationKeys(selectedRowKeys);
              },
            }}
          />
        </Col>
      </Row>

      <Modal visible={modalVisible} width={800} destroyOnClose
             onCancel={() => {
               handleModalVisible(false);
             }}
             onOk={async () => {
               const params = { pickingOrder, workFlow };
               await createOperationItem(params);
               operationActionRef.current?.reload();
               pickingOrderActionRef.current?.reload();
               handleModalVisible(false);
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
                  type: 'radio',
                  onChange: (selectedRowKeys) => {
                    handleWorkFlow(selectedRowKeys ? selectedRowKeys[0] : '');
                  },
                }
              }
              request={async (params) => {
                return getWorkFlow(params);
              }}
              columns={[
                {
                  title: '工艺路径名称',
                  dataIndex: ['workFlowName', 'workFlowName'],
                },
                {
                  title: 'ID',
                  dataIndex: 'id',
                  hideInTable: true,
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProTable
              search={false}
              options={false}
              rowKey="id"
              request={async (params) => {
                return getWorkStep(params);
              }}
              params={{ params: { 'workFlow-ID': workFlow }, orderBy: 'SEQUENCE' }}
              columns={[
                {
                  title: '工序名称',
                  dataIndex: ['workStepName', 'stepName'],
                },
                {
                  title: 'ID',
                  dataIndex: 'id',
                  hideInTable: true,
                },
              ]}
            />
          </Col>
        </Row>
      </Modal>

      <EditEquipment modalVisible={equipmentVisible} onCancel={() => {
        handlerEquipmentVisible(false);
      }} params={{ ids: operationKeys, equipments, operationActionRef }}/>

      <ViewBhInfo modalVisible={ViewBhInfoVisible} onCancel={()=>{handleViewBhInfoVisible(false)}} bhRow={bhClickRow}/>
    </PageHeaderWrapper>
  );

};

export default CreateTestItem;
