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
      orderBy:"indexOrder",
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

export async function  exportTestItemData (headerNameArray :[any],headerKeyArray : [any], testItemParamsList : [any])  {
  console.info("testItemList",testItemParamsList)
  const data = await request('/server/scribingItem/exportScribingItemData',{
    method: "POST",
    responseType:'blob',
    data: {
      headerNameArray,
      headerKeyArray,
      testItemParamsList,
    }
  });
  const aLink = document.createElement('a');
  document.body.appendChild(aLink);
  aLink.style.display='none';
  let objectUrl = null;
  let binaryData = [];
  binaryData.push(data);
  objectUrl = window.URL.createObjectURL(new Blob(binaryData));

  aLink.href = objectUrl;
  aLink.download = "划片排产.xls";
  aLink.click();
  document.body.removeChild(aLink);
}









