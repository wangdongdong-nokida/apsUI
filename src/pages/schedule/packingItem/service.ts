import request from 'umi-request';


export async function queryPackingOrders(searchInfo?: any) {
  return request('/server/packingItem/getPackingOrdersAll', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}

export async function queryOperations(searchInfo?: any) {
  return request('/server/packingItem/getOperation', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}

export async function getWorkFlow(searchInfo?: any) {
  return request('/server/workFlow/getWorkFlow', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}

export async function getWorkStep(searchInfo?: any) {
  return request('/server/workFlow/getWorkStep', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}


export async function createOperation(searchInfo?: any) {
  return request('/server/packingItem/createOperationItem', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}


export async function deletePackingOrders(ids?: any) {
  return request('/server/packingItem/deletePackingOrders', {
    method: "post",
    data: {
      ids,
    }
  });
}





