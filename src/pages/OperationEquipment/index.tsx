import {Col, Row, Button, Modal, Form, message} from 'antd';
import React, {useState, Key, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';


import {
  addOperationEquipmentRelation, deleteOperationEquipment,
  getEquipmentByOperation,
  getWorkStepEquipment,
  getWorkStepName,
} from './service';
import {ActionType} from "@ant-design/pro-table/lib/Table";
import {FormInstance} from "antd/lib/form/Form";


const OperationEquipment: React.FC<{}> = () => {
  const [workStepName, handleWorkStepName] = useState<Key[]>();

  const [equipmentVisible, handlerEquipmentVisible] = useState<boolean>(false);

  const equipmentForm = useRef<FormInstance>();
  const equipmentAction = useRef<ActionType>();

  const [equipment, handlerEquipment] = useState<Key[]>();
  return (
    <PageHeaderWrapper>

      <Row gutter={[10, 8]}>
        <Col span={12}>
          <ProTable
            search={false}
            headerTitle="工序名称"
            // options={false}
            rowKey="id"
            pagination={{pageSizeOptions: ["5", "10", "20", "50"], pageSize: 10}}
            rowSelection={{
              type: "radio",
              onChange: (selectRowKeys) => {
                handleWorkStepName(selectRowKeys)
              }
            }}
            toolBarRender={
              (action, {selectedRowKeys}) =>
                [selectedRowKeys && selectedRowKeys.length > 0 && <Button type="primary" onClick={() => {
                  handlerEquipmentVisible(!equipmentVisible)
                }}>添加设备</Button>]
            }
            request={async (params) => {
              return getWorkStepName(params);
            }}
            params={{params: {"showAll": true}}}
            columns={[
              {
                title: "工序名称",
                dataIndex: ["stepName"],
              },
              {
                title: "ID",
                dataIndex: "id",
                hideInTable: true
              }
            ]}
          />
        </Col>

        <Col span={12}>
          <ProTable
            search={false}
            headerTitle="绑定设备"
            actionRef={equipmentAction}
            formRef={equipmentForm}
            // options={false}
            rowKey="id"
            toolBarRender={(action, {selectedRowKeys}) => [
              selectedRowKeys&&selectedRowKeys.length>0&&<Button
                type="primary"
                onClick={async ()=>{
                  const hide=message.loading("正在删除请稍后。");
                  try {
                    hide();
                    await deleteOperationEquipment(selectedRowKeys);
                    message.success("删除成功");
                  }catch (e) {
                    message.error("删除失败");
                  }
                  equipmentAction.current?.reload();
                }}
              >删除</Button>
            ]
            }
            pagination={{pageSizeOptions: ["5", "10", "20", "50"], pageSize: 10}}
            rowSelection={{
              type: "checkbox",
            }}
            request={async (params) => {
              return getWorkStepEquipment(params);
            }}
            params={{params: {"workStepName-ID": workStepName ? workStepName[0] : ""}}}
            columns={[
              {
                title: "设备名称",
                dataIndex: ["equipment", "name"],
              },
              {
                title: "ID",
                dataIndex: "id",
                hideInTable: true
              }
            ]}
          />
        </Col>

      </Row>

      <Modal onOk={
        async () => {
          await addOperationEquipmentRelation({workStepName, equipment});
          handlerEquipmentVisible(false);
          equipmentAction.current?.reset();
          equipmentAction.current?.reload();

        }
      } destroyOnClose onCancel={() => handlerEquipmentVisible(false)} visible={equipmentVisible}>
        <ProTable
          headerTitle="设备"
          rowKey="id"
          search={false}
          pagination={{pageSizeOptions: ['5', '10', '20', '30'], defaultPageSize: 5}}
          params={{params: {"workStepName-ID": workStepName ? workStepName[0] : ""}}}
          request={(params) => getEquipmentByOperation(params)}
          columns={[
            {
              title: 'ID',
              dataIndex: 'id',
              valueType: "text",
              hideInTable: true,
              hideInSearch: true
            },
            {
              title: '设备名称',
              dataIndex: 'name',
              valueType: "text",
            }]}
          rowSelection={{
            type: 'checkbox',
            onChange: (selectRowKeys) => {
              handlerEquipment(selectRowKeys);
            }
          }}
        />

      </Modal>


    </PageHeaderWrapper>
  )

};

export default OperationEquipment;
