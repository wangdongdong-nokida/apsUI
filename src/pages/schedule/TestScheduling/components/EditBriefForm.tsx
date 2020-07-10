import {Form, Modal} from "antd";
import React from "react";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";


interface EditBriefFormProps {
  modalVisible: boolean;
  onUpdate: (fieldsValue:{[key:string]:string}) => void;
  onCancel: () => void;
  params:{
    ID:string
  }
}


export const EditBriefForm:React.FC<EditBriefFormProps>=(props)=>{
  const {modalVisible,onUpdate, onCancel,params} = props;
  const [form]=Form.useForm();
  const onOk=async ()=>{
    const fields=await form.validateFields();
    form.resetFields();
    onUpdate({...fields,...params});
  };

return(
  <Modal visible={modalVisible} onCancel={onCancel} onOk={onOk} destroyOnClose>
    <Form form={form}>
      <FormItem label="测试明细备注" name="brief">
        <TextArea style={{width:"80%"}}/>
      </FormItem>
    </Form>
  </Modal>
)
};
