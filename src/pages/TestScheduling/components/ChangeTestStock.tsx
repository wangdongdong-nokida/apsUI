import React, {ReactText, useState} from "react";
import {Button, message, Modal} from "antd";
import ProTable from "@ant-design/pro-table";
import {ProColumns} from "@ant-design/pro-table/lib/Table";
import request from "umi-request";
import {Key} from "antd/es/table/interface";

interface EditFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onOk: () => void;
  equipment: any
  params: {
    taskIDs: ReactText,
    waferNr:string|undefined
  }
}

export const ChangeTestStock: React.FC<EditFormProps> = (props) => {
  const {modalVisible, onCancel, onOk, params} = props;
  const [selectedWafer, handleSelectedWafer] = useState<Key>();
  const confirmed = async () => {
    try {
      await request("/server/testItem/changeTestStock", {
        method: "post",
        data: {taskIDs: params.taskIDs, waferWarehouseID: selectedWafer}
      });
    }catch (e) {
      message.error(e.data.message);
    }
    onOk();
  };

  const waferColumn: ProColumns<never>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '版号',
      dataIndex: 'waferNr',
    },
    {
      title: '父版号',
      dataIndex: 'fatherWaferNr',
    },
    {
      title: '片号',
      dataIndex: 'sliceNr',
    },
    {
      title: '圆片状态',
      dataIndex: 'status',
    },
    {
      title: '生产批号',
      dataIndex: 'batchNr',
    },
    {
      title: '占用状态',
      dataIndex: 'bindingSecondOrders',
    },
    {
      title: '流片进度',
      dataIndex: ['lLpjd', 'jdb'],
      hideInSearch: true,
    },
  ];


  return (
    <Modal width={1000} visible={modalVisible} onCancel={onCancel} onOk={confirmed} destroyOnClose>
      <ProTable
        headerTitle="圆片库存"
        columns={waferColumn}
        options={false}
        rowKey="id"
        toolBarRender={(action, {selectedRowKeys}) => [
          selectedRowKeys && selectedRowKeys.length > 0 && <Button/>
        ]}
        beforeSearchSubmit={(index) => {
          return {params: {...index,waferNr:params.waferNr}}
        }}
        pagination={{pageSizeOptions: ["7", "10", "15", "20"], pageSize: 7}}
        rowSelection={{
          type: "radio",
          onChange: (selectedRowKeys: Key[], selectedRows: []) => {
            handleSelectedWafer(selectedRowKeys ? selectedRowKeys[0] : "");
          }
        }}
        request={(requestParams) => {
          return request('/server/waferWarehouse/getWaferAll', {
            data: {
              ...requestParams,
              waferNr:params.waferNr
            },
            method: "post"
          });

        }}
      />
    </Modal>
  )
};
