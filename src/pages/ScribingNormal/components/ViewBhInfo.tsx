import { Col, Input, Modal, Row} from 'antd';
import React, { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { ProColumns } from '@ant-design/pro-table/lib/Table';


import { querySecondOrderInfoByName } from '@/pages/ScribingNormal/service';
import FormItem from 'antd/es/form/FormItem';


interface ViewBhInfoProps {
  modalVisible: boolean;
  onCancel: () => void;
  bhRow:any
}

export const ViewBhInfo: React.FC<ViewBhInfoProps> = (props) => {

  const { modalVisible, onCancel,bhRow } = props;
  const dd = "http://172.16.0.20:65372/testItem/queryBhImgByName?bhName=";
  const [backSystemAddress, handlebackSystemAddress] = useState<any>();

  const [bhInfo, handlebbhInfo] = useState<any>({'data':[{'L_BHNAME':'','DYCC':'','YPCC':'','HPJJ':'','RQ':'','PH':'','HPFS':'','PFZR':'','DYS':''}]});
  const proTableProps = {
    pagination: { pageSizeOptions: ['5', '10', '15', '20', '40'], pageSize: 10 },
    scroll: { y: 500,  scrollToFirstRowOnChange: true },
    rowKey: 'id',
    search: { span: 8 },
    bordered: true,
  };

  const bhInfoColumns: ProColumns<any>[] = [
    {
      title: 'id',
      dataIndex: 'ID',
      hideInTable: true,
    },
    {
      title: '电路序号',
      dataIndex: 'DLXH',
    },
    {
      title: '电路名称',
      dataIndex: 'DLMC',
    },
    {
      title: '电路ID',
      dataIndex: 'DLID',
    },
    {
      title: '型号',
      dataIndex: 'PRODUCTNAME',
    },
    {
      title: '数量',
      dataIndex: 'SL',
    },
    {
      title: '设计师',
      dataIndex: 'SJS',
    },
    {
      title: '电路类型',
      dataIndex: 'L_DLLXNAME',
    },
    {
      title: '版本',
      dataIndex: 'BB',
    },
    {
      title: '旧版本是否可用',
      dataIndex: 'JBB',
    },
    {
      title: '流片尺寸',
      dataIndex: 'LPCC',
    },
    {
      title: '是否实验',
      dataIndex: 'SFSY',
    },
    {
      title: '备注',
      dataIndex: 'BZ',
    }
  ];


  return (
    <Modal visible={modalVisible} onCancel={onCancel} onOk={onCancel} width={1500} destroyOnClose>
      <Row>
        <Col span={4}>
          <FormItem label="版号:">
            <Input width={100} disabled={false} value={bhInfo.data === null ? '' : bhInfo.data[0].L_BHNAME} />
          </FormItem>
        </Col>
        <Col span={5}>
          <FormItem label="Cell单元尺寸:">
            <Input disabled={false} value={bhInfo.data === null ? '' : bhInfo.data[0].DYCC} />
          </FormItem>
        </Col>
        <Col span={5}>
          <FormItem label="圆片尺寸:">
            <Input disabled={false} value={bhInfo.data === null ? '' : bhInfo.data[0].YPCC} />
          </FormItem>
        </Col>
        <Col span={5}>
          <FormItem label="划片间距:">
            <Input disabled={false} value={bhInfo.data === null ? '' : bhInfo.data[0].HPJJ} />
          </FormItem>
        </Col>
        <Col span={4}>
          <FormItem label="日期:">
            <Input disabled={false} value={bhInfo.data === null ? '' : bhInfo.data[0].RQ} />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <FormItem label="片厚:">
            <Input width={100} disabled={false} value={bhInfo.data === null ? '' : bhInfo.data[0].PH} />
          </FormItem>
        </Col>
        <Col span={5}>
          <FormItem label="划片方式:">
            <Input disabled={false} value={bhInfo.data === null ? '' : bhInfo.data[0].HPFS} />
          </FormItem>
        </Col>
        <Col span={5}>
          <FormItem label="批负责人:">
            <Input disabled={false} value={bhInfo.data === null ? '' : bhInfo.data[0].PFZR} />
          </FormItem>
        </Col>
        <Col span={5}>
          <FormItem label="预估单元数1:">
            <Input disabled={false} value={bhInfo.data === null ? '' : bhInfo.data[0].DYS} />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ProTable
            headerTitle="版号下型号明细"
            toolBarRender={false}
            {...proTableProps}
            search={false}
            rowKey="ID"
            postData={(data:any[]) => {
              if(data.length > 0){
                handlebbhInfo({'data':data});
                console.info("handlebbhInfo",bhInfo)
              }
              return data;
            }}
            request={() => {
              handlebackSystemAddress(dd.concat(bhRow.center.waferNr));
              const data =  querySecondOrderInfoByName(bhRow.center.waferNr);
              console.info("data",data);
              return data;
            }}
            columns={bhInfoColumns}/>
        </Col>
      </Row>
      <Row>
          <img src={backSystemAddress} />
      </Row>
    </Modal>
  );

};
