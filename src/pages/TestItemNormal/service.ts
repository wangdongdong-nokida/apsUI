import request from 'umi-request';
import {TestParameter} from './data';


export async function querySecondOrder(params?: {}) {
  return request('/server/secondOrder/findSecondOrders', {
    method: "post",
    data: {
      ...params,
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

export async function queryWaferWarehouse(searchInfo?: {}) {
  return request('/server/waferWarehouse/findAllByPage', {
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

export async function queryEquipments(params?: {}) {
  return request('/server/equipment/getByUser', {
    method: "post",
    data: {params},
  });
}


export async function getEquipmentEndDate(searchInfo?: any) {
  return request('/server/equipment/getEndDate', {
    params: {
      id: searchInfo
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


