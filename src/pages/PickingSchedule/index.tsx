import { Button, Card, Col, Dropdown, Menu, message, Modal, notification, Popconfirm, Row, Select } from 'antd';
import React, { ReactText, useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ActionType, ProColumns } from '@ant-design/pro-table/lib/Table';


import { FormInstance } from 'antd/lib/form/Form';
import { EquipmentItem } from '@/pages/equipmentCalendar/data';
import { queryEquipments } from '@/pages/TestItemNormal/service';

import { EditBriefForm } from '@/pages/TestScheduling/components/EditBriefForm';
import { Key } from 'antd/es/table/interface';
import { EditDurationTimeForm } from '@/pages/TestScheduling/components/EditDurationTimeForm';
import { EditEquipment } from '@/pages/TestScheduling/components/EditEquipment';
import { DownOutlined, PlusOutlined } from '@ant-design/icons/lib';
import { TestScheduleItem } from './data';
import {
  bindingWaferGearWarehouse,
  editBrief, editDurationDelayTime,
  editDurationTime,
  editEquipment,
  findAllWaferWarehouse, findWaferGearWarehouse,
  moveTask,
  queryTestItem,
  testItemDelete,
} from './service';
import { EditDurationDelayTimeForm } from '@/pages/PickingSchedule/components/EditDurationDelayTimeForm';


