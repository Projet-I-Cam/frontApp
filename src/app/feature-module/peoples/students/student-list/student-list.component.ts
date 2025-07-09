// student-list.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Parse from 'parse';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { LoginService } from '../../../../auth/services/login.service';
import { getCurrentAcademicYear } from '../../../../services/statefull/genericParse';
import { globalGet } from '../../../../services/statefull/http';
import { UtilsService } from '../../../../services/utilis.service';
import { routes } from '../../../../shared/routes/routes';

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
  classroomArray: any[] = [];
  sexes: any[] = [];
  academicYear: any = {};
  currentPerson: any = {};
  person: any = {};

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

  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  dropdownVisible = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

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
      console.log('this.currentPerson?.user =================> ', this.currentPerson, this.currentPerson?.user?.task_name)
      if(this.currentPerson?.user?.role?.task_name === "enseignant"){
        const queries = ['teacherChief', 'teacherSecond'].map((k: string) => {
          const q = new Parse.Query('Classroom')
          q.equalTo(k, {"__type": "Pointer", "className": "Person" , "objectId": this.currentPerson?.objectId})
          return q
        })
        const query = Parse.Query.or(...queries);
        const result = await query.find()
        console.log('Classroom Classroom Classroom Classroom 1', result)
        this.classroomArray = result
      }
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
      console.log('this.currentPerson this.currentPerson ', this.currentPerson)
      this.idParam = this.route.snapshot.paramMap.get('id') || '';
      const includes = ['person', 'person.gender', 'classroom', 'classroom.classe', 'classroom.classe.section', 'person.section']
      const classesR = this.classroomArray
      let queries: any = []
      if(classesR.length && this.currentPerson?.user?.role?.task_name === "enseignant"){
        queries = classesR.map((classr: any) => {
          const q = new Parse.Query('Enrollment')
          q.equalTo('classroom', classr)
          return q
        })
      } 
      const mainQuery = classesR.length && this.currentPerson?.user?.role?.task_name === "enseignant" ? Parse.Query.or(...queries) : new Parse.Query('Enrollment');
      includes.forEach(include => {
        mainQuery.include(include)
      });
      if(!classesR.length && this.currentPerson?.user?.role?.task_name !== "enseignant"){
        mainQuery.equalTo("institution", {"__type": "Pointer", "className": "Institution" , "objectId": this.idParam == '' ? this.currentPerson?.institution?.objectId : this.idParam})
      }
      mainQuery.equalTo("academicYear", {"__type": "Pointer", "className": "AcademicYear" , "objectId": this.academicYear?.objectId})
      mainQuery.equalTo("isValid", true)
      const results = await mainQuery.find()
      const json = results?.map(r => r?.toJSON())
      console.log('DATAT DATAT DATAT DTA =>>>> ', results?.map(r => r?.toJSON()))
      this.tableData = json // res || [];
      this.filteredStudents = [...this.tableData];
      this.totalRecords = json?.length//res?.count || res?.length || 0;
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

  printListStudent() {
    const printContents = document.getElementById('list-student-content')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // recharger pour restaurer l'état Angular
    }
  }

  // Fonction pour imprimer la liste des élèves
  printListStudentNoPic() {
    const printContents = document.getElementById('list-student-content-no-pic')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // recharger pour restaurer l'état Angular
    }
  }

}
