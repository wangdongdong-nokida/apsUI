import {Form, InputNumber, Modal} from "antd";
import React, {ReactText} from "react";
import FormItem from "antd/lib/form/FormItem";


interface EditBriefFormProps {
  modalVisible: boolean;
  onUpdate: (fieldsValue:{[key:string]:ReactText[]}) => void;
  onCancel: () => void;
  params:{
    ids:ReactText[]
  }
}


export const EditDurationDelayTimeForm:React.FC<EditBriefFormProps>=(props)=>{
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
        <FormItem label="延误时长" name="durationTime" >
          <InputNumber min={0} style={{width:"70%"}}/>
        </FormItem>
      </Form>
    </Modal>
  )
};
