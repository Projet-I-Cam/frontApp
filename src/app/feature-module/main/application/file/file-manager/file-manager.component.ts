import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from '../../../../../shared/routes/routes';
import { DataService } from '../../../../../shared/data/data.service';
import { file, apiResultFormat } from '../../../../../shared/model/pages.model';
import {
  PaginationService,
  tablePageSize,
  pageSelection,
} from '../../../../../shared/custom-pagination/pagination.service';
import * as Plyr from 'plyr';

interface data {
  value: string;
}

@Component({
    selector: 'app-file-manager',
    templateUrl: './file-manager.component.html',
    styleUrl: './file-manager.component.scss',
    standalone: false
})
export class FileManagerComponent {
  initChecked = false;
  public routes = routes;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';

  selectedList1: data[] = [
    { value: 'Owned By Me' },
    { value: 'Owned by Anyone' },
    { value: 'Not Owned by Me' },
  ];
  selectedList2: data[] = [
    { value: 'Recent' },
    { value: 'Last Week' },
    { value: 'Last Month' },
  ];
  selectedList3: data[] = [
    { value: 'All File types' },
    { value: 'Folders' },
    { value: 'PDF' },
    { value: 'Images' },
    { value: 'Videos' },
    { value: 'Audios' },
    { value: 'Excel' },
  ];
  selectedList4: data[] = [
    { value: 'Last Modified' },
    { value: 'Last Modified by Me' },
    { value: 'Last Opened by Me' },
  ];
  selectedList5: data[] = [
    { value: 'Sort by Date' },
    { value: 'Sort By Relevance' },
    { value: 'Sort By Size' },
    { value: 'Order Ascending' },
    { value: 'Order Descending' },
    { value: 'Upload Time' },
  ];
  // pagination variables
  public tableData: Array<file> = [];
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<file>;
  public searchDataValue = '';
  //** / pagination variables
  public tableDataCopy: Array<file> = [];
  public actualData: Array<file> = [];
  public currentPage = 1;
  // pagination variables
  public skip = 0;
  public limit: number = this.pageSize;

  public pageSelection: pageSelection[] = [];
  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router
  ) {
  
    this.data.getFile().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.fileManager) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getFile().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: file, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<file>(this.actualData);
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
  customOptions: OwlOptions = {
    loop: true,
    margin: 15,
    items: 3,
    nav: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    // stageOuterClass: 'owl-stage-outer overflow-visible',
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1400: {
        items: 3,
      },
    },
  };
  customOptions1: OwlOptions = {
    items: 3,
    loop: true,
    margin: 15,
    nav: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    smartSpeed: 1000,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  };
  customOptions3: OwlOptions = {
    loop: true,
    margin: 15,
    items: 3,
    nav: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 4,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  };
  public filter = false;
  openFilter() {
    this.filter = !this.filter;
  }

  public player!: Plyr;
  public appSidebar = true;

  toggleChange() {
    this.appSidebar = !this.appSidebar;
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
