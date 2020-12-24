import { Col, Modal, Row } from 'antd';
import React from 'react';
import ProTable from '@ant-design/pro-table';
import { ProColumns } from '@ant-design/pro-table/lib/Table';
import { querySecondOrderInfoByName } from '@/pages/TestScheduling/service';

interface ViewSecondOrderProps {
  modalVisible: boolean;
  onCancel: () => void;
  secondOrderRow:any
}

export const ViewSecondOrderInfo: React.FC<ViewSecondOrderProps> = (props) => {
  const { modalVisible, onCancel,secondOrderRow } = props;

  const proTableProps = {
    pagination: { pageSizeOptions: ['5', '10', '15', '20', '40'], pageSize: 20 },
    scroll: { y: 700, x: 3000, scrollToFirstRowOnChange: true },
    rowKey: 'id',
    search: { span: 8 },
    bordered: true,
  };

  const secondOrderInfoColumns: ProColumns<any>[] = [
    {
      title: 'id',
      dataIndex: 'ID',
      hideInTable: true,
    },
    {
      title: '二级任务号',
      dataIndex: 'EJRWH',
    },
    {
      title: '型号',
      dataIndex: 'XH',
    },
    {
      title: '版号',
      dataIndex: 'BH',
    },
    {
      title: '级别',
      dataIndex: 'JB',
    },
    {
      title: '任务状态',
      dataIndex: 'RWZT',
    },
    {
      title: '测试班组',
      dataIndex: 'CSBZ',
    },
    {
      title: '测试备注',
      dataIndex: 'CSBZ',
    },
    {
      title: '划片班组',
      dataIndex: 'HPBZ',
    },
    {
      title: '要求划片完成日期',
      dataIndex: 'YQHPWCRQ',
    },
    {
      title: '划片计划完成日期',
      dataIndex: 'HPJHWCRQ',
    },
    {
      title: '订单数量',
      dataIndex: 'DDSL',
    },
    {
      title: '申请人',
      dataIndex: 'SQR',
    },
    {
      title: '申请时间',
      dataIndex: 'SQSJ',
    },
    {
      title: '申请备注',
      dataIndex: 'SQBZ',
    },
    {
      title: '是否投考',
      dataIndex: 'SFTK',
    },
    {
      title: '投考日期',
      dataIndex: 'TKRQ',
    },
    {
      title: '开流程卡日期',
      dataIndex: 'KLCKRQ',
    },
    {
      title: '任务类型',
      dataIndex: 'RWLX',
    },
    {
      title: '产品类型',
      dataIndex: 'CPLX',
    },
    {
      title: '备注',
      dataIndex: 'BZ',
    },
    {
      title: '任务来源',
      dataIndex: 'RWLY',
    },
  ];

  return (
    <Modal visible={modalVisible} onCancel={onCancel} onOk={onCancel} width={1500} destroyOnClose>
      <Row>
        <Col span={24}>
          <ProTable
            headerTitle="二级任务明细"
            toolBarRender={false}
            {...proTableProps}
            search={false}
            rowKey="ID"
            request={() => querySecondOrderInfoByName(secondOrderRow.scheduleTestItem.secondOrder.name)}
            columns={secondOrderInfoColumns}/>
        </Col>
      </Row>
    </Modal>
  );

};
