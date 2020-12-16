import request from 'umi-request';


export async function querySecondOrder(params?: {}) {
  return request('/server/secondOrder/findSecondOrders', {
    method: "post",
    data: {
      ...params,
      noTest: true
    }
  });
}

export async function createTestItem(params: any) {
  return request('/server/scribingItem/bindSecondOrder', {
    method: "post",
    data: {
      ...params,
    }
  });
}

export async function queryWaferWarehouse(params?: {}) {
  return request('/server/waferWarehouse/findAllByPage', {
    method: "post",
    data: {
      ...params,
    }
  });
}

export async function queryEquipments(params?: {}) {
  return request('/server/equipment/getByUser', {
    method: "post",
    data: {params},
  });
}



