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


export async function editSupplyTime(searchInfo?: { [key: string]:  ReactText[] }) {
  return request('/server/testItem/editSupplyTime', {
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
    responseType:'json',
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

export async function  exportTestItemData (headerNameArray :[any],headerKeyArray : [any], testItemParamsList : [any])  {
  console.info("testItemList",testItemParamsList)
  const data = await request('/server/testItem/exportTestItemData',{
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
  aLink.download = "测试排产.xls";
  aLink.click();
  document.body.removeChild(aLink);
}











