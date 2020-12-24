import request from 'umi-request';
import {TestParameter} from './data';
import { TableListParams } from '@/pages/TestScheduling/data';


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
      orderBy:"circuitNo"
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

export async function queryTestItemBySecondOrder(searchInfo?: any) {
  return request('/server/testItem/findAllBySecondOrder', {
    method: "POST",
    data: {
      ...searchInfo,
      orderBy:"indexOrder"
    }
  });
}

export async function queryYjrwBySecondOrderId(secondOrderId?: any) {
  return request('/server/testItem/findYjrwBySecondOrderId', {
    method: "GET",
    params: {
      secondOrderId,
    }
  });
}

export async function querySalesOrderByFirstOrderId(firstOrderId?: any) {
  return request('/server/testItem/findSalesOrderByFirstOrderId', {
    method: "GET",
    params: {
      firstOrderId,
    }
  });
}





