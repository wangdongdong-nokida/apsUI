import request from 'umi-request';
import {TableListParams} from './data';
import {ReactText} from "react";
import {Key} from "antd/es/table/interface";


export async function editBrief(params?: { [key: string]: string }) {
  return request('/server/scribingItem/editBrief', {
    method: "POST",
    data: {
      ...params,
    }
  });
}

export async function editDurationTime(params?: { [key: string]: ReactText[] }) {
  return request('/server/testItem/editDurationTime', {
    method: "POST",
    data: {
      ...params,
    }
  });
}

export async function editEquipment(params?: { [key: string]: string }) {
  return request('/server/testItem/editEquipment', {
    method: "POST",
    data: {
      ...params,
    }
  });
}


export async function queryTestItem(params?: TableListParams) {
  return request('/server/testItem/findAll', {
    method: "POST",
    data: {
      ...params,
    }
  });
}

export async function moveTask(search:{moveKeys:Key[],toPlace:Key[],equipmentId:Key[]}) {
  return request("/server/testItem/moveTask",{
    method:"post",
    data:{
      ...search
    }
  })
}

export async function testItemDelete(equipmentId:[any],params?: ReactText[]) {
  return request('/server/testItem/testItemDelete', {
    method: "POST",
    data: {
      equipmentId,
      ids:params,
    }
  });
}











