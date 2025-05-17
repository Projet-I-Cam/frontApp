import { Component } from '@angular/core';
import { apiResultFormat, classeHomework } from '../../../shared/model/pages.model';
import { routes } from '../../../shared/routes/routes';
import { pageSelection, PaginationService, tablePageSize } from '../../../shared/custom-pagination/pagination.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../shared/data/data.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import Parse from 'parse';

import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { globalGet, globalPost } from '../../../services/statefull/http';
interface data {
  name: string;
  code: string;
}

@Component({
    selector: 'app-class-home-work',
    templateUrl: './class-home-work.component.html',
    styleUrl: './class-home-work.component.scss',
    standalone: false
})
export class ClassHomeWorkComponent {
  
  initChecked = false;
  submitting = false;
  public pageSize = 10;
  public homeworkForm: FormGroup;
  public tableData: Array<classeHomework> = [];
  public tableDataCopy: Array<classeHomework> = [];
  public actualData: Array<classeHomework> = [];
  public routes = routes;
  public currentPage = 1;
  person: any = null;
  homework: any = [];
  classroom: any = null;
  // pagination variables
  public skip = 0;
  public limit: number = this.pageSize;

  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<classeHomework>;
  public searchDataValue = '';

  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService,
    private fb: FormBuilder,
  ) {
    this.data.getClassHomeWork().subscribe((apiRes: apiResultFormat) => {
      this.actualData = apiRes.data;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.classHomeWork) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
    });
    
    this.homeworkForm = this.fb.group({
      homeWorkDate: ['', [Validators.required]],
      submissionDate: ['', [Validators.required]],
      attachment: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  async onSubmit(): Promise<any> {
      
    const formData = { ...this.homeworkForm.value };
    console.log('formData ', formData)
    if (this.homeworkForm.valid) {
      this.submitting = true;
      const r = await globalPost({
        T: "HomeWork",
        dataObject: {
          ...formData,
          teacher: {className: "Person", objectId: this.person?.objectId},
          classroom: {className: "Classroom", objectId: this.classroom?.objectId}
        }
      })

      const button = document.getElementById('myModal');
      if(button) button.click();

      globalGet({
        T: "HomeWork",
        filters: {
          teacher: {className: "Person", objectId: this.person.objectId},
        },
        includes: ['classroom']
      }).then(v =>{
        console.log('homework homework homework homework ', v)
        this.homework = v
      })

      this.submitting = false;
    }
  }

  public onFileSelect(event: any) {
    console.log('Changed')
    const file: File = event.target.files[0];
    if (file) {
      this.homeworkForm.patchValue({
        attachment: file
      });
    }
  }
  private getTableData(pageOption: pageSelection): void {
    this.data.getClassHomeWork().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: classeHomework, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<classeHomework>(this.actualData);
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
  selectedSubject: data | undefined;
  selectedDate: data | undefined;
  class: data[] | undefined;
  section: data[] | undefined;
  subject: data[] | undefined;
  date: data[] | undefined;
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
    this.subject= [
      { name: 'English', code: '1' },
      { name: 'Maths', code: '2' },
      { name: 'Physics', code: '2' },
    ];
    this.date= [
      { name: 'Monday', code: '1' },
      { name: 'Tuesday', code: '2' },
      { name: 'Wednesday', code: '2' },
    ];
   
    const user = Parse.User.current()
    const data = {
      T: "Person",
      isOne: true,
      filters: {
        user: {className: "_User", objectId: user?._getId()}
      }
    }
    globalGet(data).then(v =>{
      console.log('GLOBAL GET ', v)
      this.person = v
      globalGet({
        T: "HomeWork",
        filters: {
          teacher: {className: "Person", objectId: v?.objectId},
        },
        includes: ['classroom']
      }).then(v =>{
        console.log('homework homework homework homework ', v)
        this.homework = v
      })
    })
    globalGet({
      T: "Classroom",
      isOne: true,
    }).then(v =>{
      console.log('Classroom Classroom ', v)
      this.classroom = v
    })
    
    
  }
}
