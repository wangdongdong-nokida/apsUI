import request from 'umi-request';





export async function createPackingItem(params: any) {
  return request('/server/packingItem/createEmptyPackingOrder', {
    method: "post",
    data: {
      ...params,
    }
  });
}

export async function querySalesOrder(searchInfo?: any) {
  return request('/server/salesOrder/findSalesOrder', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}

export async function queryPackingOrders(searchInfo?:any) {
  return request('/server/packingItem/getPackingOrdersBySales', {
    method:"post",
    data: {
      ...searchInfo,
    }
  });
}

export async function deletePackingOrders(ids?:any) {
  return request('/server/packingItem/deletePackingOrders', {
    method:"post",
    data: {
      ids,
    }
  });
}





