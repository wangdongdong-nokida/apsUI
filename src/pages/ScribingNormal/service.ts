import request from 'umi-request';
import {SecondOrder, TableListParams} from './data';



export async function createTestItem(params: any) {
  return request('/server/scribingItem/create', {
    method: "post",
    data: {
      ...params,
    }
  });
}

export async function queryWaferWarehouse(searchInfo?: SecondOrder) {
  return request('/server/scribingItem/getScribingItem', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}


export async function queryEquipments(searchInfo?: TableListParams) {
  return request('/server/equipment/getByUser', {
    params: searchInfo,
  });
}

export async function getEquipmentEndDate(searchInfo?:any) {
  return request('/server/equipment/getEndDate', {
    params: {
      id:searchInfo
    },
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
