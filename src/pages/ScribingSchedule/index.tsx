import {Button, Card, Col, Dropdown, Menu, message, notification, Popconfirm, Row, Select} from 'antd';
import React, {ReactText, useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";


import {FormInstance} from "antd/lib/form/Form";
import {EquipmentItem} from "@/pages/equipmentCalendar/data";
import {queryEquipments} from "@/pages/TestItemNormal/service";

import {EditBriefForm} from "@/pages/TestScheduling/components/EditBriefForm";
import {Key} from "antd/es/table/interface";
import {EditDurationTimeForm} from "@/pages/TestScheduling/components/EditDurationTimeForm";
import {EditEquipment} from "@/pages/TestScheduling/components/EditEquipment";
import {DownOutlined, PlusOutlined} from "@ant-design/icons/lib";
import {ChangeTestStock} from "@/pages/ScribingSchedule/components/ChangeTestStock";
import { EditDurationDelayTimeForm } from '@/pages/PickingSchedule/components/EditDurationDelayTimeForm';
import { editDurationDelayTime } from '@/pages/PickingSchedule/service';
import {TestScheduleItem} from './data';
import {editBrief, editDurationTime, editEquipment, moveTask, queryTestItem, testItemDelete,exportTestItemData} from './service';
import { ViewBhInfo } from '@/pages/ScribingNormal/components/ViewBhInfo';


const CreateTestItem: React.FC<{}> = () => {


  const [durationDelayTimeVisible, handleDurationDelayTimeVisible] = useState<boolean>(false);

  const scheduleTestFormRef = useRef<FormInstance>();

  const scheduleTestActionRef = useRef<ActionType>();

  const [equipmentList, handleEquipment] = useState<{}>();

  const [equipmentSelectItem, handleEquipmentSelectItem] = useState<{}>();

  const [briefVisible, handleBriefVisible] = useState<boolean>(false);

  const [durationTimeVisible, handleDurationTimeVisible] = useState<boolean>(false);

  const [equipmentVisible, handleEquipmentVisible] = useState<boolean>(false);

  const [selectRowKeys, handleSelectRowKeys] = useState<Key[]>([]);

  const [moveRowKeys, handleMoveRowKeys] = useState<Key[]>([]);

  const [stockVisible, handleStockVisible] = useState<boolean>(false);

  const [scribingParamsList,handleScribingParamsList] = useState<any>();

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
    pagination: {pageSizeOptions: ["5", "10", "15", "20", "200"], pageSize: 200},
    scroll: {y: 700, scrollToFirstRowOnChange: true},
    rowKey: "id",
    search: {span: 8},
    bordered: true,
    beforeSearchSubmit: (searchInfo: any) => {
      return {
        params: searchInfo,
        orderBy: "indexOrder"
      }
    }
  };


  const exportHeaderName = ['版号','片号','划片方式','已完工序','负责人','明细备注','生产时长','延误时长','开始时间','结束时间'];
  const exportKeyName = ['waferNr','sliceNr','ScribingType','operationStatus','responsiblePerson','brief','durationTime','durationDelayTime','startDate','endDate'];
  const scheduleTestItemColumns: ProColumns<TestScheduleItem>[] = [
    {
      title: '设备',
      dataIndex: ['scheduleTaskLine', "equipment", 'ID'],
      hideInTable: true,
      valueEnum: equipmentList
    },
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '序号',
      dataIndex: 'indexOrder',
      hideInSearch: true
    },
    {
      title: '版号',
      dataIndex: ["scheduleScribingItem", 'waferNr'],
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
      dataIndex: ["scheduleScribingItem", 'sliceNr'],
    },
    {
      title: '划片方式',
      dataIndex: ["scheduleScribingItem", 'ScribingType'],
    },
    {
      title: '已完工序',
      dataIndex: ["scheduleScribingItem", 'operationStatus'],
    },
    {
      title: '负责人',
      dataIndex: ["scheduleScribingItem", 'responsiblePerson'],
    },
    {
      title: '明细备注',
      dataIndex: ["scheduleScribingItem", 'brief'],
    },
    {
      title: '生产时长',
      dataIndex: "durationTime",
      hideInSearch: true
    },
    {
      title: '延误时长',
      dataIndex: ['durationDelayTime'],
      hideInSearch: true,
    },
    {
      title: '开始时间',
      dataIndex: "startDate",
      valueType: "dateTime",
      hideInSearch: true
    },
    {
      title: '结束时间',
      dataIndex: "endDate",
      valueType: "dateTime",
      hideInSearch: true
    },
    {
      title: '要求检验完成时间',
      dataIndex: ['salesOrderTestDate'],
      hideInSearch: true,
    }
  ];

  const equipmentHandler = async () => {
    const equipments = await queryEquipments({type:"划片"});
    const equipmentSearch = {};
    // eslint-disable-next-line no-unused-expressions
    handleEquipmentSelectItem(equipments?.map((op: EquipmentItem) => {
        equipmentSearch[op.id] = op.name;
        return (
          <Select.Option key={op.id} value={op.id}>
            {op.name}
          </Select.Option>);
      }
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
            headerTitle="划片排产"
            actionRef={scheduleTestActionRef}
            formRef={scheduleTestFormRef}
            {...proTableProps}
            request={(params) => {
              const data = queryTestItem(params)
              handleScribingParamsList(params);
              return data;
            }}
            toolBarRender={
              (action, {selectedRows, selectedRowKeys}) => [
                selectedRows && selectedRows.length > 0 && (
                  <Dropdown
                    overlay={
                      <Menu
                        onClick={async (e) => {
                          if (e.key === 'remove') {
                            await handleRemove([scheduleTestFormRef?.current?.getFieldValue("scheduleTaskLine-equipment-ID")], selectedRowKeys);
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
            onLoad={() => {
              equipmentHandler();
            }}
            rowSelection={{
              type: 'checkbox',
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onChange: (selectedRowKeys: Key[], selectedRows: TestScheduleItem[]) => {
                handleSelectRowKeys(selectedRowKeys);
              }
            }}/>
        </Col>
      </Row>

      <Card>
        <Row gutter={{xs: 8, sm: 16, md: 24}}>
          <Col>
            <Button disabled={buttonAbleMultiple()} onClick={() => {
              handleBriefVisible(true)
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
              title={moveRowKeys.length > 0 ? "点击确认后开始调整任务位置。" : "点击确认后，请选择需要插入的位置。"}
              icon={<PlusOutlined/>}
              cancelText="重选任务"
              onCancel={() => {
                handleMoveRowKeys([]);
              }}
              onConfirm={
                async () => {
                  if (moveRowKeys.length === 0) {
                    notification.open({
                      style: {backgroundColor: "yellow"},
                      message: 'Notification',
                      description: '下一步请选中需要调整到的位置（单选）。',
                    });
                    handleMoveRowKeys(selectRowKeys);
                    // eslint-disable-next-line no-unused-expressions
                    scheduleTestActionRef?.current?.clearSelected();
                  } else {
                    const hide = message.loading("正在调整排产明细。");
                    try {
                      await moveTask({
                        moveKeys: moveRowKeys,
                        toPlace: [selectRowKeys[0]],
                        equipmentId: scheduleTestFormRef?.current?.getFieldValue("scheduleTaskLine-equipment-ID")
                      });
                      hide();
                      message.success("位置调整成功。");
                    } catch (e) {
                      hide();
                      message.error("调整失败");
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
            <Button disabled={buttonAbleSingle()} onClick={()=>{
              handleStockVisible(true);
            }}>修改库存关联</Button>
          </Col>
          <Col>
            <Button onClick={() => {
              exportTestItemData(exportHeaderName,exportKeyName,scribingParamsList);
            }}>导出</Button>
          </Col>
        </Row>
      </Card>


      <EditBriefForm
        modalVisible={briefVisible}
        onCancel={() => {
          handleBriefVisible(false)
        }}
        onUpdate={editBriefOnOk}
        params={{ids: selectRowKeys,}}
      />

      <EditDurationTimeForm
        modalVisible={durationTimeVisible}
        onCancel={() => {
          handleDurationTimeVisible(false)
        }}
        onUpdate={durationTimeOnOk}
        params={{ids: selectRowKeys}}
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
          handleEquipmentVisible(false)
        }}
        equipment={equipmentSelectItem}
        params={{
          ids: selectRowKeys,
          belongEquipmentID: scheduleTestFormRef?.current?.getFieldValue("scheduleTaskLine-equipment-ID")
        }}/>

      <ChangeTestStock
        modalVisible={stockVisible}
        onCancel={() => {
          handleStockVisible(false)
        }}
        onOk={() => {
          scheduleTestFormRef?.current?.submit();
          handleStockVisible(false);
        }}
        equipment={equipmentSelectItem}
        params={{
          taskIDs: selectRowKeys ? selectRowKeys[0] : "",
        }}/>

      <ViewBhInfo modalVisible={ViewBhInfoVisible} onCancel={()=>{handleViewBhInfoVisible(false)}} bhRow={bhClickRow}/>
    </PageHeaderWrapper>
  )

};

export default CreateTestItem;
