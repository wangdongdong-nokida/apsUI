import request from 'umi-request';
import {SecondOrder, TableListParams, TestParameter} from './data.d';


export async function queryRule(searchInfo?: TableListParams) {
  return request('/api/rule', {
    params: searchInfo,
  });
}

export async function querySecondOrder(searchInfo?: SecondOrder) {
  return request('/server/secondOrder/findSecondOrders', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}

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

export async function queryWaferProducts(searchInfo?: any) {
  return request('/server/waferProduct/findProductsByWafer', {
    data: {
      ...searchInfo,
    },
    method: "post"
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

export async function addRule(searchInfo: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...searchInfo,
      method: 'post',
    },
  });
}

export async function updateRule(searchInfo: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...searchInfo,
      method: 'update',
    },
  });
}
