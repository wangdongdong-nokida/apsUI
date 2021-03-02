import { Button, Select, Form, Card, Col, Row, DatePicker, InputNumber, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ActionType, ProColumns } from '@ant-design/pro-table/lib/Table';

import FormItem from 'antd/lib/form/FormItem';
import { PlusOutlined } from '@ant-design/icons/lib';
import { EquipmentItem } from '@/pages/equipmentCalendar/data';
import moment from 'moment';
import { FormInstance } from 'antd/lib/form/Form';
import { Key } from 'antd/es/table/interface';
import { SecondOrder, TestParameter } from './data';
import { createTestItem, queryEquipments, querySecondOrder, queryTextLabel } from './service';
import { getEquipmentEndDate } from '@/pages/TestItemNormal/service';
import TextArea from 'antd/lib/input/TextArea';

const CreateTestItem: React.FC<{}> = () => {
  const [form] = Form.useForm();

  const productFormRef = useRef<FormInstance>();
  const secondOrderFormRef = useRef<FormInstance>();

  const secondActionRef = useRef<ActionType>();

  const [waferModelNr, handlerWaferModelNr] = useState<{}>();
  const [selectedWaferNr, handlerSelectedWaferNr] = useState<{}>();
  const [equipmentList, handleEquipment] = useState<EquipmentItem[]>();
  const [testLabelList, handleTestLabel] = useState<TestParameter[]>();
  const [screenLabelList, handleScreenLabel] = useState<TestParameter[]>();
  const [assessmentLabelList, handleAssessmentLabel] = useState<TestParameter[]>();

  const [secondOrderList, handleSecondOrderList] = useState<Key>();

  const [forecastSelected, handleForecastSelected] = useState<[]>([]);
  const [assessmentSelected, handleAssessmentSelected] = useState<[]>([]);
  const [screenSelected, handleScreenSelected] = useState<[]>([]);

  const formSpan = 6;
  const inputStyle = { width: '100%' };
  const proTableProps = {
    pagination: { pageSizeOptions: ['5', '10', '20'], pageSize: 10 },
    scroll: { y: 300, scrollToFirstRowOnChange: true },
    rowKey: 'id',
    search: { span: 8 },
    bordered: true,
    beforeSearchSubmit: (searchInfo: any) => {
      return {
        params: searchInfo,
      };
    },
  };

  const secondOrderColumns: ProColumns<SecondOrder>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true,
    },
    // {
    //   title: '编号',
    //   dataIndex: 'nr',
    // },
    {
      title: '创建状态',
      dataIndex: ['showState'],
      hideInTable: true,
      valueEnum: {
        'created': '已创建',
        'uncreated': '未创建',
      },
    },
    {
      title: '二级任务号',
      dataIndex: 'name',
    },
    {
      title: '版号',
      dataIndex: 'waferNr',
    },
    {
      title: '型号',
      dataIndex: 'waferModelNr',
    },
    {
      title: '订单类型',
      dataIndex: 'type',
      valueEnum: {
        客户订单: '客户订单',
        生产: '生产',
        研制: '研制',
      },
    },
    {
      title: '测试班组',
      dataIndex: 'csbz',
      valueEnum: {
        测试A: '测试A',
        测试B: '测试B',
      },
    },
    {
      title: '批次号',
      dataIndex: 'batchNr',
      hideInSearch: true,
    },
    {
      title: '任务数量',
      dataIndex: 'quantity',
      hideInSearch: true,
    },
    {
      title: '测试调度备注',
      dataIndex: 'testBrief',
      hideInSearch: true,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      hideInSearch: true,
    },
    {
      title: '产品类型',
      dataIndex: ['productType', 'name'],
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'applyDate',
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: ['cjr', 'name'],
    },
    {
      title: '测试要求完成时间',
      dataIndex: ['testFinishedDateRequired'],
      valueType: 'date',
      hideInSearch: true,
    },
  ];


  const createButton = (params: any) => {
    return createTestItem(params);
  };

  const testLabelHandler = async () => {
    const testLabel = await queryTextLabel({ type: '预测' });
    handleTestLabel(testLabel.data);
  };

  const screenLabelHandler = async () => {
    const screenLabel = await queryTextLabel({ type: '筛选' });
    handleScreenLabel(screenLabel.data);
  };

  const assessmentLabelHandler = async () => {
    const assessmentLabel = await queryTextLabel({ type: '考核' });
    handleAssessmentLabel(assessmentLabel.data);
  };

  const optionTextLabel = (list?: TestParameter[]) => {
    return list?.map((op: TestParameter) => (
      // @ts-ignore
      <Select.Option key={op.id} value={op.name}>
        {op.name}
      </Select.Option>
    ));
  };

  const equipmentHandler = async () => {
    const equipments = await queryEquipments({ type: '测试' });
    handleEquipment(equipments);

    const date = moment();
    form.setFieldsValue({ 'planningStartTime': date.clone() });
    form.setFieldsValue({ 'planningFinishTime': date.clone() });
    form.setFieldsValue({ 'planningAvailableTime': date.add(3, 'd') });
  };

  const optionEquipment = () => {
    return equipmentList?.map((op: EquipmentItem) => (
      // @ts-ignore
      <Select.Option key={op.id} value={op.id}>
        {op.name}
      </Select.Option>
    ));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSecondOrderSelect = (selectedRowKeys: Key[], selectedRows: any) => {
    handleSecondOrderList(selectedRowKeys[0]);
    if (selectedRows.length > 0) {
      const modelNr: string | undefined = selectedRows[0].waferModelNr;
      const { waferNr } = selectedRows[0];
      handlerWaferModelNr(modelNr);
      handlerSelectedWaferNr(waferNr);
    }
  };

  return (
    <PageHeaderWrapper>
      <Row>
        <Col span={24}>
          <ProTable
            headerTitle="二级任务"
            actionRef={secondActionRef}
            formRef={secondOrderFormRef}
            {...proTableProps}
            request={(params) => querySecondOrder(params)}
            columns={secondOrderColumns}
            rowSelection={{
              type: 'radio',
              onChange: onSecondOrderSelect,
            }}/>
        </Col>
      </Row>

      <Card>
        <Row>
          <Col span={24}>
            <Form form={form}>
              <Row gutter={[30, 16]}>
                <Col span={formSpan}>
                  <FormItem
                    name="equipmentId"
                    label="待排设备"
                    rules={[{ required: true, message: '请选中一台设备' }]}
                  >
                    <Select style={inputStyle}
                            onFocus={equipmentHandler}
                            onChange={async (selectValue) => {
                              const date = moment(await getEquipmentEndDate(selectValue));
                              form.setFieldsValue({ 'planningStartTime': date.clone() });
                              form.setFieldsValue({ 'planningFinishTime': date.clone() });
                              form.setFieldsValue({ 'planningAvailableTime': date.add(3, 'd') });
                            }}
                    >
                      {optionEquipment()}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={formSpan}>
                  <FormItem
                    name="testSymbol"
                    label="测试标识"
                    rules={[{ required: true, message: '请填写测试标识' }]}>
                    <Input style={inputStyle}/>
                  </FormItem>
                </Col>

              </Row>
              <Row gutter={[30, 16]}>
                <Col span={formSpan}>
                  <FormItem
                    label="预测参数"
                    name="forecast"
                  >
                    <Select style={inputStyle}
                            mode="multiple"
                            onFocus={testLabelHandler}
                            onChange={(value) => {
                              handleForecastSelected(value);
                            }}>
                      {optionTextLabel(testLabelList)}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={formSpan}>
                  <FormItem
                    label="筛选参数"
                    name="screen">
                    <Select style={inputStyle}
                            mode="multiple"
                            onFocus={screenLabelHandler}
                            onChange={(value) => {
                              handleScreenSelected(value);
                            }}
                    >
                      {optionTextLabel(screenLabelList)}
                    </Select>

                  </FormItem>
                </Col>
                <Col span={formSpan}>
                  <FormItem
                    label="考核参数"
                    name="assessment">
                    <Select style={inputStyle}
                            mode="multiple"
                            onFocus={assessmentLabelHandler}
                            onChange={(value) => {
                              handleAssessmentSelected(value);
                            }}
                    >
                      {optionTextLabel(assessmentLabelList)}
                    </Select>

                  </FormItem>
                </Col>
              </Row>

              <Row gutter={[30, 16]}>
                <Col span={formSpan}>{!(forecastSelected.length > 0) ? '' : (
                  <FormItem
                    name="forecastHours"
                    label="预测小时"
                    rules={[{ required: true, message: '请输入预测小时' }]}
                  >
                    <InputNumber min={0} defaultValue={0} style={inputStyle}/>
                  </FormItem>
                )} </Col>

                <Col span={formSpan}> {!(screenSelected.length > 0) ? '' : (
                  <FormItem
                    label="筛选小时"
                    name="screenHours"
                    rules={[{ required: true, message: '请输入筛选小时' }]}
                  >
                    <InputNumber min={0} defaultValue={0} style={inputStyle}/>
                  </FormItem>
                )}</Col>
                <Col span={formSpan}>{!(assessmentSelected.length > 0) ? '' : (
                  <FormItem
                    label="考核小时"
                    name="assessmentHours"
                    rules={[{ required: true, message: '请输入考核小时' }]}
                  >
                    <InputNumber min={0} defaultValue={0} style={inputStyle}/>
                  </FormItem>
                )}</Col>
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
                    label="备注"
                    name="testBrief"
                  >
                    <TextArea style={inputStyle}/>
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
                    secondOrder: secondOrderList,
                    waferNr: selectedWaferNr,
                    testContainer: true,
                    modelNr: waferModelNr,
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
            >创建测试明细</Button>
          </Col>
        </Row>
      </Card>

    </PageHeaderWrapper>
  );

};

export default CreateTestItem;
