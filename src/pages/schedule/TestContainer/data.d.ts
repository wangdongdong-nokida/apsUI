
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

export interface TableListParams extends PaginationParams{
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
}


export interface PaginationParams {
  sorter?: string;
  pageSize?: number;
  currentPage?: number;
}

export interface WaferProduct extends PaginationParams{
  id?: string;
  circuitNo?:string;
  quantity?:string
  status?: string;
  circuitNo?:string;
  forecastQuantity?:string;
  screenQuantity?:string;
  assessmentQuantity?:string;
  product:{name:string,modelNr:string,circuitType:{name:string},productBase:{name:string}}
  wafer:{nr:string}
}


export interface Wafer extends PaginationParams{
   id?: string;
   waferNr?:string;
   sliceNr?:string;
}

export interface SecondOrder extends PaginationParams{
  id?: string;
  nr?: string;
  name?: string;
  waferNr?: string;
  type?:string;
  status?: string;
  productType?:string,
  waferModelNr?:string
}
