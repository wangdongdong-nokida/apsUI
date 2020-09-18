import {Form, Modal, Select} from "antd";
import React, {ReactText} from "react";
import FormItem from "antd/lib/form/FormItem";


interface EditBriefFormProps {
  modalVisible: boolean;
  onUpdate: (fieldsValue:{[key:string]:any}) => void;
  onCancel: () => void;
  equipment:any
  params:{
    ids:ReactText[],
    belongEquipmentID:any
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

  return(
    <Modal visible={modalVisible} onCancel={onCancel} onOk={onOk} destroyOnClose>
      <Form form={form}>
        <FormItem label="设备" name="equipmentID" >
          <Select style={{width:"70%"}}>
            {equipment}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  )
};
