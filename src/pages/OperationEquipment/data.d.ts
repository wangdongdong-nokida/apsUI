
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



export interface Wafer extends PaginationParams{
   id?: string;
   waferNr?:string;
   sliceNr?:string;
}

