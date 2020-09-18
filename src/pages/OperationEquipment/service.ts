import request from 'umi-request';

export async function getWorkStepEquipment(searchInfo?: any) {
  return request('/server/workFlow/getWorkStepEquipment', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}

export async function getWorkStepName(searchInfo?: any) {
  return request('/server/workFlow/getWorkStepName', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}


export async function addOperationEquipmentRelation(searchInfo?: any) {
  return request('/server/workFlow/addOperationEquipmentRelation', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}


export async function getEquipmentByOperation(searchInfo?: any) {
  return request('/server/workFlow/getEquipmentByOperation', {
    method: "post",
    data: {
      ...searchInfo,
    }
  });
}

export async function deleteOperationEquipment(ids?: any) {
  return request('/server/workFlow/deleteOperationEquipment', {
    method: "post",
    data: {
      ids,
    }
  });
}










