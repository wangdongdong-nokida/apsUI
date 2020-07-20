import request from 'umi-request';
import {EquipmentItem, TableListParams} from './data.d';

export async function getCalendars(param?: TableListParams,selectEquipment?:EquipmentItem) {

  const equipmentId=selectEquipment?selectEquipment.id:'';
  return request('/server/equipmentCalendar/getAll', {
    params:{
      ...param,
      equipmentId
    }
  });
}

export async function getEquipment(params?: TableListParams) {
  return request('/server/equipment/getAllByParams', {
    method:"POST",
    data:{
      ...params,
    }
  });
}

export async function removeRule(params: { ids: (number | undefined)[] }) {
  return request('/server/equipmentCalendar/delete', {
    method: 'POST',
    data: {
      ...params
    },
  })
}


export async function updateServiceCalendar() {
  return request('/server/testItem/updateCalendar',{})
}

export async function addCalendar(params: {equipmentId?:string,data:TableListParams}) {
  return request('/server/equipmentCalendar/create', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateCalendar(params: TableListParams) {
  return request('/server/equipmentCalendar/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
