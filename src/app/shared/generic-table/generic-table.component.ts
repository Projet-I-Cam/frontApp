import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableConfig, TableColumn } from '../model/table.model';

@Component({
  selector: 'app-generic-table',
  standalone: false,
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {
  @Input() tableConfig!: TableConfig;
  @Input() tableData: any[] = [];
  @Output() rowSelected = new EventEmitter<any[]>();
  @Output() sortChanged = new EventEmitter<Sort>();
  @Output() searchChanged = new EventEmitter<string>();
  @Output() filterApplied = new EventEmitter<any>();

  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] = [];
  public searchDataValue = '';
  public selectedFilters: { [key: string]: any } = {};
  public selectedItems: any[] = [];

  ngOnInit() {
    this.displayedColumns = ['select', ...this.tableConfig.columns.map(c => c.name), 'actions'];
  }

  onSortChange(sort: Sort) {
    this.sortChanged.emit(sort);
  }

  onSearchChange(value: string) {
    this.searchChanged.emit(value);
  }

  applyFilter() {
    this.filterApplied.emit(this.selectedFilters);
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

  getDisplayValue(row: any, column: TableColumn): string {
    return column.display ? column.display(row[column.name]) : row[column.name];
  }
}