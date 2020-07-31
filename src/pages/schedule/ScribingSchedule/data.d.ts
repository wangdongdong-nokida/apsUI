export interface TableListItem {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  title: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
}

export interface TestParameter {
  id?: string;
  name?: string;
  type?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams extends PaginationParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: string;
}


export interface PaginationParams {
  sorter?: string;
  pageSize?: number;
  currentPage?: number;
}

export interface WaferProduct extends PaginationParams {
  id?: string;
  circuitNo?: string;
  quantity?: string
  status?: string;
  circuitNo?: string;
  product: { name: string, modelNr: string, circuitType: { name: string }, productBase: { name: string } }
  wafer: { nr: string }
}

export interface Wafer extends PaginationParams {
  id?: string;
  waferNr?: string;
  sliceNr?: string;
}

export interface SecondOrder extends PaginationParams {
  id?: string;
  nr?: string;
  name?: string;
  waferNr?: string;
  type?: string;
  status?: string;
}


export interface TestScheduleItem {
  id?:string,
  DurationTime?: number;
  StartDate?: Date;
  EndDate?: Date;
  DelayPlan?: number;
  DelayActually?: number;

  scheduleTestItem?:{
    waferNr?: string;
    sliceNr?:string;
    productNr?: string;
    circuitNr?: string;
    testType?: string;
    testParameter?: string;
    quantity?: number;
    itemBrief?: string;
    testBrief?: string;
    arrivalProgress?: string;
    arrivalUpdateTime?: Date;
    warehousingTime?: Date;
    ArrivalDelay?: string;
  }

}
