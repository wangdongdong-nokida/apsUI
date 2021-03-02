import { Button, Card, Col, Dropdown, Menu, message, notification, Popconfirm, Row, Select } from 'antd';
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
import { ChangeTestStock } from '@/pages/TestScheduling/components/ChangeTestStock';
import { TestScheduleItem } from './data';
import {
  editBrief,
  editDurationTime,
  editEquipment,
  editSupplyTime,
  moveTask,
  queryTestItem,
  testItemDelete,
  exportTestItemData,
} from './service';
import { EditSupplyTime } from '@/pages/TestScheduling/components/EditSupplyTime';
import { ViewSecondOrderInfo } from '@/pages/TestScheduling/components/ViewSecondOrderInfo';
import { editDurationDelayTime } from '@/pages/PickingSchedule/service';
import { EditDurationDelayTimeForm } from '@/pages/PickingSchedule/components/EditDurationDelayTimeForm';
import { ViewBhInfo } from '@/pages/ScribingNormal/components/ViewBhInfo';


const CreateTestItem: React.FC<{}> = () => {

  const scheduleTestFormRef = useRef<FormInstance>();

  const [durationDelayTimeVisible, handleDurationDelayTimeVisible] = useState<boolean>(false);


  const scheduleTestActionRef = useRef<ActionType>();

  const [equipmentList, handleEquipment] = useState<{}>();

  const [equipmentSelectItem, handleEquipmentSelectItem] = useState<{}>();

  const [briefVisible, handleBriefVisible] = useState<boolean>(false);

  const [durationTimeVisible, handleDurationTimeVisible] = useState<boolean>(false);
  const [supplyTimeVisible, handleSupplyTimeVisible] = useState<boolean>(false);

  const [equipmentVisible, handleEquipmentVisible] = useState<boolean>(false);

  const [stockVisible, handleStockVisible] = useState<boolean>(false);

  const [selectRowKeys, handleSelectRowKeys] = useState<Key[]>([]);

  const [selectRowWafer, handleSelectWafer] = useState<string | undefined>('');

  const [moveRowKeys, handleMoveRowKeys] = useState<Key[]>([]);

  const [testItemParamsList,handleTestItemParamsList] = useState<any>();

  const [viewSecondOrderInfoVisible, handleViewSecondOrderInfoVisible] = useState<boolean>(false);

  const [secondOrderClickRow, handleSecondOrderClickRow] = useState<any>();

  const [ViewBhInfoVisible, handleViewBhInfoVisible] = useState<boolean>(false);
  const [bhClickRow, handleBhClickRow] = useState<any>();

  const durationDelayTimeOnOk = async (searchInfo: { [key: string]: ReactText[] }) => {
    await editDurationDelayTime(searchInfo);
    handleDurationDelayTimeVisible(false);
    if (scheduleTestFormRef.current) {
      scheduleTestFormRef.current.submit();
    }
  };

  const proTableProps = {
    pagination: { pageSizeOptions: ['5', '10', '15', '20', '200'], pageSize: 200 },
    scroll: { y: 700, x: 3000, scrollToFirstRowOnChange: true },
    rowKey: 'id',
    search: { span: 8 },
    bordered: true,
    beforeSearchSubmit: (params: any) => {
      return {
        params: params,
        orderBy: 'indexOrder',
      };
    },
  };
  const exportHeaderName = ['版号','片号','型号','电路序号','测试类型','测试参数','数量','已完工序','二级任务号','明细备注','测试备注','流片进度','流片更新时间',
    '入库时间','到货延误','生产时长','排产开始时间','排产结束时间','计划交期'];
  const exportKeyName = ['waferNr','sliceNr','productNr','circuitNr','testType','testParameter','quantity','operationStatus','name','itemBrief','testBrief','jdb','rpsj',
    'dpsj','arrivalDelay','durationTime','startDate','endDate','planSupplyDate'];
  const scheduleTestItemColumns: ProColumns<TestScheduleItem>[] = [
    {
      title: '设备',
      dataIndex: ['scheduleTaskLine', 'equipment', 'ID'],
      hideInTable: true,
      valueEnum: equipmentList,
    },
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '序号',
      dataIndex: 'indexOrder',
      hideInSearch: true,
    },
    {
      title: '版号',
      dataIndex: ['scheduleTestItem', 'waferNr'],
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
    },
    {
      title: '片号',
      dataIndex: ['scheduleTestItem', 'sliceNr'],
    },
    {
      title: '型号',
      dataIndex: ['scheduleTestItem', 'productNr'],
    },
    {
      title: '电路序号',
      dataIndex: ['scheduleTestItem', 'circuitNr'],
    },
    {
      title: '测试类型',
      dataIndex: ['scheduleTestItem', 'testType'],
      valueEnum: {
        '预测': '预测',
        '筛选': '筛选',
        '考核': '考核',
      },
    },
    {
      title: '测试参数',
      dataIndex: ['scheduleTestItem', 'testParameter'],
    },
    {
      title: '数量',
      dataIndex: ['scheduleTestItem', 'quantity'],
      hideInSearch: true,
    },
    {
      title: '已完工序',
      dataIndex: ['scheduleTestItem', 'operationStatus'],
      hideInSearch: true,
    },
    {
      title: '二级任务号',
      dataIndex: ['scheduleTestItem', 'secondOrder', 'name'],
      hideInSearch: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              console.info("entity",entity)
              handleSecondOrderClickRow(entity);
              handleViewSecondOrderInfoVisible(!viewSecondOrderInfoVisible)
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '明细备注',
      dataIndex: ['scheduleTestItem', 'itemBrief'],
      hideInSearch: true,
    },
    {
      title: '测试备注',
      dataIndex: ['scheduleTestItem', 'secondOrder', 'testBrief'],
      hideInSearch: true,
    },
    {
      title: '流片进度',
      dataIndex: ['scheduleTestItem', 'testScribingCenter', 'waferWarehouse', 'lLpjd', 'jdb'],
      hideInSearch: true,
    },
    {
      title: '流片更新时间',
      dataIndex: ['scheduleTestItem', 'testScribingCenter', 'waferWarehouse', 'lLpjd', 'rpsj'],
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '入库时间',
      dataIndex: ['scheduleTestItem', 'testScribingCenter', 'waferWarehouse', 'dpsj'],
      hideInSearch: true,
    },
    {
      title: '到货延误',
      dataIndex: ['scheduleTestItem', 'arrivalDelay'],
      hideInSearch: true,
    },
    {
      title: '生产时长',
      dataIndex: 'durationTime',
      hideInSearch: true,
    },
    {
      title: '延误时长',
      dataIndex: ['durationDelayTime'],
      hideInSearch: true,
    },
    {
      title: '排产开始时间',
      dataIndex: 'startDate',
      // valueType: "dateTime",
      hideInSearch: true,
    },
    {
      title: '排产结束时间',
      dataIndex: 'endDate',
      // valueType: "dateTime",
      hideInSearch: true,
    },
    {
      title: '计划交期',
      dataIndex: 'planSupplyDate',
      // valueType: "dateTime",
      hideInSearch: true,
    },
    // {
    //   title: '计划延误',
    //   dataIndex: "delayPlan",
    // },
    // {
    //   title: '实际延误',
    //   dataIndex: "delayActually",
    // },
  ];

  const equipmentHandler = async () => {
    const equipments = await queryEquipments({ type: '测试' });
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


  const editSupplyTimeOnOk = async (searchInfo: { [key: string]: ReactText[] }) => {
    await editSupplyTime(searchInfo);
    handleSupplyTimeVisible(false);
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
          <ProTable
            headerTitle="测试排产"
            actionRef={scheduleTestActionRef}
            formRef={scheduleTestFormRef}
            {...proTableProps}
            request={(params) => {
              const data =  queryTestItem(params)
              handleTestItemParamsList(params);
              return data;
            }}
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
            columns={scheduleTestItemColumns}
            onLoad={async () => {
              await equipmentHandler();
            }}
            rowSelection={{
              type: 'checkbox',
              onChange: (selectedRowKeys: Key[], selectedRows: TestScheduleItem[]) => {
                handleSelectRowKeys(selectedRowKeys);
                handleSelectWafer(selectedRows.length > 0 ? selectedRows[0]?.scheduleTestItem?.waferNr : '');
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
              await handleSupplyTimeVisible(true);
            }}>修改计划交片日期</Button>
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
              handleStockVisible(true);
            }}>修改库存关联</Button>
          </Col>
          <Col>
            <Button onClick={() => {
              exportTestItemData(exportHeaderName,exportKeyName,testItemParamsList);
            }}>导出</Button>
          </Col>
        </Row>
      </Card>

      <EditBriefForm
        modalVisible={briefVisible}
        onCancel={() => {
          handleBriefVisible(false);
        }}
        onUpdate={editBriefOnOk}
        params={{ ids: selectRowKeys }}
      />


      <EditSupplyTime
        modalVisible={supplyTimeVisible}
        onCancel={() => {
          handleSupplyTimeVisible(false);
        }}
        onUpdate={editSupplyTimeOnOk}
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

      <ChangeTestStock
        modalVisible={stockVisible}
        onCancel={() => {
          handleStockVisible(false);
        }}
        beforeSearchSubmit={(params: any) => {
          return {
            params: params,
            orderBy: 'indexOrder',
          }
        }}
        onOk={() => {
          scheduleTestFormRef?.current?.submit();
          handleStockVisible(false);
        }}
        equipment={equipmentSelectItem}
        params={{
          taskIDs: selectRowKeys ? selectRowKeys[0] : '',
          waferNr: selectRowWafer,
        }}/>
      <ViewSecondOrderInfo modalVisible={viewSecondOrderInfoVisible} onCancel={()=>{handleViewSecondOrderInfoVisible(false)}} secondOrderRow={secondOrderClickRow}/>

      <ViewBhInfo modalVisible={ViewBhInfoVisible} onCancel={()=>{handleViewBhInfoVisible(false)}} bhRow={bhClickRow}/>
    </PageHeaderWrapper>


  );

};

export default CreateTestItem;
