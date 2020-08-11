import React from 'react';
import {DatePicker, Form, Modal, Select, Switch} from 'antd';
import moment from "moment";
import {CalendarTableItem} from "@/pages/schedule/equipmentCalendar/data";


const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onCreate: (fieldsValue:CalendarTableItem) => void;
  onUpdate: (fieldsValue:CalendarTableItem) => void;
  onCancel: () => void;
  create:boolean;
  params:{
    equipmentId?:string
    parameter?:CalendarTableItem
  }
}

const EditForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const {RangePicker} = DatePicker;
  const {modalVisible, onCreate: handleAdd,onUpdate:handUpdate, onCancel,params,create} = props;
  const {equipmentId,parameter}=params;
  // const {startDate,handlerStartDate} =useState<Moment>();
  const {Option}=Select;

  if(!create&&parameter){
    form.setFieldsValue(parameter);
    form.setFieldsValue({rangeTime:[moment(parameter?.startTime),moment(parameter?.endTime)]});
  }else {
    form.resetFields();
  }

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();

    if (fieldsValue.rangeTime) {
      [fieldsValue.startTime, fieldsValue.endTime] = fieldsValue.rangeTime;
    }
    if(create){
      fieldsValue.equipmentId=equipmentId;
      handleAdd(fieldsValue);
    }else {
      fieldsValue.id=parameter?.id;
      handUpdate(fieldsValue);
    }
  };


  const repeatType=(
    <div>
      <FormItem labelCol={{span: 5}}
                wrapperCol={{span: 15}}
                label="重复方式"
                name="repeatType">
        <Select defaultValue="0">
          <Option value="2">星期一</Option>
          <Option value="3">星期二</Option>
          <Option value="4">星期三</Option>
          <Option value="5">星期四</Option>
          <Option value="6">星期五</Option>
          <Option value="7">星期六</Option>
          <Option value="1">星期日</Option>
          <Option value="0">不重复</Option>
        </Select>
      </FormItem>
    </div>);

  return (
    <Modal
      width={600}
      destroyOnClose
      title={create?"新建规则":"修改规则"}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >

      <Form form={form}>

        <FormItem
          labelCol={{span: 5}}
          wrapperCol={{span: 15}}
          label="时间范围"
          name="rangeTime"
           // rules={[{ required: true }]}
        >
          <RangePicker
            style={{width: "100%"}}
            ranges={{
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            // onChange={onChange}
          />
        </FormItem>

        <FormItem
          labelCol={{span: 5}}
          wrapperCol={{span: 15}}
          label="黑名单"
          name="blackName"
          valuePropName="checked"
        >
          <Switch/>
        </FormItem>
        {repeatType}
      </Form>

    </Modal>
  );
};

export default EditForm;
