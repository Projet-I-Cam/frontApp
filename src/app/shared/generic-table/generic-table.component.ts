import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableConfig, TableColumn, FilterConfig } from '../model/table.model';

@Component({
  selector: 'app-generic-table',
  standalone: false,
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {
  @Input() tableConfig!: TableConfig;
  @Input() tableData: any[] = [];
  @Input() filterConfig: FilterConfig[] = [];
  @Input() sortOptions: any[] = [];
  @Input() dateRangeLabel = 'Select Date Range';

   @Output() dateRangeChange = new EventEmitter<any>();
  @Output() filterChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() action = new EventEmitter<{type: string, item: any}>();


  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] = [];
  public searchDataValue = '';
  public selectedFilters: { [key: string]: any } = {};
  public selectedItems: any[] = [];
  public rowSelected: any;
  public currentSort: string='';

  ngOnInit() {
    this.displayedColumns = ['select', ...this.tableConfig.columns.map(c => c.name), 'actions'];
  }

  applyFilters() {
    this.filterChange.emit(this.selectedFilters);
  }

  resetFilters() {
    this.selectedFilters = {};
    this.filterChange.emit({});
  }

  onSortChange(sort: any) {
    this.sortChange.emit(sort);
  }


  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }


  selectAll(event: any) {
    if (event.checked) {
      this.selectedItems = [...this.tableData];
    } else {
      this.selectedItems = [];
    }
    this.rowSelected.emit(this.selectedItems);
  }

  selectRow(event: any, row: any) {
    if (event.checked) {
      this.selectedItems.push(row);
    } else {
      this.selectedItems = this.selectedItems.filter(item => item !== row);
    }
    this.rowSelected.emit(this.selectedItems);
  }

  triggerAction(actionType: string, item: any) {
    this.action.emit({type: actionType, item});
  }

  getDisplayValue(row: any, column: TableColumn): string {
    return column.display ? column.display(row[column.name]) : row[column.name];
  }
}
