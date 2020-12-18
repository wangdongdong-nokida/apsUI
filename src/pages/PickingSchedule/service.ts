import request from 'umi-request';
import {ReactText} from "react";
import {Key} from "antd/es/table/interface";
import {TableListParams} from './data';


export async function editBrief(searchInfo?: { [key: string]: string }) {
  return request('/server/scribingItem/editBrief', {
    method: "POST",
    data: {
      ...searchInfo,
    }
  });
}

export async function editDurationTime(searchInfo?: { [key: string]: ReactText[] }) {
  return request('/server/testItem/editDurationTime', {
    method: "POST",
    data: {
      ...searchInfo,
    }
  });
}

export async function editEquipment(searchInfo?: { [key: string]: string }) {
  return request('/server/testItem/editEquipment', {
    method: "POST",
    data: {
      ...searchInfo,
    }
  });
}


export async function queryTestItem(searchInfo?: TableListParams) {
  return request('/server/testItem/findOperationAll', {
    method: "POST",
    data: {
      orderBy: "indexOrder",
      ...searchInfo,
    }
  });
}

export async function moveTask(search: { moveKeys: Key[], toPlace: Key[], equipmentId: Key[] }) {
  return request("/server/testItem/moveTask", {
    method: "post",
    data: {
      ...search
    }
  })
}

export async function testItemDelete(equipmentId: [any], searchInfo?: ReactText[]) {
  return request('/server/pickingItem/deleteOperations', {
    method: "POST",
    data: {
      // equipmentId,
      ids: searchInfo,
    }
  });
}


export async function findAllWaferWarehouse(info?: any, waferNr: any) {

  return request('/server/waferWarehouse/findAllWaferWarehouse', {
    method: "post",
    data: {
      ...info,
      params: {...info, waferNr}
    }
  });
}


export async function findWaferGearWarehouse(info?: any) {

  return request('/server/waferWarehouse/getWaferGearWarehouse', {
    method: "post",
    data: {
      ...info
    }
  });
}

export async function bindingWaferGearWarehouse(taskID?: any, gearWarehouse?: any) {

  return request('/server/waferWarehouse/bindingWaferGearWarehouse', {
    method: "post",
    data: {
      taskID, gearWarehouse
    }
  });
}









