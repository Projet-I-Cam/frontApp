import { Component } from '@angular/core';
import {
  apiResultFormat,
  parentList,
} from '../../../../shared/model/pages.model';
import { routes } from '../../../../shared/routes/routes';
import {
  pageSelection,
  PaginationService,
  tablePageSize,
} from '../../../../shared/custom-pagination/pagination.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../shared/data/data.service';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
interface City {
  name: string;
  code: string;
}
interface City2 {
  name: string;
  code: string;
}

@Component({
    selector: 'app-parents-list',
    templateUrl: './parents-list.component.html',
    styleUrl: './parents-list.component.scss',
    standalone: false
})
export class ParentsListComponent {
  initChecked = false;
  public pageSize = 10;
  public tableData: Array<parentList> = [];
  public tableDataCopy: Array<parentList> = [];
  public actualData: Array<parentList> = [];
  public routes = routes;
  public currentPage = 1;
  // pagination variables
  public skip = 0;
  public limit: number = this.pageSize;

  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<parentList>;
  public searchDataValue = '';
  cities!: City[];
  cities2!: City2[];

  selectedCities1!: City[];
  selectedCities2!: City2[];
  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService
  ) {
    this.data.getParentList().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.parentList) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });

    this.cities = [
      { name: 'Janet', code: 'Janet' },
      { name: 'Joann', code: 'Joann' },
      { name: 'Kathleen', code: 'Kathleen' },
      { name: 'Gifford', code: 'Gifford' },
    ];
    this.cities = [
      { name: 'Janet', code: 'Janet' },
      { name: 'Joann', code: 'Joann' },
      { name: 'Kathleen', code: 'Kathleen' },
      { name: 'Gifford', code: 'Gifford' },
    ];
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getParentList().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: parentList, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<parentList>(this.actualData);
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
