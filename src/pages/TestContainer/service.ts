import request from 'umi-request';
import {SecondOrder, TableListParams, TestParameter} from './data';


export async function querySecondOrder(params?: SecondOrder) {
  return request('/server/secondOrder/findSecondOrders', {
    method: "post",
    data: {
      ...params,
      testContainer: true
    }
  });
}

export async function createTestItem(params: any) {
  return request('/server/testItem/create', {
    method: "post",
    data: {
      ...params,
    }
  });

}

export async function queryEquipments(params?: {}) {
  return request('/server/equipment/getByUser', {
    method: "post",
    data: {params},
  });
}

export async function queryTextLabel(params?: TestParameter) {
  return request('/server/testParameter/findAllByParams', {
    method: "post",
    data: {
      params,
    }
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}


