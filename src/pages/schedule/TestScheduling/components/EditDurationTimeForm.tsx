import {Form, InputNumber, Modal} from "antd";
import React from "react";
import FormItem from "antd/lib/form/FormItem";


interface EditBriefFormProps {
  modalVisible: boolean;
  onUpdate: (fieldsValue:{[key:string]:string}) => void;
  onCancel: () => void;
  params:{
    ID:string
  }
}


export const EditDurationTimeForm:React.FC<EditBriefFormProps>=(props)=>{
  const {modalVisible,onUpdate, onCancel,params} = props;
  const [form]=Form.useForm();
  const onOk=async ()=>{
    const fields=await form.validateFields();
    form.resetFields();
    await onUpdate({...fields,...params});
  };

  return(
    <Modal visible={modalVisible} onCancel={onCancel} onOk={onOk} destroyOnClose>
      <Form form={form}>
        <FormItem label="测试时长" name="durationTime" >
          <InputNumber min={0} style={{width:"70%"}}/>
        </FormItem>
      </Form>
    </Modal>
  )
};
