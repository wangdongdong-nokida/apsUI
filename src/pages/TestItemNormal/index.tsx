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
import TextArea from 'antd/lib/input/TextArea';
import { ScheduleTestItem } from '@/pages/TestItemNormal/components/ScheduleTestItem';
import { ViewYjrwInfo } from '@/pages/TestItemNormal/components/ViewYjrwInfo';
import { WaferProduct, SecondOrder, TestParameter, Wafer } from './data';
import {
  createTestItem, getEquipmentEndDate,
  queryEquipments,
  querySecondOrder,
  queryTextLabel,
  queryWaferProducts,
  queryWaferWarehouse,
} from './service';
import { ViewBhInfo } from '@/pages/ScribingNormal/components/ViewBhInfo';

const CreateTestItem: React.FC<{}> = () => {
  const [form] = Form.useForm();

  const productFormRef = useRef<FormInstance>();
  const secondOrderFormRef = useRef<FormInstance>();
  const stockFormRef = useRef<FormInstance>();

  const secondActionRef = useRef<ActionType>();
  const productActionRef = useRef<ActionType>();
  const stockActionRef = useRef<ActionType>();

  const [waferNrList, handlerWaferNrList] = useState<{}>();
  const [equipmentList, handleEquipment] = useState<EquipmentItem[]>();
  const [testLabelList, handleTestLabel] = useState<TestParameter[]>();
  const [screenLabelList, handleScreenLabel] = useState<TestParameter[]>();
  const [assessmentLabelList, handleAssessmentLabel] = useState<TestParameter[]>();

  const [secondOrderList, handleSecondOrderList] = useState<Key>();
  const [forecastList, handleForecastList] = useState<{}>({});
  const [assessmentList, handleAssessmentList] = useState<{}>({});
  const [screenList, handleScreenList] = useState<{}>({});
  const [productList, handleProductList] = useState<{ [key: string]: string | undefined }[]>();
  const [stockList, handleStockList] = useState<Key[]>();

  const [forecastSelected, handleForecastSelected] = useState<[]>([]);
  const [assessmentSelected, handleAssessmentSelected] = useState<[]>([]);
  const [screenSelected, handleScreenSelected] = useState<[]>([]);
  const [scheduleTestItemVisible, handleScheduleTestItemVisible] = useState<boolean>(false);
  const [ViewYjrwInfoVisible, handleViewYjrwInfoVisible] = useState<boolean>(false);

  const [secondOrderClickRow, handlesecondOrderClickRow] = useState<any>();

  const [ViewBhInfoVisible, handleViewBhInfoVisible] = useState<boolean>(false);
  const [bhClickRow, handleBhClickRow] = useState<any>();
  const productFormReset = () => {
    // eslint-disable-next-line no-unused-expressions
    productFormRef?.current?.resetFields();
    // eslint-disable-next-line no-unused-expressions
    productFormRef?.current?.submit();
  };

  const formSpan = 6;
  const inputStyle = { width: '100%' };
  const proTableProps = {

    scroll: { y: 300, x: 1400, scrollToFirstRowOnChange: true },
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
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              handlesecondOrderClickRow(entity);
              handleViewYjrwInfoVisible(!ViewYjrwInfoVisible)
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '版号',
      dataIndex: 'waferNr',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              handleBhClickRow(dom);
              handleViewBhInfoVisible(!ViewBhInfoVisible)
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '型号',
      dataIndex: 'waferModelNr',
    },
    {
      title: '测试要求完成时间',
      dataIndex: ['testFinishedDateRequired'],
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '任务类型',
      dataIndex: 'type',
      hideInSearch: true,
    },
    {
      title: '任务级别',
      dataIndex: 'urgency',
      hideInSearch: true,
    },
    {
      title: '任务数量',
      dataIndex: 'quantity',
      hideInSearch: true,
    },
    {
      title: '任务来源',
      dataIndex: 'rwly',
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
      title: '测试调度备注',
      dataIndex: 'testBrief',
      hideInSearch: true,
    },
    {
      title: '任务类型',
      dataIndex: 'type',
      hideInTable: true,
      valueEnum: {
        生产: '生产',
        研制: '研制',
        考核: '考核',
      },
    },
    {
      title: '任务状态',
      dataIndex: 'status',
      hideInSearch: true,
    },
    {
      title: '任务状态',
      dataIndex: 'status',
      hideInTable: true,
      valueEnum: {
        已发布: '已发布',
        完成: '完成',
        中止: '中止',
        暂停: '暂停',
      },
    },
    {
      title: '产品类型',
      dataIndex: ['productType', 'name'],
      hideInSearch: true,
    },
    {
      title: '产品类型',
      dataIndex: ['productType', 'name'],
      hideInTable: true,
      valueEnum: {
        单片: '单片',
        圆片: '圆片',
        载体: '载体',
      },
    },
    {
      title: '测试班组',
      dataIndex: ['csbz'],
      // valueEnum: {
      //   测试A: '测试A',
      //   测试B: '测试B',
      // },
    },
    {
      title: '测试调度备注',
      dataIndex: ['testBrief'],
      hideInSearch: true,
    },
  ];

  const waferColumn: ProColumns<Wafer>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '版号',
      dataIndex: 'waferNr',
    },
    {
      title: '父版号',
      dataIndex: 'fatherWaferNr',
    },
    {
      title: '片号',
      dataIndex: 'sliceNr',
    },
    {
      title: '圆片状态',
      dataIndex: 'status',
    },
    {
      title: '生产批号',
      dataIndex: 'batchNr',
    },
    {
      title: '占用状态',
      dataIndex: 'bindingSecondOrders',
      hideInSearch: true,
    },
    {
      title: '流片进度',
      dataIndex: ['lLpjd', 'jdb'],
      hideInSearch: true,
    },
  ];

  const productColumns: ProColumns<WaferProduct>[] = [
    {
      title: '版号',
      dataIndex: ['==wafer', 'nr'],
      valueEnum: waferNrList,
      hideInTable: true,
    },
    {
      title: '版号',
      dataIndex: ['wafer', 'nr'],
      hideInSearch: true,
      fixed: true,
      width: 120,
    },
    {
      title: '电路序号',
      dataIndex: 'circuitNo',
      hideInSearch: true,
      fixed: true,
      width: 120,
    },
    {
      title: '型号',
      dataIndex: ['product'],
      hideInSearch: true,
      fixed: true,
    },
    {
      title: '电路名称',
      dataIndex: 'circuitName',
      hideInSearch: true,
    },

    // {
    //   title: '电路类型',
    //   dataIndex: ['product', 'circuitType', "name"],
    //   hideInSearch: true
    // },
    {
      title: '单元数',
      dataIndex: ['wafer', 'unitNumber'],
      hideInSearch: true,
      width: 100,
    },
    {
      title: '单元芯片数',
      dataIndex: 'quantity',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '总数量',
      dataIndex: 'total',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '预测数量',
      dataIndex: 'forecastQuantity',
      hideInSearch: true,
      width: 100,
      render(text, record) {
        return (<Input onChange={(e) => {
          const forecastQuantity = forecastList;
          forecastQuantity[record.id] = e.target.value;
          handleForecastList(forecastQuantity);
        }
        } min={0} defaultValue={10}/>);
      },
    },
    {
      title: '筛选数量',
      dataIndex: 'screenQuantity',
      hideInSearch: true,
      width: 100,
      render(text, record) {
        return (<Input onChange={(e) => {
          const screenQuantity = screenList;
          screenQuantity[record.id] = e.target.value;
          handleScreenList(screenQuantity);
        }
        } min={0} defaultValue={record.total}/>);
      },
    },
    {
      title: '考核数量',
      dataIndex: 'assessmentQuantity',
      hideInSearch: true,
      width: 100,
      render(text, record) {
        return (<Input onChange={(e) => {
          const assessmentQuantity = assessmentList;
          assessmentQuantity[record.id] = e.target.value;
          handleAssessmentList(assessmentQuantity);
        }
        } min={0} defaultValue={22}/>);
      },
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
      <
        Select.Option
        key={op.id}
        value={op.name}>
        {op.name}
      </Select.Option>
    ));
  };

  const equipmentHandler = async () => {
    const equipments = await queryEquipments({ type: '测试' });
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSecondOrderSelect = (selectedRowKeys: Key[], selectedRows: any) => {
    handleSecondOrderList(selectedRowKeys[0]);
    if (selectedRows.length > 0) {
      const waferNrs: string[] | undefined = selectedRows[0].waferNr?.split(';');
      const object = {};
      if (waferNrs) {
        for (let i = 0; i < waferNrs?.length; i += 1) {
          object[waferNrs[i]] = waferNrs[i];
        }
      }
      handlerWaferNrList(object);
    } else {
      handlerWaferNrList({});
      productFormReset();
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
            toolBarRender={(action, { selectedRowKeys, selectedRows }) => [
              selectedRowKeys && selectedRowKeys.length > 0 && <Button onClick={() => {
                handleScheduleTestItemVisible(!scheduleTestItemVisible)
              }}>显示已建明细</Button>,
            ]}
            columns={secondOrderColumns}
            rowSelection={{
              type: 'radio',
              onChange: onSecondOrderSelect,
            }}/>
        </Col>
      </Row>

      <Row justify="start" style={{ marginTop: 20 }}>
        <Col span={12}>
          <ProTable
            headerTitle="芯片信息"
            actionRef={productActionRef}
            formRef={productFormRef}
            pagination= {  false }
            {...proTableProps}
            request={(params) => {
// handlerSelectedWaferNr(params?.nr);
              return queryWaferProducts(params);
            }}
            columns={productColumns}
            onSubmit={() => {
              stockFormRef?.current?.submit();
            }}
            rowSelection={{
// eslint-disable-next-line @typescript-eslint/no-unused-vars
              onChange: (selectedRowKeys, selectedRows) => {
// eslint-disable-next-line no-unused-expressions
                const modelNrs = selectedRows?.map((product) => {
                  return {
                    id: product.id,
                    modelNr: product.product,
                    forecastQuantity: product.forecastQuantity,
                    screenQuantity: product.total,
                    assessmentQuantity: product.assessmentQuantity,
                    circuitNr: product.circuitNo,
                  };
                });
                handleProductList(modelNrs);
              },
            }}
          />
        </Col>
        <Col span={12}>
          <ProTable
            headerTitle="库存信息"
            actionRef={stockActionRef}
            formRef={stockFormRef}
            pagination= {  false }
            {...proTableProps}
            // @ts-ignore
            // beforeSearchSubmit={(params) => {
            //   return {
            //     params: {  '==waferNr': productFormRef?.current?.getFieldValue('==wafer-nr') },
            //   };
            // }}
            request={(params) => {

             if (params&&params.params){
               params.params['==waferNr']=productFormRef?.current?.getFieldValue('==wafer-nr');
             }else if(params){
               params.params={ '==waferNr': productFormRef?.current?.getFieldValue('==wafer-nr') };
             }else {
               params={params:{ '==waferNr': productFormRef?.current?.getFieldValue('==wafer-nr') }};
             }
              return queryWaferWarehouse(params);
            }}
            columns={waferColumn}
            rowSelection={{
              onChange: (selectedRowKeys) => {
                handleStockList(selectedRowKeys);
              },
            }}
          />
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
                {stockList && stockList.length > 0 ? '' : (<Col span={formSpan}>
                  <FormItem
                    label="无片数量"
                    name="sliceNum"
                    rules={[{ required: true, message: '请填入无片数量' }]}
                  >
                    <InputNumber min={0} style={inputStyle}/>
                  </FormItem>
                </Col>)}
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
                    product: productList?.map((target) => {
                      if (target && target.id) {
                        target.forecast = forecastList[target.id] ? forecastList[target.id] : 10;
                        target.screen = screenList[target.id] ? screenList[target.id] : target.screenQuantity;
                        target.assessment = assessmentList[target.id] ? assessmentList[target.id] : 22;
                      }
                      return target;
                    }),
                    stock: stockList,
                    waferNr: productFormRef?.current?.getFieldValue('==wafer-nr'),
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

      <ScheduleTestItem modalVisible={scheduleTestItemVisible} onCancel={()=>{handleScheduleTestItemVisible(false)}} secondOrderID={secondOrderList}/>

      <ViewYjrwInfo modalVisible={ViewYjrwInfoVisible} onCancel={()=>{handleViewYjrwInfoVisible(false)}} secondOrderRow={secondOrderClickRow}/>

      <ViewBhInfo modalVisible={ViewBhInfoVisible} onCancel={()=>{handleViewBhInfoVisible(false)}} bhRow={bhClickRow}/>
    </PageHeaderWrapper>
  );

};

export default CreateTestItem;
