import request from 'umi-request';
import {TableListParams} from './data.d';

export async function createTestItem(params: any) {
  return request('/server/scribingItem/createNoStock', {
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

