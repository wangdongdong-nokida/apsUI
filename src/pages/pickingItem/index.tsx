import {Button, Col, Row, message, Menu, Dropdown, Modal, Select, InputNumber} from 'antd';
import React, {useState, useRef, Key} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";

import {DownOutlined, EditOutlined} from "@ant-design/icons/lib";
import {FormInstance} from "antd/lib/form/Form";
import {
  createOperation, deleteOperations, deletePickingOrders,
  getWorkFlow, getWorkStep, queryOperations, queryPickingOrders,
  schedulePickingItem,
} from './service';

const CreateTestItem: React.FC<{}> = () => {

  const pickingOrderActionRef = useRef<ActionType>();
  const pickingOrderFormRef = useRef<FormInstance>();

  const operationActionRef = useRef<ActionType>();
  const operationFormRef = useRef<FormInstance>();

  const [equipmentVisible,handlerEquipmentVisible] = useState<boolean>(true);
  const [durationVisible,handlerDurationVisible] = useState<boolean>(true);
  const [quantityVisible,handlerQuantityVisible] = useState<boolean>(true);


  const handleRemove = async (ids: any) => {
    await deletePickingOrders(ids);
  };

  const handleOperationRemove = async (ids: any) => {
    await deleteOperations(ids);
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

  const pickingOrderColumn: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: ["pickingOrder", "id"],
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
      dataIndex: ["id"],
      hideInSearch: true,
      hideInTable: true
    },

    {
      title: "工位",
      dataIndex: ["equipments"],
      hideInTable:equipmentVisible,
      width: 170,
      render: (equipmets: any[], record) => {
        const options = equipmets.map((key) => (
          <Select.Option key={key.id} value={key.id}>
            {key.name}
          </Select.Option>)
        );
        return (
          <Select style={{width: "90%"}}
                  onChange={(selectValue) => {
                    record.equipmentSelected = selectValue;
                  }}>
            {options}
          </Select>);
      }
    },
    {
      title: "生产时长",
      dataIndex: ["durationTime"],
      hideInTable:durationVisible,
      render: (duration: any, record) => {
        return (<InputNumber width="90%" min={1} onChange={(value) => {
          record.duration = value;
        }}/>)
      }

    },
    {
      title: "数量",
      dataIndex: ["quantity"],
      hideInTable:quantityVisible,
      render: (duration: any, record) => {
        return (
          <InputNumber min={1} style={{width: "90%"}}
                       onChange={(value) => {
                         record.quantity = value;
                       }}
          />)
      }
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
      title: "工艺路径",
      dataIndex: ["workFlowName"]
    },
    {
      title: "工序",
      dataIndex: ["workStepName"]
    },
    {
      title: "工位",
      dataIndex: ["equipmentName",],
    },
    {
      title: "生产时长",
      dataIndex: ["durationTime"],
    },
    {
      title: '排产开始时间',
      dataIndex: ['startDate'],
    },
    {
      title: '排产结束时间',
      dataIndex: ['endDate'],
    },
    {
      title: '销售订单',
      dataIndex: ['bindSalesOrder'],
      width: 300
    },
    {
      title: '订单数量',
      dataIndex: ['salesOrderQuantities'],
    }
  ];


  const [pickingOrder, handlePickingOrder] = useState<Key>();
  const [workFlow, handleWorkFlow] = useState<Key>();
  const [workFlowStep, handleWorkFlowStep] = useState<Key[]>();
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  // const [operationDataState, handlerOperationDataState] = useState<Key[]>();

  const createOperationItem = async (params: any) => {
    const hide = message.loading("正在创建工序,请稍后");
    try {
      await createOperation(params);
      hide();
    } catch (e) {
      hide();
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
            scroll={{y: 500, x: 2000, scrollToFirstRowOnChange: true}}
            search={false}
            beforeSearchSubmit={(searchInfo) => {
              return {
                params: {...searchInfo}
              }
            }}
            toolBarRender={(action, {selectedRowKeys}) => [
              selectedRowKeys && selectedRowKeys.length > 0 &&
              (<Button type="primary"
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
                      <Menu.Item key="remove">删除挑粒明细</Menu.Item>
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
              return queryPickingOrders(params);
            }}
            columns={pickingOrderColumn}
            rowSelection={{
              type: "radio",
              onChange: (selectedRowKeys) => {
                handlePickingOrder(selectedRowKeys ? selectedRowKeys[0] : "");
              }
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
            scroll={{y: 500, x: 2200, scrollToFirstRowOnChange: true}}
            search={false}
            beforeSearchSubmit={(searchInfo) => {
              return {
                params: {...searchInfo}
              }
            }}
            onLoad={()=>{
              handlerEquipmentVisible(true);
              handlerDurationVisible(true);
              handlerQuantityVisible(true);
            }}
            toolBarRender={(action, {selectedRowKeys, selectedRows}) => [<Button type="primary" icon={<EditOutlined />} onClick={()=>{
              handlerEquipmentVisible(!equipmentVisible);
              handlerDurationVisible(!durationVisible);
              handlerQuantityVisible(!quantityVisible);
            }}>编辑</Button>,
              selectedRowKeys && selectedRowKeys.length > 0 &&
              (<Button type="primary"
                       onClick={async () => {
                         try {
                           const params = selectedRows?.map((selectRow) => {
                             if ((!selectRow.equipmentSelected) || (!selectRow.duration) || (!selectRow.quantity)) {
                               throw "请提填写工位时间和数量";
                             }
                             return {
                               ID: selectRow.id,
                               equipmentSelected: selectRow.equipmentSelected,
                               duration: selectRow.duration,
                               quantity: selectRow.quantity
                             };
                           });
                           await schedulePickingItem(params);
                           operationActionRef?.current?.reload();
                         } catch (e) {
                           message.error("请提填写完整工位、生产时间、数量");
                         }
                       }}
              >挑粒排产</Button>),
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
              )
            ]}
            params={{params: {"pickingOrder-ID": pickingOrder}}}
            request={(params) => {
              return queryOperations(params);
            }}
            columns={operationColumn}
            rowSelection={{
              type: "checkbox",
              // onChange: (selectedRowKeys) => {
              //   handlePckingOrder(selectedRowKeys?selectedRowKeys[0]:"");
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
               const params = {
                 pickingOrder: [pickingOrder],
                 workFlow: [workFlow],
                 workFlowStep
               };
               await createOperationItem(params);
               operationActionRef.current?.reload();
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
                  hideInTable: true
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
