import request from 'umi-request';
import {TableListParams} from './data';
import {ReactText} from "react";
import {Key} from "antd/es/table/interface";


export async function editBrief(searchInfo?: { [key: string]: string }) {
  return request('/server/testItem/editBrief', {
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
  return request('/server/testItem/findAll', {
    method: "POST",
    data: {
      ...searchInfo,
      orderBy:"indexOrder"
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

export async function testItemDelete(equipmentId:[any],searchInfo?: ReactText[]) {
  return request('/server/testItem/testItemDelete', {
    method: "POST",
    data: {
      equipmentId,
      ids:searchInfo,
    }
  });
}











