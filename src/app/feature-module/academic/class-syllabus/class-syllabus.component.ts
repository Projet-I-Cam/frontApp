import { Component, Renderer2 } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from '../../../shared/data/data.service';
import {
  pageSelection,
  PaginationService,
  tablePageSize,
} from '../../../shared/custom-pagination/pagination.service';
import { classSyllabusData, apiResultFormat } from '../../../shared/model/pages.model';
interface data {
  name: string;
  code: string;
}

@Component({
    selector: 'app-class-syllabus',
    templateUrl: './class-syllabus.component.html',
    styleUrl: './class-syllabus.component.scss',
    standalone: false
})
export class ClassSyllabusComponent {
  public routes = routes;
  class: data[] | undefined;
  section: data[] | undefined;
  status: data[] | undefined;
  selectedStatus: data | undefined;
  selectedClass: data | undefined;
  selectedSection: data | undefined;
  selectedClass2: data | undefined;
  selectedSection2: data | undefined;
  bsValue = new Date();
  initChecked = false;
  public pageSize = 10;
  public tableData: Array<classSyllabusData> = [];
  public tableDataCopy: Array<classSyllabusData> = [];
  public actualData: Array<classSyllabusData> = [];
  public currentPage = 1;
  // pagination variables
  public skip = 0;
  public limit: number = this.pageSize;

  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<classSyllabusData>;
  public searchDataValue = '';
  constructor(
    private renderer: Renderer2,
    private data: DataService,
    private pagination: PaginationService,
    private router: Router
  ) {
    this.data.getClassSyllabus().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.classSyllabus) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
    
  }

  public handleApplyClick = () => {
    const modalElements = document.getElementsByClassName('drop-width');
    if (modalElements.length > 0) {
      for (let i = 0; i < modalElements.length; i++) {
        const modalElement = modalElements[i];
        this.renderer.removeClass(modalElement, 'show');
      }
    }
  };
  ngOnInit() {
    this.status = [
      { name: 'Active', code: '1' },
      { name: 'Inactive', code: '2' },
    ];
    this.section = [
      { name: 'A', code: '1' },
      { name: 'B', code: '2' },
      { name: 'C', code: '3' },
    ];
    this.class = [
      { name: 'I', code: '1' },
      { name: 'II', code: '2' },
      { name: 'III', code: '3' },
    ];
    this.selectedClass2 = this.class[0]
    this.selectedSection2 = this.section[0]
  }
  private getTableData(pageOption: pageSelection): void {
    this.data.getClassSyllabus().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: classSyllabusData, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.key = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<classSyllabusData>(this.actualData);
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
