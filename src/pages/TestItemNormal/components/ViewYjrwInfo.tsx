import { Col, Modal, Row } from 'antd';
import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { ProColumns } from '@ant-design/pro-table/lib/Table';



import { queryYjrwBySecondOrderId,querySalesOrderByFirstOrderId } from '@/pages/TestItemNormal/service';
import { Key } from 'antd/es/table/interface';


interface ViewYjrwInfoProps {
  modalVisible: boolean;
  onCancel: () => void;
  secondOrderRow:any
}

export const ViewYjrwInfo: React.FC<ViewYjrwInfoProps> = (props) => {
  const { modalVisible, onCancel,secondOrderRow } = props;

  const [firstOrderId, firstOrderIdHandle] = useState<any>('');

  const proTableProps = {
    pagination: { pageSizeOptions: ['5', '10', '15', '20', '40'], pageSize: 20 },
    scroll: { y: 700, x: 3000, scrollToFirstRowOnChange: true },
    rowKey: 'id',
    search: { span: 8 },
    bordered: true,
  };

  const yjrwInfoColumns: ProColumns<any>[] = [
    {
      title: 'id',
      dataIndex: 'ID',
      hideInTable: true,
    },
    {
      title: '一级任务编号',
      dataIndex: 'L_YJRWNAME',
    },
    {
      title: '计划交期',
      dataIndex: 'JHJQ',
    },
    {
      title: '备注',
      dataIndex: 'BZ',
    },
    {
      title: '需求数量',
      dataIndex: 'XQSL',
    },
    {
      title: '版号',
      dataIndex: 'BH',
    },
    {
      title: '到货日期',
      dataIndex: 'DHRQ',
    },
    {
      title: '合并标记',
      dataIndex: 'HBBJ',
    },
    {
      title: '加急完成时间',
      dataIndex: 'JJSJ',
    },
    {
      title: '客户名称',
      dataIndex: 'KHMC',
    },
    {
      title: '流片备注',
      dataIndex: 'LPBZ',
    },
    {
      title: '流片单号',
      dataIndex: 'LPDH',
      hideInSearch: true,
    },
    {
      title: '流片数量',
      dataIndex: 'LPSL',
      hideInSearch: true,
    },
    {
      title: '是否流片',
      dataIndex: 'SFLP',
      hideInSearch: true,
    },
    {
      title: '设计师备注',
      dataIndex: 'SJSBZ',
      hideInSearch: true,
    },
    {
      title: '完成状态',
      dataIndex: 'WCZT',
      hideInSearch: true,
    },
    {
      title: '预发货日期',
      dataIndex: 'YFHRQ',
      hideInSearch: true,
    }
  ];

  const salesOrderColumns: ProColumns<any>[] = [
    {
      title: 'id',
      dataIndex: 'ID',
      hideInTable: true,
      hideInSearch:true,
    },
    {
      title: '订单状态',
      dataIndex: 'DDZT',
      hideInSearch:true,
    },
    {
      title: '订单号',
      dataIndex: 'L_DDNAME',
      hideInSearch:true,
    },
    {
      title: '型号',
      dataIndex: 'XH',
      hideInSearch:true,
    },
    {
      title: '订购数量',
      dataIndex: 'DGSL',
      hideInSearch:true,
    },
    {
      title: '提供方式',
      dataIndex: 'TGFS',
      hideInSearch:true,
    },
    {
      title: '质量等级',
      dataIndex: 'ZLDJ',
      hideInSearch:true,
    },
    {
      title: '客户名称',
      dataIndex: 'KHMC',
      hideInSearch:true,
    },
    {
      title: '交付期限',
      dataIndex: 'JFQX',
      hideInSearch:true,
    },
    {
      title: '计划交期',
      dataIndex: 'JHJQ',
      hideInSearch:true,
    },
    {
      title: '是否军检',
      dataIndex: 'SFJJ',
      hideInSearch:true,
    },
    {
      title: '是否监制',
      dataIndex: 'SFJZ',
      hideInSearch:true,
    },
    {
      title: '是否验收',
      dataIndex: 'SFYS',
      hideInSearch:true,
    },
    {
      title: '备注',
      dataIndex: 'BZ',
      hideInSearch:true,
    },
    {
      title: '合同号',
      dataIndex: 'HTH',
      hideInSearch:true,
    },
    {
      title: '超期复检',
      dataIndex: 'CQFJ',
      hideInSearch:true,
    },
    {
      title: '订单类型',
      dataIndex: 'DDLX',
      hideInSearch:true,
    },
    {
      title: '部门',
      dataIndex: 'BM',
      hideInSearch:true,
    },
    {
      title: '发货数量',
      dataIndex: 'FHSL',
      hideInSearch:true,
    },
    {
      title: '工程号',
      dataIndex: 'GCH',
      hideInSearch:true,
    },
    {
      title: '合同说明',
      dataIndex: 'HTSM',
      hideInSearch:true,
    },
    {
      title: '军检备注',
      dataIndex: 'JJBZ',
      hideInSearch:true,
    },
    {
      title: '军检时间',
      dataIndex: 'JJSJ',
      hideInSearch:true,
    },
    {
      title: '监制单位',
      dataIndex: 'JZDW',
      hideInSearch:true,
    },
    {
      title: '监制时间',
      dataIndex: 'JZSJ',
      hideInSearch:true,
    },
    {
      title: '确认备注',
      dataIndex: 'QRBZ',
      hideInSearch:true,
    },
    {
      title: '是否DPA',
      dataIndex: 'SFDPA',
      hideInSearch:true,
    },
    {
      title: '是否星用',
      dataIndex: 'SFXY',
      hideInSearch:true,
    },
    {
      title: '是否重点',
      dataIndex: 'SFZD',
      hideInSearch:true,
    },
    {
      title: '提供相关材料',
      dataIndex: 'TGXGCL',
      hideInSearch:true,
    },
    {
      title: '销售类型',
      dataIndex: 'XSLX',
      hideInSearch:true,
    },
    {
      title: '预发货日期',
      dataIndex: 'YFHRQ',
      hideInSearch:true,
    },
    {
      title: '验收单位',
      dataIndex: 'YSDW',
      hideInSearch:true,
    },
    {
      title: '验收时间',
      dataIndex: 'YSSJ',
      hideInSearch: true,
    },
    {
      title: '质保单位',
      dataIndex: 'ZBDW',
      hideInSearch:true,
    },
  ];

  const onYjrwSelect = (selectedRowKeys: Key[], selectedRows: any) => {
    firstOrderIdHandle(selectedRowKeys.ID);
  }


  return (
    <Modal visible={modalVisible} onCancel={onCancel} onOk={onCancel} width={1500} destroyOnClose>
      <Row>
        <Col span={24}>
          <ProTable
            headerTitle="一级任务明细"
            toolBarRender={false}
            {...proTableProps}
            search={false}
            rowKey="ID"
            request={() => queryYjrwBySecondOrderId(secondOrderRow.id)}
            columns={yjrwInfoColumns}
            rowSelection={{
              type: 'radio',
              onSelect: onYjrwSelect,
            }}/>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ProTable
            toolBarRender={false}
            headerTitle="订单明细"
            rowKey="ID"
            {...proTableProps}
            search={true}
            request={() => querySalesOrderByFirstOrderId(firstOrderId)}
            columns={salesOrderColumns}
            />
        </Col>
      </Row>
    </Modal>
  );

};
