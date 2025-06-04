// student-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { globalGet } from '../../../../services/statefull/http';
import { UtilsService } from '../../../../services/utilis.service';
import { LoginService } from '../../../../auth/services/login.service';
import { routes } from '../../../../shared/routes/routes';
import {  getCurrentAcademicYear } from '../../../../services/statefull/genericParse';



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers: [MessageService, ConfirmationService],
  standalone: false,
})
export class StudentListComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  // Data properties
  idParam: string = '';
  tableData: any[] = [];
  filteredStudents: any[] = [];
  sections: any[] = [];
  classes: any[] = [];
  classRooms: any[] = [];
  sexes: any[] = [];
  academicYear: any = {};
  currentPerson: any = {};

  // Filter properties
  searchValue: string = '';
  selectedSexes: any[] = [];
  selectedSections: any[] = [];
  selectedClasses: any[] = [];
  selectedClassRooms: any[] = [];

  // Pagination properties
  pageSize = 10;
  currentPage = 1;
  pageSizeOptions = [10, 25, 50];
  totalRecords = 0;

  // UI state
  loading = true;
  error: string | null = null;
  routes = routes;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private loginService: LoginService
  ) {}

  async ngOnInit() {
    try {
      await this.initializeData();
      await this.loadData();
    } catch (error) {
      this.handleError(error);
    }
  }

  private async initializeData(): Promise<void> {
    const [person, sections, sexes, academicYear] = await Promise.all([
      this.loginService.getPerson(),
      UtilsService.getSection(),
      UtilsService.getGender(),
      getCurrentAcademicYear()
    ]);

    this.currentPerson = person;
    this.academicYear = academicYear;
    this.sections = sections?.map((sec: any) => ({
      label: sec?.get('name_fr'),
      value: sec?._getId()
    })) || [];
    this.sexes = sexes?.map((sex: any) => ({
      label: sex?.get('libelle_fr'),
      value: sex?._getId()
    })) || [];

    await Promise.all([this.getClasses(), this.getClassRooms()]);
  }

  async loadData(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      await this.getTableData(this.currentPage);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.loading = false;
    }
  }

  async getClasses() {
    try {
      const res: any = await globalGet({ T: 'Classe' });
      this.classes = res?.map((classe: any) => ({
        label: classe.name_fr,
        value: classe.objectId
      })) || [];
    } catch (error) {
      this.handleError(error);
    }
  }

  async getClassRooms() {
    try {
      const institutionId = this.currentPerson?.institution?.objectId;
      if (!institutionId) return;

      const res: any = await globalGet({
        T: 'Classroom',
        filters: {
          institution: { className: 'Institution', objectId: institutionId }
        },
        selects: ['objectId', 'name_fr']
      });

      this.classRooms = res?.map((room: any) => ({
        label: room.name_fr,
        value: room.objectId
      })) || [];
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTableData(currentPage: number): Promise<void> {
    try {
      this.idParam = this.route.snapshot.paramMap.get('id') || '';

      const requestConfig: any = {
        T: 'Enrollment',
        includes: ['person', 'person.gender', 'classroom', 'classroom.classe', 'classroom.classe.section'],
        currentPage: currentPage,
        filters: {
          academicYear: {
            className: 'AcademicYear',
            objectId: this.academicYear?.objectId
          },
          institution: {
            className: 'Institution',
            objectId: this.idParam == '' ? this.currentPerson?.institution?.objectId : this.idParam
          },
          isValid: true
        },
      };

      const res: any = await globalGet(requestConfig);

      if (res?.error) {
        throw new Error(res.message);
      }

      this.tableData = res || [];
      this.filteredStudents = [...this.tableData];
      this.totalRecords = res?.count || res?.length || 0;
    } catch (error) {
      throw error;
    }
  }

  filterTable() {
    let filtered = [...this.tableData];
    const searchTerm = this.searchValue.toLowerCase();

    if (searchTerm) {
      filtered = filtered.filter(student =>
        (student.person?.firstName?.toLowerCase().includes(searchTerm) ||
         student.person?.lastName?.toLowerCase().includes(searchTerm) ||
         student.matricule?.toLowerCase().includes(searchTerm))
      );
    }

    if (this.selectedSexes.length) {
      filtered = filtered.filter(student =>
        this.selectedSexes.includes(student.person?.gender?.objectId)
      );
    }

    if (this.selectedSections.length) {
      filtered = filtered.filter(student =>
        this.selectedSections.includes(student.classroom?.classe?.section?.objectId)
      );
    }

    if (this.selectedClasses.length) {
      filtered = filtered.filter(student =>
        this.selectedClasses.includes(student.classroom?.classe?.objectId)
      );
    }

    if (this.selectedClassRooms.length) {
      filtered = filtered.filter(student =>
        this.selectedClassRooms.includes(student.classroom?.objectId)
      );
    }

    this.filteredStudents = filtered;
    this.totalRecords = filtered.length;
  }

  onPageChange(event: any) {
    this.pageSize = event.rows;
    this.currentPage = (event.first / event.rows) + 1;
    this.loadData();
  }

  editStudent(student: any) {
    this.router.navigate(['/peoples/students/student-details', student.person.objectId]);
  }

  confirmDelete(student: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this student?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteStudent(student)
    });
  }

  async deleteStudent(student: any) {
    try {
      // Implement your delete logic here
      // await this.studentService.delete(student.objectId);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Student deleted successfully',
        life: 3000
      });
      this.loadData();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete student',
        life: 3000
      });
    }
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    this.error = error.message || 'An error occurred';
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: this.error ?? undefined,
      life: 5000
    });
  }
}
