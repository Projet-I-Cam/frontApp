import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { apiResultFormat, pageSelection } from '../../../../shared/model/pages.model';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { DataService } from '../../../../shared/data/data.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CustomPaginationModule } from '../../../../shared/custom-pagination/custom-pagination.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../../../../shared/shared.module';

interface TeacherAssignment {
  id: number;
  teacherName: string;
  teacherImg: string;
  className: string;
  section: string;
  subject: string;
  startDate: string;
  endDate: string;
  status: string;
  isSelected?: boolean;
}

interface ClassData {
  name: string;
  code: string;
}

interface SectionData {
  name: string;
  code: string;
}

interface SubjectData {
  name: string;
  code: string;
}

@Component({
    selector: 'app-teacher-assignments',
    templateUrl: './teacher-assignments.component.html',
    styleUrl: './teacher-assignments.component.scss',
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MatSortModule, MatTableModule, CustomPaginationModule, BsDatepickerModule, DropdownModule, SharedModule]
})
export class TeacherAssignmentsComponent {
  public routes = routes;
  // pagination variables
  public tableData: Array<TeacherAssignment> = [];
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<TeacherAssignment>;
  public searchDataValue = '';
  public tableDataCopy: Array<TeacherAssignment> = [];
  public actualData: Array<TeacherAssignment> = [];
  //** pagination variables
  initChecked = false;
  
  // Dropdown data
  classes: ClassData[] = [];
  sections: SectionData[] = [];
  subjects: SubjectData[] = [];
  selectedClass: ClassData | undefined;
  selectedSection: SectionData | undefined;
  selectedSubject: SubjectData | undefined;

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router
  ) {
    // Simuler des données pour le moment
    this.mockAssignmentData();
    
    // Initialiser les listes déroulantes
    this.initializeDropdowns();
  }

  private mockAssignmentData() {
    // Données fictives pour les affectations d'enseignants
    const mockData: TeacherAssignment[] = [
      {
        id: 1,
        teacherName: 'Julien Vossard',
        teacherImg: 'assets/img/teachers/teacher-01.jpg',
        className: 'Sixième',
        section: 'A',
        subject: 'Mathématiques',
        startDate: '10 Mai 2024',
        endDate: '20 Juillet 2024',
        status: 'Actif'
      },
      {
        id: 2,
        teacherName: 'Sophie Laurent',
        teacherImg: 'assets/img/teachers/teacher-02.jpg',
        className: 'Terminale',
        section: 'S',
        subject: 'Physique-Chimie',
        startDate: '05 Mai 2024',
        endDate: '15 Juillet 2024',
        status: 'Actif'
      },
      {
        id: 3,
        teacherName: 'Marc Dupont',
        teacherImg: 'assets/img/teachers/teacher-03.jpg',
        className: 'Seconde',
        section: 'B',
        subject: 'Histoire-Géographie',
        startDate: '12 Mai 2024',
        endDate: '22 Juillet 2024',
        status: 'Actif'
      },
      {
        id: 4,
        teacherName: 'Claire Morin',
        teacherImg: 'assets/img/teachers/teacher-04.jpg',
        className: 'Troisième',
        section: 'C',
        subject: 'Anglais',
        startDate: '08 Mai 2024',
        endDate: '18 Juillet 2024',
        status: 'Actif'
      },
      {
        id: 5,
        teacherName: 'Pierre Martin',
        teacherImg: 'assets/img/teachers/teacher-05.jpg',
        className: 'Première',
        section: 'ES',
        subject: 'Économie',
        startDate: '15 Mai 2024',
        endDate: '25 Juillet 2024',
        status: 'Inactif'
      }
    ];
    
    this.actualData = mockData;
    this.getTableData({ skip: 0, limit: this.pageSize });
  }

  private initializeDropdowns() {
    // Classes
    this.classes = [
      { name: 'Sixième', code: '6' },
      { name: 'Cinquième', code: '5' },
      { name: 'Quatrième', code: '4' },
      { name: 'Troisième', code: '3' },
      { name: 'Seconde', code: '2' },
      { name: 'Première', code: '1' },
      { name: 'Terminale', code: 'T' }
    ];
    
    // Sections
    this.sections = [
      { name: 'A', code: 'A' },
      { name: 'B', code: 'B' },
      { name: 'C', code: 'C' },
      { name: 'S', code: 'S' },
      { name: 'ES', code: 'ES' },
      { name: 'L', code: 'L' }
    ];
    
    // Matières
    this.subjects = [
      { name: 'Mathématiques', code: 'MATH' },
      { name: 'Français', code: 'FRA' },
      { name: 'Histoire-Géographie', code: 'HIST' },
      { name: 'Physique-Chimie', code: 'PHY' },
      { name: 'SVT', code: 'SVT' },
      { name: 'Anglais', code: 'ENG' },
      { name: 'Économie', code: 'ECO' },
      { name: 'Philosophie', code: 'PHIL' },
      { name: 'Éducation Physique', code: 'EPS' },
      { name: 'Arts Plastiques', code: 'ART' }
    ];
  }

  private getTableData(pageOption: pageSelection): void {
    this.tableData = [];
    this.tableDataCopy = [];
    this.serialNumberArray = [];
    this.totalData = this.actualData.length;
    
    this.actualData.forEach((res: TeacherAssignment, index: number) => {
      const serialNumber = index + 1;
      if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
        res.id = serialNumber;
        this.tableData.push(res);
        this.serialNumberArray.push(serialNumber);
        this.tableDataCopy.push(res);
      }
    });
    
    this.dataSource = new MatTableDataSource<TeacherAssignment>(this.actualData);
    this.pagination.calculatePageSize.next({
      totalData: this.totalData,
      pageSize: this.pageSize,
      tableData: this.tableData,
      tableDataCopy: this.tableDataCopy,
      serialNumberArray: this.serialNumberArray,
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