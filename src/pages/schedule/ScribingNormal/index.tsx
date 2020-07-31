import {Button, Select, Form, Card, Col, Row, DatePicker, InputNumber, message, Input} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";

import FormItem from "antd/lib/form/FormItem";
import {PlusOutlined} from "@ant-design/icons/lib";
import {EquipmentItem} from "@/pages/schedule/equipmentCalendar/data";
import moment from "moment";
import {FormInstance} from "antd/lib/form/Form";
import {Key} from "antd/es/table/interface";
import {Wafer} from './data.d';
import {
  createTestItem,
  getEquipmentEndDate,
  queryEquipments,
  queryWaferWarehouse
} from './service';

const CreateTestItem: React.FC<{}> = () => {
  const [form] = Form.useForm();

  const stockFormRef = useRef<FormInstance>();
  const stockActionRef = useRef<ActionType>();
  const [equipmentList, handleEquipment] = useState<EquipmentItem[]>();
  const [stockList, handleStockList] = useState<Key[]>();

  const formSpan = 6;
  const inputStyle = {width: "100%"};
  const proTableProps = {
    pagination: {pageSizeOptions: ["5", "10", "20"], pageSize: 10},
    scroll: {y: 300, scrollToFirstRowOnChange: true},
    rowKey: "id",
    search: {span: 8},
    bordered: true,
    beforeSearchSubmit: (searchInfo: any) => {
      return {
        params: searchInfo
      }
    }
  };

  const waferColumn: ProColumns<Wafer>[] = [
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
      title: '片号',
      dataIndex: 'sliceNr',
    },
  ];

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
      <ProTable
        headerTitle="库存信息"
        actionRef={stockActionRef}
        formRef={stockFormRef}
        {...proTableProps}
        // @ts-ignore
        // beforeSearchSubmit={(searchInfo) => {
        //   return {
        //     params: {...searchInfo, waferNr: productFormRef?.current?.getFieldValue("wafer-nr")}
        //   }
        // }}
        request={(params) => {
          return queryWaferWarehouse(params);
        }}
        columns={waferColumn}
        rowSelection={{
          onChange: (selectedRowKeys) => {
            handleStockList(selectedRowKeys);
          }
        }}
      />

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
                              form.setFieldsValue({"planningFinishTime": date.clone()});
                              form.setFieldsValue({"planningAvailableTime": date.add(3, "d")});
                            }}
                    >
                      {optionEquipment()}
                    </Select>
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
                <Col span={formSpan}>
                  <FormItem
                    label="预估完成时间"
                    name="planningFinishTime">
                    <DatePicker mode="date" style={inputStyle} disabled/>
                  </FormItem>
                </Col>
                <Col span={formSpan}>
                  <FormItem
                    label="预估交片日期"
                    name="planningAvailableTime">
                    <DatePicker mode="date" style={inputStyle} disabled/>
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
                    ...submitForm,
                    stocks: stockList
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
