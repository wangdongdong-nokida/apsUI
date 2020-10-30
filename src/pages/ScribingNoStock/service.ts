import request from 'umi-request';

export async function createTestItem(params: any) {
  return request('/server/scribingItem/createNoStock', {
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


