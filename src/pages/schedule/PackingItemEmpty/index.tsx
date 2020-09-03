import {Button, Col, Row, message, Menu, Dropdown, Card, Form, Input, InputNumber} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";

import {DownOutlined} from "@ant-design/icons/lib";
import {FormInstance} from "antd/lib/form/Form";
import {Key} from "antd/es/table/interface";
import {
  createPackingItem,
  deletePackingOrders,
  queryPackingOrders,
  querySalesOrder
} from './service';
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/es/input/TextArea";

const CreateTestItem: React.FC<{}> = () => {

  const secondOrderFormRef = useRef<FormInstance>();
  const secondOrderActionRef = useRef<ActionType>();

  const [form] = Form.useForm();

  const packingOrderActionRef = useRef<ActionType>();
  const packingOrderFormRef = useRef<FormInstance>();

  const [salesOrder, handleSalesOrder] = useState<Key>();
  const [ddh, handlerddh] = useState<any>();

  const handleRemove = async (ids: any) => {
    await deletePackingOrders(ids);
  };

  const handleClick = async (params: any) => {
    const submitForm = await form.validateFields();
    const hide = message.loading("正在添加请稍等");

    try {
      await createPackingItem({...submitForm,salesOrder:params});
      packingOrderActionRef.current?.reload();
      hide();
    } catch (e) {
      hide();
      message.error("添加失败")
    }
  };


  const inputStyle = {width: "80%"};


  const proTableProps = {
    pagination: {pageSizeOptions: ["5", "10", "20"], pageSize: 5},
    rowKey: "id",
    search: {span: 8},
    bordered: true,
    beforeSearchSubmit: (searchInfo: any) => {
      return {
        params: searchInfo
      }
    }
  };


  const order: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '版号',
      dataIndex: 'bh',
    },

    {
      title: '型号',
      dataIndex: 'xh',
    },
    {
      title: '订单号',
      dataIndex: 'ddh',
    },
    {
      title: '订单数量',
      dataIndex: 'ddsl',
    },
    {
      title: '订单状态',
      dataIndex: 'ddzt',
    },
    {
      title: '客户',
      dataIndex: 'khjc',
    },
    {
      title: '是否军检',
      dataIndex: 'sfjj',
    },
    {
      title: '是否监制',
      dataIndex: 'sfjz',
    },
    {
      title: '提供方式',
      dataIndex: 'tgfs',
    },
    {
      title: '预发货日期',
      dataIndex: 'yfhrq',
    },
    {
      title: '检验完成时间',
      dataIndex: 'jywcsj',
    },
    {
      title: "父版号",
      dataIndex: "fatherWaferNr"
    },
    {
      title: "类型",
      dataIndex: "type"
    },
    {
      title: "批次号",
      dataIndex: "batchNr"
    },
    {
      title: "状态",
      dataIndex: "status"
    },
    {
      title: "备注",
      dataIndex: "bz"
    }
  ];


  const packingOrderColumn: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: ["packingOrder", "id"],
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '版号',
      dataIndex: ['waferNr'],
    },
    {
      title: '片号',
      dataIndex: ['sliceNr'],
    },
    {
      title: '型号',
      dataIndex: ['modelNr'],
    },
    {
      title: "电路序号",
      dataIndex: ["circuitNr"]
    },
    // {
    //   title: '圆片状态',
    //   dataIndex: ['sliceState'],
    // },
    {
      title: '销售订单',
      dataIndex: ['bindSalesOrder'],
    }
  ];


  const createButton = (params: any) => {
    return createPackingItem(params)
  };


  return (
    <PageHeaderWrapper>
      <Row gutter={[30, 16]}>
        <Col span={28}>
          <ProTable
            headerTitle="销售订单"
            actionRef={secondOrderActionRef}
            formRef={secondOrderFormRef}
            {...proTableProps}
            scroll={{y: 500, x: 1800, scrollToFirstRowOnChange: true}}
            request={(params) => {
              return querySalesOrder(params);
            }}
            params={{params: {"*occupies": ""}}}
            columns={order}
            rowSelection={{
              type: "radio",
              onChange: (selectedRowKeys, selectRowItem) => {
                handleSalesOrder(selectedRowKeys ? selectedRowKeys[0] : '');
                handlerddh(selectRowItem ? selectRowItem[0]?.ddh : "");
              }
            }}
          />
        </Col>

      </Row>
      <Card  hidden={!salesOrder}>
        <Form form={form}>
          <Row>
            <Col span={6}>
              <FormItem
                name="emptyCount"
                label="无片数量"
                rules={[{required:true,message:"请填入无片数量！！！"}]}
              >
                <InputNumber style={inputStyle} min={0}/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <FormItem
                name="brief"
                label="订单备注"
              >
                <TextArea style={inputStyle}/>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row justify="end">
          <Col span={24}>
            <Button
              onClick={async () => {
                await handleClick(salesOrder);
              }}
            >创建挑粒订单</Button>
          </Col>
        </Row>
      </Card>
      <Row gutter={[30, 16]}>
        <Col span={24}>
          <ProTable
            headerTitle="已建挑粒订单"
            actionRef={packingOrderActionRef}
            formRef={packingOrderFormRef}
            {...proTableProps}
            scroll={{y: 500, x: 1000, scrollToFirstRowOnChange: true}}
            search={false}
            beforeSearchSubmit={(searchInfo) => {
              return {
                params: {...searchInfo}
              }
            }}
            toolBarRender={(action, {selectedRowKeys}) => [
              selectedRowKeys && selectedRowKeys.length > 0 && (
                <Dropdown
                  overlay={
                    <Menu
                      onClick={async (e) => {
                        if (e.key === 'remove') {
                          await handleRemove(selectedRowKeys);
                          action.reload();
                        }
                      }}
                      selectedKeys={[]}
                    >
                      <Menu.Item key="remove">删除挑粒订单</Menu.Item>
                    </Menu>
                  }
                >
                  <Button>
                    批量操作 <DownOutlined/>
                  </Button>
                </Dropdown>
              )
            ]}
            params={{params: {"<>bindSalesOrder": ddh, "salesOrder": true}}}
            request={(params) => {
              return queryPackingOrders(params);
            }}
            columns={packingOrderColumn}
            rowSelection={{
              // onChange: (selectedRowKeys) => {
              //   handleProductList(selectedRowKeys);
              // }
            }}
          />
        </Col>
      </Row>

    </PageHeaderWrapper>
  )

};

export default CreateTestItem;
