import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { apiResultFormat, classes } from '../../../../shared/model/pages.model';
import { pageSelection, PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../shared/data/data.service';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
interface data {
  name: string;
  code: string;
}

@Component({
    selector: 'app-class-list',
    templateUrl: './class-list.component.html',
    styleUrl: './class-list.component.scss',
    standalone: false
})
export class ClassListComponent {
  initChecked = false;
  selectedStatus: data | undefined;
  public pageSize = 10;
  public tableData: Array<classes> = [];
  public tableDataCopy: Array<classes> = [];
  public actualData: Array<classes> = [];
  public routes = routes;
  public currentPage = 1;
  // pagination variables
  public skip = 0;
  public limit: number = this.pageSize;

  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<classes>;
  public searchDataValue = '';


  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService
  ) {
    this.data.getClass().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.classes) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getClass().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: classes, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<classes>(this.actualData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

  public searchData(value: string): void {
    if (value == '') {
      this.tableData = this.tableDataCopy;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.tableData = this.dataSource.filteredData;
    }
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];

        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public changePageSize(pageSize: number): void {
    this.pageSelection = [];
    this.limit = pageSize;
    this.skip = 0;
    this.currentPage = 1;
    // this.getTableData();
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }
  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }
  selectedClass: data | undefined;
  selectedSection: data | undefined;
  class: data[] | undefined;
  section: data[] | undefined;
  status: data[] | undefined;
  ngOnInit() {
    this.class = [
      { name: 'I', code: '1' },
      { name: 'II', code: '2' },
      { name: 'III', code: '3' },
    ];
    this.section = [
      { name: 'A', code: '1' },
      { name: 'B', code: '2' },
      { name: 'C', code: '3' },
    ];
    this.status= [
      { name: 'Active', code: '1' },
      { name: 'Inactive', code: '2' },
    ];
   
   
    
  }
}
