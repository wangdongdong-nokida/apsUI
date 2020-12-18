import { DatePicker, Form, Modal } from 'antd';
import React, { ReactText } from 'react';
import FormItem from 'antd/lib/form/FormItem';


interface EditBriefFormProps {
  modalVisible: boolean;
  onUpdate: (fieldsValue: { [key: string]: ReactText[] }) => void;
  onCancel: () => void;
  params: {
    ids: ReactText[]
  }
}


export const EditSupplyTime: React.FC<EditBriefFormProps> = (props) => {
  const { modalVisible, onUpdate, onCancel, params } = props;
  const [form] = Form.useForm();
  const onOk = async () => {
    const fields = await form.validateFields();
    form.resetFields();
    await onUpdate({ ...fields, ...params });
  };

  return (
    <Modal visible={modalVisible} onCancel={onCancel} onOk={onOk} destroyOnClose>
      <Form form={form}>
        <FormItem label="计划交片" name="supplyTime">
          <DatePicker style={{ width: '70%' }}/>
        </FormItem>
      </Form>
    </Modal>
  );
};
