import { Component, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../shared/data/data.service';
import { Router } from '@angular/router';
import { PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CustomPaginationModule } from '../../../../shared/custom-pagination/custom-pagination.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentService } from '../../../../services/student.service';
import { ClassService } from '../../../../services/class.service';
import { Student, StudentFilter, Class } from '../../../../shared/model/student.model';
import { finalize } from 'rxjs/operators';

interface PageSelection {
  skip: number;
  limit: number;
}

@Component({
    selector: 'app-students-list',
    templateUrl: './students-list.component.html',
    styleUrl: './students-list.component.scss',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, MatSortModule, MatTableModule, CustomPaginationModule, BsDatepickerModule, DropdownModule, SharedModule]
})
export class StudentsListComponent implements OnInit {
  initChecked = false;
  public pageSize = 10;
  public tableData: Array<Student> = [];
  public tableDataCopy: Array<Student> = [];
  public actualData: Array<Student> = [];
  public routes = routes;
  public currentPage = 1;
  public isLoading = false;
  public error = '';
  public classes: Class[] = [];
  public selectedClass: string = '';
  public selectedStatus: string = '';
  public statuses = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' }
  ];
  
  // pagination variables
  public skip = 0;
  public limit: number = this.pageSize;

  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: PageSelection[] = [];
  dataSource!: MatTableDataSource<Student>;
  public searchDataValue = '';

  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService,
    private studentService: StudentService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadClasses();

    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url === this.routes.studentList) {
        this.pageSize = res.pageSize;
        this.skip = res.skip;
        this.limit = res.limit;
        this.getTableData({ skip: this.skip, limit: this.limit });
      }
    });
  }

  loadStudents(): void {
    this.isLoading = true;
    this.error = '';
    
    this.studentService.getAllStudents()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (students) => {
          this.actualData = students;
          this.getTableData({ skip: this.skip, limit: this.limit });
        },
        (error) => {
          console.error('Error loading students:', error);
          this.error = 'Failed to load students. Please try again.';
        }
      );
  }

  loadClasses(): void {
    this.classService.getActiveClasses().subscribe(
      (classes) => {
        this.classes = classes;
      },
      (error) => {
        console.error('Error loading classes:', error);
      }
    );
  }

  onClassChange(event: any): void {
    this.selectedClass = event.value;
    this.applyFilters();
  }

  onStatusChange(event: any): void {
    this.selectedStatus = event.value;
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredData = this.actualData;
    
    if (this.selectedClass) {
      filteredData = filteredData.filter(student => 
        student.class && student.class.id === this.selectedClass
      );
    }
    
    if (this.selectedStatus) {
      filteredData = filteredData.filter(student => 
        student.status === this.selectedStatus
      );
    }
    
    if (this.searchDataValue) {
      const searchTerm = this.searchDataValue.toLowerCase();
      filteredData = filteredData.filter(student => 
        (student.registrationNumber && student.registrationNumber.toLowerCase().includes(searchTerm)) ||
        (student.person && student.person.firstName && student.person.firstName.toLowerCase().includes(searchTerm)) ||
        (student.person && student.person.lastName && student.person.lastName.toLowerCase().includes(searchTerm)) ||
        (student.person && student.person.email && student.person.email.toLowerCase().includes(searchTerm))
      );
    }
    
    this.tableData = filteredData.slice(this.skip, this.limit);
    this.tableDataCopy = [...this.tableData];
    this.totalData = filteredData.length;
    
    this.pagination.calculatePageSize.next({
      totalData: this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      tableDataCopy: this.tableDataCopy,
      serialNumberArray: this.serialNumberArray,
    });
  }

  private getTableData(pageOption: PageSelection): void {
    this.tableData = [];
    this.tableDataCopy = [];
    this.serialNumberArray = [];
    this.totalData = this.actualData.length;
    
    this.actualData.forEach((student: Student, index: number) => {
      const serialNumber = index + 1;
      if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
        this.tableData.push({...student, sNo: serialNumber});
        this.tableDataCopy.push({...student, sNo: serialNumber});
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.dataSource = new MatTableDataSource<Student>(this.actualData);
    this.pagination.calculatePageSize.next({
      totalData: this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      tableDataCopy: this.tableDataCopy,
      serialNumberArray: this.serialNumberArray,
    });
  }

  public searchData(value: string): void {
    this.searchDataValue = value;
    this.applyFilters();
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  
  public changePageSize(pageSize: number): void {
    this.pageSelection = [];
    this.limit = pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }
  
  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f: any) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f: any) => {
        f.isSelected = false;
      });
    }
  }

  // Navigate to add student page
  addStudent(): void {
    this.router.navigate([this.routes.addStudent]);
  }

  // Navigate to edit student page
  editStudent(id: string): void {
    this.router.navigate([this.routes.editStudent, id]);
  }

  // Navigate to student details page
  viewStudent(id: string): void {
    this.router.navigate([this.routes.studentDetails, id]);
  }

  // Delete student
  deleteStudent(id: string): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(
        () => {
          this.loadStudents();
        },
        (error) => {
          console.error('Error deleting student:', error);
        }
      );
    }
  }
}
