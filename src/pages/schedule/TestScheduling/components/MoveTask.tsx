import {Button, Col, Dropdown, Form, Menu, Modal, Select} from "antd";
import React, {useState} from "react";
import FormItem from "antd/lib/form/FormItem";
import ProTable from "@ant-design/pro-table";
import {TestScheduleItem} from "@/pages/schedule/TestScheduling/data";
import {queryTestItem} from "@/pages/schedule/TestScheduling/service";
import {DownOutlined} from "@ant-design/icons/lib";
import {Key} from "antd/es/table/interface";


interface EditBriefFormProps {
  modalVisible: boolean;
  onUpdate: (fieldsValue:{[key:string]:any}) => void;
  onCancel: () => void;
  equipment:any
  params:{
    ids:[]
  }
}


export const EditEquipment:React.FC<EditBriefFormProps>=(props)=>{
  const {modalVisible,onUpdate, onCancel,params,equipment} = props;
  const [form]=Form.useForm();
  const onOk=async ()=>{
    const fields=await form.validateFields();
    form.resetFields();
    onUpdate({...fields,...params});
  };

  const [selectRowKeys, handleSelectRowKeys] = useState<Key[]>([]);


  const proTableProps = {
    pagination: {pageSizeOptions: ["5", "10", "15", "20", "40"], pageSize: 5},
    scroll: {y: 700, scrollToFirstRowOnChange: true},
    rowKey: "id",
    search: {span: 8},
    bordered: true,
    beforeSearchSubmit: (searchInfo: any) => {
      return {
        params: searchInfo
      }
    }
  };


  return(
    <Modal visible={modalVisible} onCancel={onCancel} onOk={onOk} destroyOnClose>
      <ProTable<TestScheduleItem>
        headerTitle="测试排产"
        {...proTableProps}
        request={(searchInfo) => queryTestItem(searchInfo)}
        columns={scheduleTestItemColumns}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys: Key[], selectedRows: TestScheduleItem[]) => {
            handleSelectRowKeys(selectedRowKeys);
          }
        }}/>
    </Modal>
  )
};
