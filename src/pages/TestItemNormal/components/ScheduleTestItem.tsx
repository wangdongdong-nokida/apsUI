import { Col, Modal, Row, Select } from 'antd';
import React, {useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { ActionType, ProColumns } from '@ant-design/pro-table/lib/Table';


import { FormInstance } from 'antd/lib/form/Form';
import { EquipmentItem } from '@/pages/equipmentCalendar/data';
import { queryEquipments, queryTestItemBySecondOrder } from '@/pages/TestItemNormal/service';


interface ScheduleTestItemProps {
  modalVisible: boolean;
  onCancel: () => void;
  secondOrderID:any
}

export const ScheduleTestItem: React.FC<ScheduleTestItemProps> = (props) => {
  const { modalVisible, onCancel,secondOrderID } = props;
  const scheduleTestFormRef = useRef<FormInstance>();

  const scheduleTestActionRef = useRef<ActionType>();

  const [equipmentList, handleEquipment] = useState<{}>();

  const proTableProps = {
    pagination: { pageSizeOptions: ['5', '10', '15', '20', '40'], pageSize: 20 },
    scroll: { y: 700, x: 3000, scrollToFirstRowOnChange: true },
    rowKey: 'id',
    search: { span: 8 },
    bordered: true,
    beforeSearchSubmit: (params: any) => {
      return {
        params: params,
        orderBy: 'indexOrder',
      };
    }
  };

  const scheduleTestItemColumns: ProColumns<any>[] = [
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
      title: '设备名称',
      dataIndex: 'equipmentName',
      hideInSearch: true,
    },
    {
      title: '版号',
      dataIndex: ['scheduleTestItem', 'waferNr'],
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
    equipments?.map((op: EquipmentItem) => {
        equipmentSearch[op.id] = op.name;
        return (
          <Select.Option key={op.id} value={op.id}>
            {op.name}
          </Select.Option>);
      },
    );
    handleEquipment(equipmentSearch);
  };


  return (
    <Modal visible={modalVisible} onCancel={onCancel} onOk={onCancel} width={1500} destroyOnClose>
      <Row>
        <Col span={24}>
          <ProTable
            headerTitle="测试排产明细"
            actionRef={scheduleTestActionRef}
            formRef={scheduleTestFormRef}
            {...proTableProps}
            search={false}
            request={(page) => queryTestItemBySecondOrder({...page,params:{"scheduleTestItem-secondOrder-ID":secondOrderID}})}
            columns={scheduleTestItemColumns}
            onLoad={async () => {
              await equipmentHandler();
            }}/>
        </Col>
      </Row>
    </Modal>
  );

};
