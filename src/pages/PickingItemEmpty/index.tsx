import {Button, Col, Row, message, Menu, Dropdown, Card, Form, InputNumber} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {ActionType, ProColumns} from "@ant-design/pro-table/lib/Table";

import {DownOutlined} from "@ant-design/icons/lib";
import {FormInstance} from "antd/lib/form/Form";
import {Key} from "antd/es/table/interface";

import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import {createPickingItem, deletePickingOrders, queryPickingOrders, querySalesOrder} from "./service";

const CreateTestItem: React.FC<{}> = () => {

  const secondOrderFormRef = useRef<FormInstance>();
  const secondOrderActionRef = useRef<ActionType>();

  const [form] = Form.useForm();

  const pickingOrderActionRef = useRef<ActionType>();
  const pickingOrderFormRef = useRef<FormInstance>();

  const [salesOrder, handleSalesOrder] = useState<Key>();
  const [ddh, handlerddh] = useState<any>();

  const handleRemove = async (ids: any) => {
    await deletePickingOrders(ids);
  };

  const handleClick = async (params: any) => {
    const submitForm = await form.validateFields();
    const hide = message.loading("正在添加请稍等");

    try {
      await createPickingItem({...submitForm,salesOrder:params});
      pickingOrderActionRef.current?.reload();
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
      title: '型号',
      dataIndex: 'xh',
      fixed: true
    },
    {
      title: '订单数量',
      dataIndex: 'ddsl',
      hideInSearch: true,
      fixed: true
    },
    {
      title: '合同号',
      dataIndex: ['lHt', "lHtname"],
      fixed: true
    },
    {
      title: '客户',
      dataIndex: 'khjc',
      fixed: true
    },
    {
      title: '合同备注',
      dataIndex: ['lHt', "bz"],
    },
    {
      title: '订单类别',
      dataIndex: 'ddlb',
    },
    {
      title: '订单号',
      dataIndex: 'ddh',
    },
    {
      title: '版号',
      dataIndex: 'bh',
    },
    {
      title: '订单状态',
      dataIndex: 'ddzt',
      hideInSearch: true
    },

    {
      title: '是否军检',
      dataIndex: 'sfjj',
      hideInSearch: true
    },
    {
      title: '是否监制',
      dataIndex: 'sfjz',
      hideInSearch: true
    },
    {
      title: '是否重点',
      dataIndex: 'SFZDGC',
      hideInSearch: true
    },
    {
      title: '提供方式',
      dataIndex: 'tgfs',
      hideInSearch: true
    },
    {
      title: '预发货日期',
      dataIndex: 'yfhrq',
      hideInSearch: true
    },
    {
      title: '检验完成时间',
      dataIndex: 'jywcsj',
      hideInSearch: true
    },
    {
      title: "父版号",
      dataIndex: "fatherWaferNr",
      hideInSearch: true
    },
    {
      title: "类型",
      dataIndex: "type",
      hideInSearch: true
    },
    {
      title: "批次号",
      dataIndex: "batchNr",
      hideInSearch: true
    },
    {
      title: "状态",
      dataIndex: "status"
    },
    {
      title: "备注",
      dataIndex: "bz",
      hideInSearch: true
    }
  ];


  const pickingOrderColumn: ProColumns<{}>[] = [
    {
      title: 'id',
      dataIndex: ["pickingOrder", "id"],
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

  return (
    <PageHeaderWrapper>
      <Row gutter={[30, 16]}>
        <Col span={28}>
          <ProTable
            headerTitle="销售订单"
            actionRef={secondOrderActionRef}
            formRef={secondOrderFormRef}
            {...proTableProps}
            scroll={{y: 500, x: 2500, scrollToFirstRowOnChange: true}}
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
            >创建挑粒明细</Button>
          </Col>
        </Row>
      </Card>
      <Row gutter={[30, 16]}>
        <Col span={24}>
          <ProTable
            headerTitle="已建挑粒明细"
            actionRef={pickingOrderActionRef}
            formRef={pickingOrderFormRef}
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
                      <Menu.Item key="remove">删除挑粒明细</Menu.Item>
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
              return queryPickingOrders(params);
            }}
            columns={pickingOrderColumn}
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
