import {Button, Select, Form, Card, Col, Row, DatePicker, InputNumber, message, Input} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";

import FormItem from "antd/lib/form/FormItem";
import {PlusOutlined} from "@ant-design/icons/lib";
import {EquipmentItem} from "@/pages/equipmentCalendar/data";
import moment from "moment";
import {FormInstance} from "antd/lib/form/Form";
import {Key} from "antd/es/table/interface";
import {WaferProduct, SecondOrder, TestParameter, Wafer} from './data';
import {
  createTestItem, getEquipmentEndDate,
  queryEquipments,
  querySecondOrder,
  queryTextLabel,
  queryWaferProducts,
  queryWaferWarehouse
} from './service';

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

  const productFormReset = () => {
    // eslint-disable-next-line no-unused-expressions
    productFormRef?.current?.resetFields();
    // eslint-disable-next-line no-unused-expressions
    productFormRef?.current?.submit();
  };

  const formSpan = 6;
  const inputStyle = {width: "100%"};
  const proTableProps = {
    pagination: {pageSizeOptions: ["5", "10", "20"], pageSize: 10},
    scroll: {y: 300, x: 1400, scrollToFirstRowOnChange: true},
    rowKey: "id",
    search: {span: 8},
    bordered: true,
    beforeSearchSubmit: (searchInfo: any) => {
      return {
        params: searchInfo
      }
    }
  };

  const secondOrderColumns: ProColumns<SecondOrder>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true
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
      title: '任务类型',
      dataIndex: 'type',
    },
    {
      title: '任务状态',
      dataIndex: 'status',
    },
    {
      title: '产品类型',
      dataIndex: ['productType', "name"],
    }
  ];

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
    },
  ];


  const productColumns: ProColumns<WaferProduct>[] = [
    {
      title: '版号',
      dataIndex: ["wafer", 'nr'],
      valueEnum: waferNrList,
      hideInTable: true,
    },
    {
      title: '版号',
      dataIndex: ["wafer", 'nr'],
      hideInSearch: true,
      fixed: true,
      width: 120
    },
    {
      title: '电路序号',
      dataIndex: 'circuitNo',
      hideInSearch: true,
      fixed: true,
      width: 120
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
      hideInSearch: true
    },

    // {
    //   title: '电路类型',
    //   dataIndex: ['product', 'circuitType', "name"],
    //   hideInSearch: true
    // },
    {
      title: '单元数',
      dataIndex: ["wafer", 'unitNumber'],
      hideInSearch: true,
      width: 100
    },
    {
      title: '单元芯片数',
      dataIndex: 'quantity',
      hideInSearch: true,
      width: 100
    },
    {
      title: '总数量',
      dataIndex: 'total',
      hideInSearch: true,
      width: 100
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
      }
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
      }
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
      }
    }
  ];


  const createButton = (params: any) => {
    return createTestItem(params)
  };

  const testLabelHandler = async () => {
    const testLabel = await queryTextLabel({type: "测试"});
    handleTestLabel(testLabel.data);
  };

  const screenLabelHandler = async () => {
    const screenLabel = await queryTextLabel({type: "筛选"});
    handleScreenLabel(screenLabel.data);
  };

  const assessmentLabelHandler = async () => {
    const assessmentLabel = await queryTextLabel({type: "考核"});
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSecondOrderSelect = (selectedRowKeys: Key[], selectedRows: any) => {
    handleSecondOrderList(selectedRowKeys[0]);
    if (selectedRows.length > 0) {
      const waferNrs: string[] | undefined = selectedRows[0].waferNr?.split(";");
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
            columns={secondOrderColumns}
            rowSelection={{
              type: 'radio',
              onChange: onSecondOrderSelect,
            }}/>
        </Col>
      </Row>

      <Row justify="start" style={{marginTop: 20}}>
        <Col span={12}>
          <ProTable
            headerTitle="芯片信息"
            actionRef={productActionRef}
            formRef={productFormRef}
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
              }
            }}
          />
        </Col>
        <Col span={12}>
          <ProTable
            headerTitle="库存信息"
            actionRef={stockActionRef}
            formRef={stockFormRef}
            {...proTableProps}
            // @ts-ignore
            beforeSearchSubmit={(searchInfo) => {
              return {
                params: {...searchInfo, waferNr: productFormRef?.current?.getFieldValue("wafer-nr")}
              }
            }}
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
                {stockList && stockList.length > 0 ? "" : (<Col span={formSpan}>
                  <FormItem
                    label="无片数量"
                    name="sliceNum"
                    rules={[{required: true, message: '请填入无片数量'}]}
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
                    >
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
                    >
                      {optionTextLabel(assessmentLabelList)}
                    </Select>

                  </FormItem>
                </Col>
              </Row>

              <Row gutter={[30, 16]}>

                <Col span={formSpan}>
                  <FormItem
                    name="forecastHours"
                    label="预测小时"
                  >
                    <InputNumber min={0} defaultValue={0} style={inputStyle}/>
                  </FormItem>
                </Col>

                <Col span={formSpan}>
                  <FormItem
                    label="筛选小时"
                    name="screenHours"
                  >
                    <InputNumber min={0} defaultValue={0} style={inputStyle}/>
                  </FormItem>
                </Col>
                <Col span={formSpan}>
                  <FormItem
                    label="考核小时"
                    name="assessmentHours"
                  >
                    <InputNumber min={0} defaultValue={0} style={inputStyle}/>
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
                        target.assessment = assessmentList[target.id] ? assessmentList[target.id] : 22
                      }
                      return target;
                    }),
                    stock: stockList,
                    waferNr: productFormRef?.current?.getFieldValue("wafer-nr")
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
  )

};

export default CreateTestItem;