const PickingSchedule: React.FC<{}> = () => {

  const scheduleTestFormRef = useRef<FormInstance>();

  const scheduleTestActionRef = useRef<ActionType>();

  const [equipmentList, handleEquipment] = useState<{}>();

  const [equipmentSelectItem, handleEquipmentSelectItem] = useState<{}>();

  const [briefVisible, handleBriefVisible] = useState<boolean>(false);

  const [durationTimeVisible, handleDurationTimeVisible] = useState<boolean>(false);
  const [durationDelayTimeVisible, handleDurationDelayTimeVisible] = useState<boolean>(false);

  const [equipmentVisible, handleEquipmentVisible] = useState<boolean>(false);
  const [stockVisible, handleStockVisible] = useState<boolean>(false);

  const [selectRowKeys, handleSelectRowKeys] = useState<Key[]>([]);
  const [selectWaferNr, handleSelectWaferNr] = useState<Key[]>([]);

  const [moveRowKeys, handleMoveRowKeys] = useState<Key[]>([]);
  const [waferKey, handleWaferKey] = useState<Key>();
  const [waferGearWarehouseKey, handleWaferGearWarehouseKey] = useState<Key[]>();

  const proTableProps = {
    pagination: { pageSizeOptions: ['5', '10', '15', '20', '200'], pageSize: 200 },
    scroll: { y: 700, x: 1800, scrollToFirstRowOnChange: true },
    rowKey: 'id',
    search: { span: 8 },
    bordered: true,
    beforeSearchSubmit: (searchInfo: any) => {
      return {
        params: searchInfo,
        orderBy: 'indexOrder',
      };
    },
  };

  const operationColumn: ProColumns<{}>[] = [
    {
      title: '设备',
      dataIndex: ['scheduleTaskLine', 'equipment', 'ID'],
      hideInTable: true,
      valueEnum: equipmentList,
    },
    {
      title: '序号',
      dataIndex: 'indexOrder',
      hideInSearch: true,
    },
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
      title: '工艺路径',
      dataIndex: ['workFlowName'],
      hideInSearch: true,
    },
    {
      title: '工序',
      dataIndex: ['workStepName'],
    },
    {
      title: '工位',
      dataIndex: ['equipmentName'],
      hideInSearch: true,
    },
    {
      title: '客户',
      dataIndex: ['bindCustomer'],
    },
    {
      title: '合同',
      dataIndex: ['bindContract'],
    },
    {
      title: '生产时长',
      dataIndex: ['durationTime'],
      hideInSearch: true,
    },
    {
      title: '延误时长',
      dataIndex: ['durationDelayTime'],
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
    {
      title: '销售订单',
      dataIndex: ['bindSalesOrder'],
      width: 300,
    },
    {
      title: '订单数量',
      dataIndex: ['salesOrderQuantities'],
      hideInSearch: true,
    },
    {
      title: '明细备注',
      dataIndex: ['itemBrief'],
      hideInSearch: true,
    },
  ];

  const equipmentHandler = async () => {
    const equipments = await queryEquipments({ type: '挑粒镜检' });
    const equipmentSearch = {};
    // eslint-disable-next-line no-unused-expressions
    handleEquipmentSelectItem(equipments?.map((op: EquipmentItem) => {
        equipmentSearch[op.id] = op.name;
        return (
          <Select.Option key={op.id} value={op.id}>
            {op.name}
          </Select.Option>);
      },
    ));
    handleEquipment(equipmentSearch);
  };

  const buttonAbleSingle = () => {
    return selectRowKeys.length !== 1;
  };

  const buttonAbleMultiple = () => {
    return selectRowKeys.length < 1;
  };

  const editBriefOnOk = async (searchInfo: { [key: string]: string }) => {
    await editBrief(searchInfo);
    handleBriefVisible(false);
    if (scheduleTestFormRef.current) {
      scheduleTestFormRef.current.submit();
    }
  };

  const durationTimeOnOk = async (searchInfo: { [key: string]: ReactText[] }) => {
    await editDurationTime(searchInfo);
    handleDurationTimeVisible(false);
    if (scheduleTestFormRef.current) {
      scheduleTestFormRef.current.submit();
    }
  };

  const durationDelayTimeOnOk = async (searchInfo: { [key: string]: ReactText[] }) => {
    await editDurationDelayTime(searchInfo);
    handleDurationDelayTimeVisible(false);
    if (scheduleTestFormRef.current) {
      scheduleTestFormRef.current.submit();
    }
  };

  const equipmentOnOk = async (searchInfo: { [key: string]: string }) => {
    await editEquipment(searchInfo);
    handleEquipmentVisible(false);
    if (scheduleTestFormRef.current) {
      scheduleTestFormRef.current.submit();
    }
  };

  const handleRemove = async (equipmentId: [any], searchInfo?: ReactText[]) => {
    await testItemDelete(equipmentId, searchInfo);
    if (scheduleTestFormRef.current) {
      scheduleTestFormRef.current.submit();
    }
  };

  return (
    <PageHeaderWrapper>
      <Row>
        <Col span={24}>
          <ProTable<TestScheduleItem>
            headerTitle="挑粒排产"
            actionRef={scheduleTestActionRef}
            formRef={scheduleTestFormRef}
            {...proTableProps}
            request={(params) => queryTestItem(params)}
            toolBarRender={
              (action, { selectedRows, selectedRowKeys }) => [
                selectedRows && selectedRows.length > 0 && (
                  <Dropdown
                    overlay={
                      <Menu
                        onClick={async (e) => {
                          if (e.key === 'remove') {
                            await handleRemove([scheduleTestFormRef?.current?.getFieldValue('scheduleTaskLine-equipment-ID')], selectedRowKeys);
                            // action.reload();
                          }
                        }}
                        selectedKeys={[]}
                      >
                        <Menu.Item key="remove">批量删除</Menu.Item>
                      </Menu>
                    }
                  >
                    <Button>
                      批量操作 <DownOutlined/>
                    </Button>
                  </Dropdown>
                ),
              ]
            }
            columns={operationColumn}
            onLoad={async () => {
              await equipmentHandler();
            }}
            rowSelection={{
              type: 'checkbox',
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onChange: (selectedRowKeys: Key[], selectedRows: any) => {
                handleSelectRowKeys(selectedRowKeys);
                handleSelectWaferNr(selectedRows ? selectedRows[0]?.waferNr : null);
              },
            }}/>
        </Col>
      </Row>

      <Card>
        <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col>
            <Button disabled={buttonAbleMultiple()} onClick={() => {
              handleBriefVisible(true);
            }}>修改明细备注</Button>
          </Col>
          <Col>
            <Button disabled={buttonAbleMultiple()} onClick={async () => {
              await handleDurationTimeVisible(true);
            }}>修改测试时长</Button>
          </Col>
          <Col>
            <Button disabled={buttonAbleMultiple()} onClick={async () => {
              await handleDurationDelayTimeVisible(true);
            }}>修改延误时长</Button>
          </Col>
          <Col>
            <Button disabled={buttonAbleMultiple()} onClick={async () => {
              handleEquipmentVisible(true);
            }}>更换设备</Button>
          </Col>
          <Col>
            <Popconfirm
              title={moveRowKeys.length > 0 ? '点击确认后开始调整任务位置。' : '点击确认后，请选择需要插入的位置。'}
              icon={<PlusOutlined/>}
              cancelText="重选任务"
              onCancel={() => {
                handleMoveRowKeys([]);
              }}
              onConfirm={
                async () => {
                  if (moveRowKeys.length === 0) {
                    notification.open({
                      style: { backgroundColor: 'yellow' },
                      message: 'Notification',
                      description: '下一步请选中需要调整到的位置（单选）。',
                    });
                    handleMoveRowKeys(selectRowKeys);
                    // eslint-disable-next-line no-unused-expressions
                    scheduleTestActionRef?.current?.clearSelected();
                  } else {
                    const hide = message.loading('正在调整排产明细。');
                    try {
                      await moveTask({
                        moveKeys: moveRowKeys,
                        toPlace: [selectRowKeys[0]],
                        equipmentId: scheduleTestFormRef?.current?.getFieldValue('scheduleTaskLine-equipment-ID'),
                      });
                      hide();
                      message.success('位置调整成功。');
                    } catch (e) {
                      hide();
                      message.error('调整失败');
                    }
                    handleMoveRowKeys([]);
                    // eslint-disable-next-line no-unused-expressions
                    scheduleTestActionRef?.current?.reload();
                  }
                }
              }>
              <Button disabled={buttonAbleMultiple()}>插入计划</Button>
            </Popconfirm>
          </Col>
          <Col>
            <Button disabled={buttonAbleSingle()} onClick={() => {
              handleStockVisible(!stockVisible);
            }}>添加库存关联</Button>
          </Col>
          <Col>
            <Button
              // onClick={
              //   async () => {
              //     await request('http://172.16.0.12/CamstarPortal/startContainer.do', {
              //       method: "POST",
              //       mode: "no-cors",
              //       data: {
              //         data: {list: [{id: 1, type: 1}]}
              //       }
              //     });
              //   }
              // }
            >导出</Button>
          </Col>
        </Row>
      </Card>


      <Modal visible={stockVisible} width={1500} destroyOnClose
             onCancel={() => {
               handleStockVisible(false);
             }}
             onOk={async () => {
               // const params = {pickingOrder, workFlow};
               // await createOperationItem(params);
               // operationActionRef.current?.reload();

               const hide = message.loading('正在绑定库存信息。');
               try {
                 await bindingWaferGearWarehouse(selectRowKeys[0], waferGearWarehouseKey);
                 hide();
               } catch (e) {
                 hide();
                 message.error(e.data.message);
               } finally {
                 scheduleTestActionRef?.current?.reload();
               }
               handleStockVisible(false);
             }
             }
      >
        <Row gutter={[10, 8]}>
          <Col span={12}>
            <ProTable
              search={false}
              options={false}
              rowKey="id"
              pagination={{ pageSizeOptions: ['5', '10', '15', '20', '40'], pageSize: 10 }}
              rowSelection={
                {
                  type: 'radio',
                  onChange: (selectedRowKeys) => {
                    handleWaferKey(selectedRowKeys ? selectedRowKeys[0] : '');
                  },
                }
              }
              request={async (params) => {
                return findAllWaferWarehouse(params, selectWaferNr);
              }}

              columns={[
                {
                  title: '版号',
                  dataIndex: ['waferNr'],
                },
                {
                  title: '片号',
                  dataIndex: ['sliceNr'],
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
                return findWaferGearWarehouse(params);
              }}
              params={{ params: { 'waferModelWarehouse-waferWarehouse-ID': waferKey } }}
              rowSelection={
                {
                  type: 'checkbox',
                  onChange: (selectRowKeys) => {
                    handleWaferGearWarehouseKey(selectRowKeys);
                  },
                }
              }
              columns={[
                {
                  title: 'id',
                  dataIndex: ['pickingOrder', 'id'],
                  hideInSearch: true,
                  hideInTable: true,
                },
                {
                  title: '版号',
                  dataIndex: ['waferModelWarehouse', 'waferWarehouse', 'waferNr'],
                },
                {
                  title: '片号',
                  dataIndex: ['waferModelWarehouse', 'waferWarehouse', 'sliceNr'],
                },
                {
                  title: '型号',
                  dataIndex: ['waferModelWarehouse', 'modelNr'],
                },
                {
                  title: '电路序号',
                  dataIndex: ['waferModelWarehouse', 'circuitNr'],
                },
                {
                  title: '物料状态',
                  dataIndex: ['wlzt'],
                },
              ]}
            />
          </Col>
        </Row>
      </Modal>


      <EditBriefForm
        modalVisible={briefVisible}
        onCancel={() => {
          handleBriefVisible(false);
        }}
        onUpdate={editBriefOnOk}
        params={{ ids: selectRowKeys }}
      />

      <EditDurationTimeForm
        modalVisible={durationTimeVisible}
        onCancel={() => {
          handleDurationTimeVisible(false);
        }}
        onUpdate={durationTimeOnOk}
        params={{ ids: selectRowKeys }}
      />

      <EditDurationDelayTimeForm
        modalVisible={durationDelayTimeVisible}
        onCancel={() => {
          handleDurationDelayTimeVisible(false);
        }}
        onUpdate={durationDelayTimeOnOk}
        params={{ ids: selectRowKeys }}
      />
      <EditEquipment
        modalVisible={equipmentVisible}
        onUpdate={equipmentOnOk}
        onCancel={() => {
          handleEquipmentVisible(false);
        }}
        equipment={equipmentSelectItem}
        params={{
          ids: selectRowKeys,
          belongEquipmentID: scheduleTestFormRef?.current?.getFieldValue('scheduleTaskLine-equipment-ID'),
        }}/>
    </PageHeaderWrapper>
  );

};

export default PickingSchedule;
