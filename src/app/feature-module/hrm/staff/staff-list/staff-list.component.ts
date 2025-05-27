import { Component } from '@angular/core';
import { apiResultFormat, staff } from '../../../../shared/model/pages.model';
import { routes } from '../../../../shared/routes/routes';
import { pageSelection, PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../shared/data/data.service';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import Parse from 'parse';
import { globalGet } from '../../../../services/statefull/http';

@Component({
    selector: 'app-staff-list',
    templateUrl: './staff-list.component.html',
    styleUrl: './staff-list.component.scss',
    standalone: false
})
export class StaffListComponent {
  initChecked = false;
  public pageSize = 10;
  public tableData: Array<any> = [];
  public staffs: any = [];
  public tableDataCopy: Array<staff> = [];
  public actualData: Array<staff> = [];
  public routes = routes;
  public currentPage = 1;
  // pagination variables
  public skip = 0;
  public limit: number = this.pageSize;

  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  institution = null;
  person = null;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<staff>;
  public searchDataValue = '';

  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService
  ) {
    const user = Parse.User.current()
    const datax = {
      T: "Person",
      isOne: true,
      filters: {
        user: {className: "_User", objectId: user?._getId()}
      },
      includes: ['institution']
    }

    globalGet(datax).then(v =>{
      console.log('GLOBAL GET 1Z ', v)
      this.institution = v?.institution
      this.person = v
      this.getStatff(v?.institution)
    })

    this.data.getStaffList().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.staffList) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  async getStatff(insti: any){
    const institution = insti || this.institution
    const r = await globalGet({
      T: "Person",
      filters: {
        isStaff: true,
        institution: {"__type": "Pointer", "className": "Institution" , "objectId": institution.objectId}
      },
      includes: ['profesionalBackground', 'gender', 'maritalStatus', 'municipality', 'classroom']
    })
    this.staffs  = r
    this.tableData  = r
    console.log('r r r r r r r r r ', r)
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getStaffList().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: staff, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<staff>(this.actualData);
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
}
