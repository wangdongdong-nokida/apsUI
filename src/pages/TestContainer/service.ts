import request from 'umi-request';
import {SecondOrder, TableListParams, TestParameter} from './data';



export async function querySecondOrder(searchInfo?: SecondOrder) {
  return request('/server/secondOrder/findSecondOrders', {
    method: "post",
    data: {
      ...searchInfo,
      testContainer:true
    }
  });
}

export  async function createTestItem(params:any) {
  return request('/server/testItem/create', {
    method: "post",
    data: {
      ...params,
    }
  });

}

export async function queryEquipments(searchInfo?: TableListParams) {
  return request('/server/equipment/getByUser', {
    params: searchInfo,
  });
}

export async function queryTextLabel(searchInfo?: TestParameter) {
  return request('/server/testParameter/findAllByParams', {
    method: "post",
    data: {
      params: searchInfo,
    }
  });
}

export async function removeRule(searchInfo: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...searchInfo,
      method: 'delete',
    },
  });
}


