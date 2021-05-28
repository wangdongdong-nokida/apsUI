import {DownOutlined, PlusOutlined, CheckOutlined, EditOutlined, CloseOutlined} from '@ant-design/icons';
import {Button, Dropdown, Menu, message} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";
import {SelectionSelectFn} from "antd/es/table/interface";
import EditForm from './components/EditForm';
import {CalendarTableItem, EquipmentItem, TableListParams} from './data';
import {getCalendars, updateCalendar, addCalendar, removeRule, getEquipment, updateServiceCalendar} from './service';


/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListParams) => {
  const hide = message.loading('正在添加');
  try {
    await addCalendar({
      equipmentId: fields.equipmentId,
      data: {
        startTime: fields.startTime,
        endTime: fields.endTime,
        repeatType: fields.repeatType,
        // monday: fields.monday,
        // tuesday: fields.tuesday,
        // wednesday: fields.wednesday,
        // thursday: fields.thursday,
        // friday: fields.friday,
        // saturday: fields.saturday,
        // sunday: fields.sunday,
        blackName: fields.blackName,
      }
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: TableListParams) => {
  const hide = message.loading('正在添加');
  try {
    await updateCalendar({
      id: fields.id,
      startTime: fields.startTime,
      endTime: fields.endTime,
      repeatType: fields.repeatType,
      // monday: fields.monday,
      // tuesday: fields.tuesday,
      // wednesday: fields.wednesday,
      // thursday: fields.thursday,
      // friday: fields.friday,
      // saturday: fields.saturday,
      // sunday: fields.sunday,
      blackName: fields.blackName,
    });
    hide();
    message.success('跟新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};


/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: CalendarTableItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {

    await removeRule({
      // @ts-ignore
      ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [modelCreateType, handleModelCreateType] = useState<boolean>(false);

  const [selectEquipment, handlerEquipment] = useState<EquipmentItem>();

  const [selectCalendar, handlerCalendar] = useState<CalendarTableItem>();

  const equipmentAction = useRef<ActionType>();
  const calendarAction = useRef<ActionType>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function boolRender(_: any, record: any) {
    return _ ? <CheckOutlined/> : <CloseOutlined/>;
  }

  const calendarColumns: ProColumns<CalendarTableItem>[] = [
    // {
    //   title: '设备名称',
    //   dataIndex: 'equipmentName',
    //   hideInSearch: true,
    //   valueType: "text"
    // },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      valueType: "dateTime",
      hideInSearch: true
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: "dateTime",
      hideInSearch: true
    },
    {
      title: '重复周期',
      dataIndex: 'repeatType',
      valueType: "text",
      hideInSearch: true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_: any, record: any) => {
        let text;
        switch (_) {
          case 1:
            text = "星期日";
            break;
          case 2:
            text = "星期一";
            break;
          case 3:
            text = "星期二";
            break;
          case 4:
            text = "星期三";
            break;
          case 5:
            text = "星期四";
            break;
          case 6:
            text = "星期五";
            break;
          case 7:
            text = "星期六";
            break;
          case 8:
            text = "星期日";
            break;
          default:
            text = "不重复";
            break;
        }
        return text;
      }
    },
    {
      title: '黑名单',
      dataIndex: 'blackName',
      hideInSearch: true,
      render: boolRender
    }
  ];

  const equipmentColumns: ProColumns<EquipmentItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: "text",
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      valueType: "text",
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: "text",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onEquipmentSelected: SelectionSelectFn<EquipmentItem> = (record, selected: boolean, selectedRows: Object[], nativeEvent: Event) => {
    if (selected) {
      handlerEquipment(record);
    } else {
      handlerEquipment(undefined);
    }
    if (calendarAction.current) {
      calendarAction.current.reload();
    }
  };


  return (
    <PageHeaderWrapper>
      <div>
        <ProTable<EquipmentItem>
          headerTitle="设备"
          actionRef={equipmentAction}
          rowKey="id"
          pagination={{pageSizeOptions: ['5', '10', '20', '30'], defaultPageSize: 5}}
          /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
          tableAlertRender={({selectedRowKeys, selectedRows}) => (
            <div>
              已选择 <a style={{fontWeight: 600}}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            </div>
          )}
          // @ts-ignore
          beforeSearchSubmit={ (searchInfo) => {
            return {
              params: searchInfo
            }
          }}

          request={(params) => getEquipment(params)}
          columns={equipmentColumns}
          rowSelection={{
            type: 'radio',
            onSelect: onEquipmentSelected
          }}
        />
      </div>

      <div style={{marginTop: 20}}>
        <ProTable<CalendarTableItem>
          headerTitle="日历"
          search={false}
          actionRef={calendarAction}
          rowKey="id"
          pagination={{pageSizeOptions: ['5', '10', '20', '30'], defaultPageSize: 5}}
          toolBarRender={(action, {selectedRows}) => [
            <Button onClick={async ()=>{
              const hide=message.loading("正在更新日历，请稍后");
              try {
                hide();
                await updateServiceCalendar();
                message.success("日历更新成功");
              }catch (e) {
                hide();
                message.info(e,50);
                message.error("日历更新失败，请重试！");
              }
            }}>更新日历</Button>,
            selectEquipment &&
            <Button icon={<PlusOutlined/>} type="primary" onClick={() => {
              handleModalVisible(true);
              handleModelCreateType(true);
            }}>
              新建
            </Button>,
            selectedRows && selectedRows.length === 1 &&
            <Button icon={<EditOutlined/>} type="primary" onClick={() => {
              handleModalVisible(true);
              handleModelCreateType(false);
            }}>
              修改
            </Button>,
            selectedRows && selectedRows.length > 0 && (
              <Dropdown
                overlay={
                  <Menu
                    onClick={async (e) => {
                      if (e.key === 'remove') {
                        await handleRemove(selectedRows);
                        action.reload();
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
          ]}
          /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
          tableAlertRender={({selectedRowKeys, selectedRows}) => (
            <div>
              已选择 <a style={{fontWeight: 600}}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            </div>
          )}
          request={(params) => getCalendars(params, selectEquipment)}
          columns={calendarColumns}
          rowSelection={{
            onSelect: (record, selected: boolean,) => {
              if (selected) {
                handlerCalendar(record);
              } else {
                handlerCalendar(undefined);
              }
            }
          }}
        />
      </div>

      <EditForm
        onCreate={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (calendarAction.current) {
              calendarAction.current.reload();
            }
          }
        }}
        onUpdate={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleModalVisible(false);
            if (calendarAction.current) {
              calendarAction.current.reload();
            }
          }
        }}
        create={modelCreateType}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        params={{equipmentId: selectEquipment?.id, parameter: selectCalendar}}
      />

      {/*
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            if (calendarAction.current) {
              calendarAction.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
        }}
        updateModalVisible={updateModalVisible}
        parameter={selectCalendar}
      />
*/}

    </PageHeaderWrapper>
  );
};

export default TableList;
