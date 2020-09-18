import request from 'umi-request';





export async function createPickingItem(params: any) {
  return request('/server/pickingItem/createSalesPickingOrder', {
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

export async function queryOccupyBySalesOrder(searchInfo?: any) {
  return request('/server/pickingItem/findOccupyBySalesOrder', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}

export async function queryPickingOrders(searchInfo?:any) {
  return request('/server/pickingItem/getPickingOrdersBySales', {
    method:"post",
    data: {
      ...searchInfo,
    }
  });
}

export async function deletePickingOrders(ids?:any) {
  return request('/server/pickingItem/deletePickingOrders', {
    method:"post",
    data: {
      ids,
    }
  });
}





