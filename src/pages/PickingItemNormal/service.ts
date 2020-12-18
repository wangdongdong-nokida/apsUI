import request from 'umi-request';
import {SecondOrder, TableListParams} from './data';


export async function queryRule(searchInfo?: TableListParams) {
  return request('/api/rule', {
    params: searchInfo,
  });
}

export async function createPickingItem(params: any) {
  return request('/server/pickingItem/createPickingOrder', {
    method: "post",
    data: {
      ...params,
    }
  });
}

export async function queryWaferWarehouse(searchInfo?: SecondOrder) {
  return request('/server/waferWarehouse/findWaferWarehouse', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}

export async function queryWaferProductWarehouse(searchInfo?: SecondOrder) {
  return request('/server/waferWarehouse/findProductByParams', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}

export async function queryPickingOrders(searchInfo?:any) {
  return request('/server/pickingItem/getPickingOrders', {
    method:"post",
    data: {
      ...searchInfo,
    }
  });
}

export async function deletePickingOrders(ids?:any) {
  return request('/server/pickingItem/deleteGearPickingOrders', {
    method:"post",
    data: {
      ids,
    }
  });
}





