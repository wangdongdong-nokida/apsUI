import {Button, Select, Form, Card, Col, Row, DatePicker, InputNumber, message, Input} from 'antd';
import React, {useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';

import FormItem from "antd/lib/form/FormItem";
import {PlusOutlined} from "@ant-design/icons/lib";
import {EquipmentItem} from "@/pages/equipmentCalendar/data";
import moment from "moment";
import {
  createTestItem,
  getEquipmentEndDate,
  queryEquipments
} from './service';

const CreateTestItem: React.FC<{}> = () => {
  const [form] = Form.useForm();

  const [equipmentList, handleEquipment] = useState<EquipmentItem[]>();

  const formSpan = 6;
  const inputStyle = {width: "100%"};


  const createButton = (params: any) => {
    return createTestItem(params)
  };



  const equipmentHandler = async () => {
    const equipments = await queryEquipments();
    handleEquipment(equipments);
  };

  const optionEquipment = () => {
    return equipmentList?.map((op: EquipmentItem) => (
// @ts-ignore
      <Select.Option key={op.id} value={op.id}>
        {op.name}
      </Select.Option>
    ));
  };



  return (
    <PageHeaderWrapper>
      <Card>
        <Row>
          <Col span={24}>
            <Form form={form}>
              <Row gutter={[30, 16]}>
                <Col span={formSpan}>
                  <FormItem
                    name="equipmentId"
                    label="待排设备"
                    rules={[{required: true, message: '请选中一台设备'}]}
                  >
                    <Select style={inputStyle}
                            onFocus={equipmentHandler}
                            onChange={async (selectValue) => {
                              const date = moment(await getEquipmentEndDate(selectValue));
                              form.setFieldsValue({"planningStartTime": date.clone()});
                            }}
                    >
                      {optionEquipment()}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={formSpan}>
                  <FormItem
                    label="片号"
                    name="sliceNr"
                    rules={[{required: true, message: '请填入片号'}]}
                  >
                    <Input style={inputStyle}/>
                  </FormItem>
                </Col>
                <Col span={formSpan}>
                  <FormItem
                    label="版号"
                    name="waferNr"
                    rules={[{required: true, message: '请填入版号'}]}
                  >
                    <Input style={inputStyle}/>
                  </FormItem>
                </Col>
                <Col span={formSpan}>
                  <FormItem
                    label="持续时间"
                    name="durationTime"
                    rules={[{required: true, message: '请填入划片时间'}]}
                  >
                    <InputNumber style={inputStyle} min={0}/>
                  </FormItem>
                </Col>

                <Col span={formSpan}>
                  <FormItem
                    label="任务编码"
                    name="operationNr"
                    rules={[{required: true, message: '请填入任务编码'}]}
                  >
                    <Input style={inputStyle}/>
                  </FormItem>
                </Col>

                <Col span={formSpan}>
                  <FormItem
                    label="负责人"
                    name="responsiblePerson"
                    rules={[{required: true, message: '请填入负责人'}]}
                  >
                    <Input style={inputStyle}/>
                  </FormItem>
                </Col>

                <Col span={formSpan}>
                  <FormItem
                    label="申请人"
                    name="supplyPerson"
                    rules={[{required: true, message: '请填入申请人'}]}
                  >
                    <Input style={inputStyle}/>
                  </FormItem>
                </Col>

                <Col span={formSpan}>
                  <FormItem
                    label="申请时间"
                    name="supplyDate"
                    rules={[{required: true, message: '请填入申请时间'}]}
                  >
                    <DatePicker style={inputStyle}/>
                  </FormItem>
                </Col>

              </Row>

              <Row gutter={[30, 16]}>
                <Col span={formSpan}>
                  <FormItem
                    label="计划开始时间"
                    name="planningStartTime"
                  >
                    <DatePicker style={inputStyle} showTime disabled/>
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={[30, 16]}>
                <Col span={formSpan}>
                  <FormItem
                    label="划片备注"
                    name="brief"
                  >
                    <Input style={inputStyle}/>
                  </FormItem>
                </Col>
              </Row>


            </Form>
          </Col>
        </Row>

        <Row justify="end">
          <Col span={1.5}>
            <Button
              icon={<PlusOutlined/>}
              type="primary"
              onClick={async () => {
                const submitForm = await form.validateFields();
                const hide = message.loading('正在添加');
                try {
                  await createButton({
                    ...submitForm
                  });
                  hide();
                  message.success('创建成功');
                  return true;
                } catch (e) {
                  hide();
                  message.error('添加失败请重试！');
                  return false;
                }
              }}
            >创建划片明细</Button>
          </Col>
        </Row>
      </Card>

    </PageHeaderWrapper>
  )

};

export default CreateTestItem;
