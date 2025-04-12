export interface TableColumn {
  name: string;
  header: string;
  sortable?: boolean;
  display?: (value: any) => string;
}

export interface TableConfig {
  title: string;
  columns: TableColumn[];
  pageSize?: number;
  pageSizeOptions?: number[];
  actions?: TableAction[];
}


export interface TableAction {
  name: string;
  icon: string;
  handler: (item: any) => void;
}

export interface FilterConfig {
  key: string;
  label: string;
  options?: any[];
  value?:string;
  optionLabel: string;
}

export interface SortOption{
  label: string;
  value:string;
}
