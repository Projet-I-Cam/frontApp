import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { apiResultFormat, attendanceReport, staffsAttendance } from '../../../../shared/model/pages.model';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../shared/data/data.service';
import { pageSelection, PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';

@Component({
    selector: 'app-staffs-attendance',
    templateUrl: './staffs-attendance.component.html',
    styleUrl: './staffs-attendance.component.scss',
    standalone: false
})
export class StaffsAttendanceComponent {
  public routes = routes;
  // pagination variables
  public tableData: Array<staffsAttendance> = [];
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<staffsAttendance>;
  public searchDataValue = '';
  public tableDataCopy: Array<staffsAttendance> = [];
  public actualData: Array<staffsAttendance> = [];
  //** pagination variables
  initChecked = false;

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router
  ) {
    this.data.getStaffsAttendance().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.staffsAttendance) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getStaffsAttendance().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: staffsAttendance, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
          this.tableDataCopy.push(res);
        }
      });
      this.dataSource = new MatTableDataSource<staffsAttendance>(this.actualData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
    });
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
  public searchData(value: string): void {
    if (value == '') {
      this.tableData = this.tableDataCopy;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.tableData = this.dataSource.filteredData;
    }
  }

}
