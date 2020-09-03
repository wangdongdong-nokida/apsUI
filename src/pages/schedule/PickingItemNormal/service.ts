import request from 'umi-request';
import {SecondOrder, TableListParams} from './data.d';


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

export async function createPackingItem(params: any) {
  return request('/server/packingItem/createPackingOrder', {
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

export async function queryPackingOrders(searchInfo?:any) {
  return request('/server/packingItem/getPackingOrders', {
    method:"post",
    data: {
      ...searchInfo,
    }
  });
}

export async function deletePackingOrders(ids?:any) {
  return request('/server/packingItem/deleteGearPackingOrders', {
    method:"post",
    data: {
      ids,
    }
  });
}





