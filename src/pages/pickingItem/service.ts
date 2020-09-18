import request from 'umi-request';


export async function queryPickingOrders(searchInfo?: any) {
  return request('/server/pickingItem/getPickingOrdersAll', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}

export async function queryOperations(searchInfo?: any) {
  return request('/server/pickingItem/getOperation', {
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
  return request('/server/pickingItem/createOperationItem', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}


export async function deletePickingOrders(ids?: any) {
  return request('/server/pickingItem/deletePickingOrders', {
    method: "post",
    data: {
      ids,
    }
  });
}


export async function deleteOperations(ids?: any) {
  return request('/server/pickingItem/deleteOperations', {
    method: "post",
    data: {
      ids,
    }
  });
}

export async function schedulePickingItem(params?: any) {
  return request('/server/pickingItem/schedulePickingItem', {
    method: "post",
    data: {
      "params":params,
    }
  });
}






