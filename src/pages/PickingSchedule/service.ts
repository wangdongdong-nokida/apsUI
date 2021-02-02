import request from 'umi-request';
import { ReactText } from 'react';
import { Key } from 'antd/es/table/interface';
import { TableListParams } from './data';


export async function editBrief(searchInfo?: { [key: string]: string }) {
  return request('/server/pickingItem/editBrief', {
    method: 'POST',
    data: {
      ...searchInfo,
    },
  });
}

export async function editDurationTime(searchInfo?: { [key: string]: ReactText[] }) {
  return request('/server/testItem/editDurationTime', {
    method: 'POST',
    data: {
      ...searchInfo,
    },
  });
}

export async function editDurationDelayTime(searchInfo?: { [key: string]: ReactText[] }) {
  return request('/server/testItem/editDurationDelayTime', {
    method: 'POST',
    data: {
      ...searchInfo,
    },
  });
}

export async function editEquipment(searchInfo?: { [key: string]: string }) {
  return request('/server/testItem/editEquipment', {
    method: 'POST',
    data: {
      ...searchInfo,
    },
  });
}


export async function queryTestItem(searchInfo?: TableListParams) {
  return request('/server/testItem/findOperationAll', {
    method: 'POST',
    data: {
      orderBy: 'indexOrder',
      ...searchInfo,
    },
  });
}

export async function moveTask(search: { moveKeys: Key[], toPlace: Key[], equipmentId: Key[] }) {
  return request('/server/testItem/moveTask', {
    method: 'post',
    data: {
      ...search,
    },
  });
}

export async function testItemDelete(equipmentId: [any], searchInfo?: ReactText[]) {
  return request('/server/pickingItem/deleteOperations', {
    method: 'POST',
    data: {
      // equipmentId,
      ids: searchInfo,
    },
  });
}


export async function findAllWaferWarehouse(info?: any, waferNr: any) {

  return request('/server/waferWarehouse/findAllWaferWarehouse', {
    method: 'post',
    data: {
      ...info,
      params: { ...info, waferNr },
    },
  });
}


export async function findWaferGearWarehouse(info?: any) {

  return request('/server/waferWarehouse/getWaferGearWarehouse', {
    method: 'post',
    data: {
      ...info,
    },
  });
}

export async function bindingWaferGearWarehouse(taskID?: any, gearWarehouse?: any) {

  return request('/server/waferWarehouse/bindingWaferGearWarehouse', {
    method: 'post',
    data: {
      taskID, gearWarehouse,
    },
  });
}

export async function  exportTestItemData (headerNameArray :[any],headerKeyArray : [any], testItemParamsList : [any])  {
  console.info("testItemList",testItemParamsList)
  const data = await request('/server/pickingItem/exportPackingItemData',{
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
  aLink.download = "挑粒排产.xls";
  aLink.click();
  document.body.removeChild(aLink);
}









