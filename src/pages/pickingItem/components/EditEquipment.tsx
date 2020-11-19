import {Form, InputNumber, Modal, Select} from "antd";
import React, {ReactText} from "react";
import FormItem from "antd/lib/form/FormItem";
import {ActionType} from "@ant-design/pro-table/lib/Table";
import {schedulePickingItem} from "../service";


interface EditEquipmentProps {
  modalVisible: boolean;
  onCancel: () => void;
  params: {
    ids: ReactText[],
    equipments: ReactText[],
    operationActionRef: ActionType
  }
}


export const EditEquipment: React.FC<EditEquipmentProps> = (props) => {
  const {modalVisible, onCancel, params} = props;
  const [form] = Form.useForm();
  const onOk = async () => {
    const fields = await form.validateFields();
    form.resetFields();
    const submitParams = params.ids?.map((selectRow) => {
      return {
        ID: selectRow,
        equipmentSelected: fields.equipmentID,
        duration: fields.durationTime,
        quantity: fields.quantity
      };
    });
    await schedulePickingItem(submitParams);
    params?.operationActionRef?.current?.reload();
    onCancel();
  };
  return (
    <Modal visible={modalVisible} onCancel={onCancel} onOk={onOk} destroyOnClose>
      <Form form={form}>
        <FormItem rules={[{required: true, message: "请选择设备！"}]} label="设备" name="equipmentID">
          <Select style={{width: "70%"}}>
            {params.equipments}
          </Select>
        </FormItem>
        <FormItem rules={[{required: true, message: "请输入生产时间！"}]} label="生产时间" name="durationTime">
          <InputNumber style={{width: "70%"}}/>
        </FormItem>
{/*
        <FormItem rules={[{required: true, message: "请输入生产数量！"}]} label="生产数量" name="quantity">
          <InputNumber style={{width: "70%"}}/>
        </FormItem>
*/}
      </Form>
    </Modal>
  )
};
