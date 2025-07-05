import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import Parse from 'parse';
import {
  ConfirmationService,
  MessageService,
} from 'primeng/api';

import { LoginService } from '../../../../auth/services/login.service';
import {
  getCurrentAcademicYear,
} from '../../../../services/statefull/genericParse';
import { UtilsService } from '../../../../services/utilis.service';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-student-attendance',
    templateUrl: './student-attendance.component.html',
    styleUrl: './student-attendance.component.scss',
    standalone: false
})
export class StudentAttendanceComponent {
  public routes = routes;
  // pagination variables
  public tableData: Array<any> = [];
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<any>;
  public searchDataValue = '';
  public tableDataCopy: Array<any> = [];
  public actualData: Array<any> = [];
  //** pagination variables
  initChecked = false;

   idParam: string = '';
  filteredStudents: any[] = [];
  sections: any[] = [];
  classes: any[] = [];
  classRooms: any[] = [];
  classroomArray: any[] = [];
  sexes: any[] = [];
  academicYear: any = {};
  currentPerson: any = {};
  person: any = {};
  totalRecords = 0;
  loading = true;
  error: string | null = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private loginService: LoginService
  ) {
    this.loading = true;
    this.error = null;
    this.initializeData()
  }

  // private getTableData(pageOption: pageSelection): void {
  //   this.data.getStudentAttendance().subscribe((apiRes: apiResultFormat) => {
  //     this.tableData = [];
  //     this.tableDataCopy = [];
  //     this.serialNumberArray = [];
  //     this.totalData = apiRes.totalData;
  //     apiRes.data.map((res: studentAttendance, index: number) => {
  //       const serialNumber = index + 1;
  //       if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
  //         res.id = serialNumber;
  //         this.tableData.push(res);
  //         this.serialNumberArray.push(serialNumber);
  //         this.tableDataCopy.push(res);
  //       }
  //     });
  //     this.dataSource = new MatTableDataSource<studentAttendance>(this.actualData);
  //     this.pagination.calculatePageSize.next({
  //       totalData: this.totalData,
  //       pageSize: this.pageSize,
  //       tableData: this.tableData,
  //       tableDataCopy: this.tableDataCopy,
  //       serialNumberArray: this.serialNumberArray,
  //     });
  //   });
  // }

  private async initializeData(): Promise<void> {
      const [person, sections, academicYear] = await Promise.all([
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
      this.getTableData(0);
    }
  async getTableData(currentPage: number): Promise<void> {
    try {
      console.log('this.currentPerson this.currentPerson ', this.currentPerson)
      this.idParam = this.route.snapshot.paramMap.get('id') || '';
      const includes = ['person', 'person.gender', 'classroom', 'classroom.classe', 'classroom.classe.section', 'person.section']
      
      
      
      let queries: any = []
      if(this.currentPerson?.user?.role?.task_name === "enseignant"){
        const queriesQ = ['teacherChief', 'teacherSecond'].map((k: string) => {
        const q = new Parse.Query('Classroom')
        q.equalTo(k, {"__type": "Pointer", "className": "Person" , "objectId": this.currentPerson?.objectId})
        return q
      })
      const query = Parse.Query.or(...queriesQ);
      const result = await query.find()
      console.log('Classroom Classroom Classroom Classroom ', result)
        this.classroomArray = result
        queries = result.map((classr: any) => {
          const q = new Parse.Query('Enrollment')
          q.equalTo('classroom', classr)
          return q
        })
      }
      const mainQuery = this.classroomArray.length && this.currentPerson?.user?.role?.task_name === "enseignant" ? Parse.Query.or(...queries) : new Parse.Query('Enrollment');
      includes.forEach(include => {
        mainQuery.include(include)
      });
      if(this.currentPerson?.user?.role?.task_name !== "enseignant"){
        mainQuery.equalTo("institution", {"__type": "Pointer", "className": "Institution" , "objectId": this.idParam == '' ? this.currentPerson?.institution?.objectId : this.idParam})
      }
      // mainQuery.equalTo("academicYear", {"__type": "Pointer", "className": "AcademicYear" , "objectId": this.academicYear?.objectId})
      mainQuery.equalTo("isValid", true)
      const results = await mainQuery.find()   
      const json = results?.map(r => r?.toJSON()).map(d => ({
        note: null,
        ...d 
      }))
      console.log('DATAT DATAT DATAT DTA =>>>> ', results?.map(r => r?.toJSON()))
      // const requestConfig: any = {
      //   T: 'Enrollment',
      //   includes: ['person', 'person.gender', 'classroom', 'classroom.classe', 'classroom.classe.section', 'person.section'],
      //   currentPage: currentPage,
      //   filters: {
      //     academicYear: {
      //       className: 'AcademicYear',
      //       objectId: this.academicYear?.objectId
      //     },
      //     institution: {
      //       className: 'Institution',
      //       objectId: this.idParam == '' ? this.currentPerson?.institution?.objectId : this.idParam
      //     },
      //     isValid: true
      //   },
      // };
      // const res: any = await globalGet(requestConfig);

      // if (res?.error) {
      //   throw new Error(res.message);
      // }
      // console.log('STudent => ', res)
      this.tableData = json // res || [];
      this.filteredStudents = [...this.tableData];
      this.totalRecords = json?.length//res?.count || res?.length || 0;
    } catch (error) {
      throw error;
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
  handleOptionChange(objectId: string, value: string) {
    const item = this.tableData.find(d => d.objectId === objectId);
    const today = new Date();
    if (item) {
      console.log(' item item item item ', item)
      if(value !== 'Transferer'){
        const options: any = {
        "to": "wilfriedinfo85@gmail.com",
        "subject": "SUIVI SCOLAIRE DE VOS ENFANTS ",
        "html": "<h3 ><b>MINEDUB/I-CAMSCHOOL</b>: chers parents nous vous informons que votre enfant {{enfantName}} est {{status}} dans notre etablissement aujourd'hui {{dateDuJour}}.</h3>",
        "data": {
          status: value,
          enfantName: item.person?.firstName + " "+ item.person?.lastName,
          dateDuJour: today.toLocaleDateString()
        }
      }
      if(item.note){
        options.data.note = item.note
        options.html =  + "<p>{{note}}</p>"
      }
      Parse.Cloud.run('sendEmail', {...options}).then(r => {
        console.log('sendEmail ', r)
      })
      }

      item.attendance = value;
    }
  }
}
