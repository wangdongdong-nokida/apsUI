import request from 'umi-request';


export async function createTestItem(params: any) {
  return request('/server/scribingItem/create', {
    method: "post",
    data: {
      ...params,
    }
  });
}

export async function queryWaferWarehouse(params?: {}) {
  return request('/server/scribingItem/getScribingItem', {
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

export async function getEquipmentEndDate(searchInfo?:any) {
  return request('/server/equipment/getEndDate', {
    params: {
      id:searchInfo
    },
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

