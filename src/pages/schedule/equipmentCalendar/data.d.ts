export interface CalendarTableItem {
  id?: string;
  equipmentId?: string;
  startTime?: Date;
  endTime?:Date;
  repeatType?:number;
  // monday?:boolean;
  // tuesday?:boolean;
  // wednesday?:boolean;
  // thursday?:boolean;
  // friday?:boolean;
  // saturday?:boolean;
  // sunday?:boolean;
  blackName?:boolean;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: CalendarTableItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams extends CalendarTableItem{
  sorter?: string;
  pageSize?: number;
  currentPage?: number;
}


export interface EquipmentItem {
  id:string;
  name?:string;
  type?:string;
}

