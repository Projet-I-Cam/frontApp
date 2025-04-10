export interface TableColumn {
  name: string;
  header: string;
  sortable?: boolean;
  display?: (value: any) => string;
}

export interface TableConfig {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  columns: TableColumn[];
  pageSize?: number;
  pageSizeOptions?: number[];
  actions?: TableAction[];
  filters?: FilterOption[];
}

export interface BreadcrumbItem {
  label: string;
  link?: string;
}

export interface TableAction {
  name: string;
  icon: string;
  handler: (item: any) => void;
}

export interface FilterOption {
  name: string;
  label: string;
  options: any[];
}