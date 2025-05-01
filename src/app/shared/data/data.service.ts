import { Injectable } from '@angular/core';
import { routes } from '../routes/routes';
import { Observable, map, from } from 'rxjs';
import { apiResultFormat } from '../model/pages.model';
import { LoginService } from '../../auth/services/login.service';
import { globalGet} from '../../services/statefull/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private loginService: LoginService) { }



  public getDataTable() {
    return this.http.get<apiResultFormat>('assets/json/data-tables.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getApproveRequest() {
    return this.http
      .get<apiResultFormat>('assets/json/approve-request.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getAcademicData() {
    return this.http
      .get<apiResultFormat>('assets/json/academic-data.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCites() {
    return this.http.get<apiResultFormat>('assets/json/cities.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getHolidays() {
    return this.http.get<apiResultFormat>('assets/json/holidays.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getGuardian() {
    return this.http
      .get<apiResultFormat>('assets/json/guardian-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getAttendanceReport() {
    return this.http
      .get<apiResultFormat>('assets/json/attendance-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getClass() {
    return this.http.get<apiResultFormat>('assets/json/classes.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBlogCategories() {
    return this.http
      .get<apiResultFormat>('assets/json/blog-categories.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getClassHomeWork() {
    return this.http
      .get<apiResultFormat>('assets/json/class-home-work.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getBlogComments() {
    return this.http
      .get<apiResultFormat>('assets/json/blog-comments.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTransportVechile() {
    return this.http
      .get<apiResultFormat>('assets/json/transport-vehicle.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTransportVechileDrivers() {
    return this.http
      .get<apiResultFormat>('assets/json/transport-vehicle-drivers.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getUsers() {
    return this.http.get<apiResultFormat>('assets/json/user.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getRolesPermission() {
    return this.http
      .get<apiResultFormat>('assets/json/roles-permission.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getBlogTags() {
    return this.http.get<apiResultFormat>('assets/json/blog-tags.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClassReport() {
    return this.http.get<apiResultFormat>('assets/json/class-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getContactMessages() {
    return this.http
      .get<apiResultFormat>('assets/json/contact-messages.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCountries2() {
    return this.http.get<apiResultFormat>('https://restcountries.com/v3.1/all').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getCountries() {
    return this.http.get<any>('assets/json/countries.json');
  }

  public getClassReportDate() {
    return this.http
      .get<apiResultFormat>('assets/json/class-report-data.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getDailyAttendance() {
    return this.http
      .get<apiResultFormat>('assets/json/daily-attendance.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getDeleteAccount() {
    return this.http
      .get<apiResultFormat>('assets/json/delete-account.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getDepartments() {
    return this.http.get<apiResultFormat>('assets/json/departments.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTransactionData() {
    return this.http
      .get<apiResultFormat>('assets/json/accounts_transactions_data.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getIncomeData() {
    return this.http
      .get<apiResultFormat>('assets/json/accountincome.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getInvoiceData() {
    return this.http
      .get<apiResultFormat>('assets/json/account_invoice.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getDesignation() {
    return this.http.get<apiResultFormat>('assets/json/designation.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClassRoom() {
    return this.http.get<apiResultFormat>('assets/json/class_room.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getHostelRoom() {
    return this.http.get<apiResultFormat>('assets/json/hostel-room.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClassSyllabus() {
    return this.http
      .get<apiResultFormat>('assets/json/class_syllabus.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getFeesGroup() {
    return this.http.get<apiResultFormat>('assets/json/fees-group.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClassSubject() {
    return this.http
      .get<apiResultFormat>('assets/json/class_subject.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getHostelRoomType() {
    return this.http
      .get<apiResultFormat>('assets/json/hostel-room-type.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getClassSection() {
    return this.http
      .get<apiResultFormat>('assets/json/class_section.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getFeesMaster() {
    return this.http.get<apiResultFormat>('assets/json/fees-master.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClassRoutine() {
    return this.http
      .get<apiResultFormat>('assets/json/class_routine.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getHostelList() {
    return this.http.get<apiResultFormat>('assets/json/hostel-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFeesReport() {
    return this.http.get<apiResultFormat>('assets/json/fees-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFeesType() {
    return this.http.get<apiResultFormat>('assets/json/fees-type.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getGrade() {
    return this.http.get<apiResultFormat>('assets/json/grade.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFeesCollect() {
    return this.http.get<apiResultFormat>('assets/json/collect_fees.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getGradeReport() {
    return this.http.get<apiResultFormat>('assets/json/grade-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getParentList2() {    
    return this.http.get<apiResultFormat>('assets/json/parents-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public async getGender(): Promise<any> {  
    
    const result = await globalGet({
      T: 'Gender',
      filters: {},
      includes: [],
      curentPage: 1,
      size: undefined,
    });

    const parsedResults = result.map((element: any) => this.parseGender(element));
    //console.log("from service", parsedResults);
    return parsedResults;
  }

  public parseGender(element: any): any{
    return {
      objectId: element.objectId,
      tag: element.slug,
      libelle_fr: element.libelle_fr,
      libelle_en: element.libelle_en
    };
  }


  public async getParentList(): Promise<apiResultFormat> {

    const data: any = await globalGet({
      T: 'Person',
      filters: {'isParent':true},
      includes: ['gender', 'user', 'municipality'],
      curentPage: 1,
      size: undefined, 
    });
  //console.log("depuis le service", data);
    if (!data) {
      console.error('Error fetching parent list:', data);
      return {
        data: [],
        totalData: 0
      };
    }else{
      return {
        data: data,
        totalData: data.length 
      } as apiResultFormat;
    }
  }

  public async getAnneeList(): Promise<apiResultFormat> {

    const data: any = await globalGet({
      T: 'AcademicYear',
      curentPage: 1,
      size: undefined, 
    });
  //console.log("depuis le service", data);
    if (!data) {
      console.error('Error fetching academic year list:', data);
      return {
        data: [],
        totalData: 0
      };
    }else{
      return {
        data: data,
        totalData: data.length 
      } as apiResultFormat;
    }
  }

  public async getEducationTypes(): Promise<apiResultFormat> {

    const data: any = await globalGet({
      T: 'EducationType',
      curentPage: 1,
      size: undefined, 
    });
  //console.log("depuis le service", data);
    if (!data) {
      console.error('Error fetching academic year list:', data);
      return {
        data: [],
        totalData: 0
      };
    }else{
      return {
        data: data,
        totalData: data.length 
      } as apiResultFormat;
    }
  }

  public async getStudents(): Promise<any> {

    const data =  await globalGet({
      T: 'Person',
      filters: {'isStudent':true},
      includes: ['gender', 'user', 'municipality'],
      curentPage: 1,
      size: undefined, 
      selects: ['objectId', 'firstName', 'lastName']
    });

    return data;
    
  }


  public getMembershipTransactions() {
    return this.http
      .get<apiResultFormat>('assets/json/membership-transactions.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPayroll() {
    return this.http.get<apiResultFormat>('assets/json/payroll.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPlayers() {
    return this.http.get<apiResultFormat>('assets/json/players.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPermission() {
    return this.http.get<apiResultFormat>('assets/json/permission.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPages() {
    return this.http.get<apiResultFormat>('assets/json/pages.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFaqData() {
    return this.http.get<apiResultFormat>('assets/json/faq.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStates() {
    return this.http.get<apiResultFormat>('assets/json/states.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSports() {
    return this.http.get<apiResultFormat>('assets/json/sports.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffAttendance() {
    return this.http
      .get<apiResultFormat>('assets/json/staff-attendance.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getFeesAssignData() {
    return this.http.get<apiResultFormat>('assets/json/assign_fees.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffDayWise() {
    return this.http
      .get<apiResultFormat>('assets/json/staff-day-wise.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getstudentLeaveAttendance() {
    return this.http
      .get<apiResultFormat>('assets/json/studentLeaveAttendance.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getStudentDayWise() {
    return this.http
      .get<apiResultFormat>('assets/json/studentDayWiseData.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getExpenceData() {
    return this.http.get<apiResultFormat>('assets/json/expense_data.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFeesRecord() {
    return this.http.get<apiResultFormat>('assets/json/studentfeesRecord.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffLeaves() {
    return this.http.get<apiResultFormat>('assets/json/staff-leaves.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffPayroll() {
    return this.http
      .get<apiResultFormat>('assets/json/staff-payroll.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getExpenceCategoryData() {
    return this.http
      .get<apiResultFormat>('assets/json/expenses_category_data.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getExamAttedance() {
    return this.http
      .get<apiResultFormat>('assets/json/exam_attendance.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getExamResult() {
    return this.http.get<apiResultFormat>('assets/json/exam-result.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExamSchedule() {
    return this.http
      .get<apiResultFormat>('assets/json/exam_schedule.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getExamData() {
    return this.http.get<apiResultFormat>('assets/json/exam.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLanguageData() {
    return this.http.get<apiResultFormat>('assets/json/language.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLibraryMemberList() {
    return this.http
      .get<apiResultFormat>('assets/json/libraryMemberList.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getBookIssueList() {
    return this.http
      .get<apiResultFormat>('assets/json/bookIssueList.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getBookList() {
    return this.http.get<apiResultFormat>('assets/json/bookList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getListLeaves() {
    return this.http.get<apiResultFormat>('assets/json/list_leaves.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLeaveReport() {
    return this.http
      .get<apiResultFormat>('assets/json/leave_report_data.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getStudentReports() {
    return this.http
      .get<apiResultFormat>('assets/json/student_reports.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTeacherAttendance() {
    return this.http
      .get<apiResultFormat>('assets/json/teacher-attendance.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getScheduleClass() {
    return this.http
      .get<apiResultFormat>('assets/json/scheduleClass.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getStaffList() {
    return this.http.get<apiResultFormat>('assets/json/staff.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStudentAttendnceType() {
    return this.http
      .get<apiResultFormat>('assets/json/student-attendance-type.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getStaffsAttendance() {
    return this.http
      .get<apiResultFormat>('assets/json/staffs-attendance.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getStaffReport() {
    return this.http.get<apiResultFormat>('assets/json/staff-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStudentAttendance() {
    return this.http
      .get<apiResultFormat>('assets/json/student-attendance.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTeacherDayWise() {
    return this.http
      .get<apiResultFormat>('assets/json/teacher-day-wise.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTransportVehicle() {
    return this.http
      .get<apiResultFormat>('assets/json/transport-assign-vehicle.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTransportPickupPoints() {
    return this.http
      .get<apiResultFormat>('assets/json/transport-pickup-points.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTeacherLeaves() {
    return this.http
      .get<apiResultFormat>('assets/json/teacher-leaves.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTeacherReport() {
    return this.http
      .get<apiResultFormat>('assets/json/teacher-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTeachersList() {
    return this.http
      .get<apiResultFormat>('assets/json/teachers-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTeacherSalary() {
    return this.http
      .get<apiResultFormat>('assets/json/teacher-salary.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTestimonials() {
    return this.http.get<apiResultFormat>('assets/json/testimonials.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTransportRoutes() {
    return this.http
      .get<apiResultFormat>('assets/json/transport-routes.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getStudent() {
    return this.http
      .get<apiResultFormat>('assets/json/student-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getFile(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/files.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getCallHistory(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/call-history.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSideBarData(): Array<any>{
    if(this.loginService.isLoggedIn()){
      const user = this.loginService.getUser();
      const role = user?.role?.task_name || 'admin';
      console.log( 'the user role is' , role);
      if((role === 'etablissement')){
        return this.AdminSchoolSidebarData;
      }else if(role === 'enseignant'){
        return this.TeacherSidebarData;
      }else if(role === 'parent'){
        return this.ParentSidebarData;
      }
      else if(role === 'regional' || role === 'departemental' || role === 'arrondissement' || role === 'administration'){
        return this.AdminSidebarData;
      }
      return this.AdminSidebarData; // Par défaut, retourner le sidebar admin
    }
    return this.sidebarData1;
  }

  public sidebarData1 = [
    {
      tittle: 'Main',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: false,
      base: '',
      page: '99',
      menu: [
        {
          menuValue: 'Dashboard',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'layout-2',
          base: 'dashboard',
          page: '1',
          subMenus: [
            {
              menuValue: 'Admin Dashboard',
              route: routes.adminDashboard,
              page: 'index',
            },
          ],
        },
        {
          menuValue: 'Application',
          hasSubRouteTwo: true,
          showSubRoute: false,
          base: 'application',
          icon: 'layout-list',
          page: '19',
          subMenus: [
            {
              menuValue: 'Chat',
              route: routes.chat,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Call',
              route: routes.audioCall,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },

            {
              menuValue: 'Calendar',
              route: routes.calendar,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Email',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.email,
              customSubmenuTwo: false,
              subRoutes: [],
            },
            {
              menuValue: 'To Do',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.toDo,
              customSubmenuTwo: false,
              subRoutes: [],
            },
            {
              menuValue: 'Notes',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.notes,
              customSubmenuTwo: false,
              subRoutes: [],
            },
            {
              menuValue: 'File Manager',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.fileManager,
              customSubmenuTwo: false,
              subRoutes: [],
            },
          ],
        },
      ],
    },
    {
      tittle: 'Layout',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: true,
      base: '',
      page: '9',

      menu: [
        {
          menuValue: 'Default',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.layoutDefault,
          customSubmenuTwo: false,
          icon: 'layout-sidebar',
          base: 'layout-default',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          subRoutes: [],
        },
        {
          menuValue: 'Mini',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.layoutMini,
          customSubmenuTwo: false,
          icon: 'layout-align-left',
          base: 'layout-mini',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          subRoutes: [],
        },
        {
          menuValue: 'RTL',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.layoutRtl,
          customSubmenuTwo: false,
          icon: 'text-direction-rtl',
          base: 'layout-rtl',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          subRoutes: [],
        },
        {
          menuValue: 'Box',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.layoutBox,
          customSubmenuTwo: false,
          base: 'layout-box',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          icon: 'layout-distribute-vertical',
          subRoutes: [],
        },
        {
          menuValue: 'Dark',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.layoutDark,
          customSubmenuTwo: false,
          base: 'layout-dark',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          icon: 'moon',
          subRoutes: [],
        },
      ],
    },
    {
      tittle: 'Peoples',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: true,
      base: 'peoples',
      menu: [
        {
          menuValue: 'Élèves',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'school',
          page: 'students',

          subMenus: [
            {
              menuValue: 'All Students',
              route: routes.studentsGrid,
              // page1: 'add-student',

            },
            {
              menuValue: 'Students List',
              route: '/peoples/students/student-grid',
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Transfert d\'Élève',
              route: routes.studentTransfer,
            },
            {
              menuValue: 'Student Promotion',
              route: routes.studentPromotion,

            },
          ],
        },
        {
          menuValue: 'Parents',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user-bolt',
          page: 'parents',
          subMenus: [
            {
              menuValue: 'Tous les parents',
              route: routes.parentGrid,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Liste des parents',
              route: routes.parentList,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Guardians',
          hasSubRoute: true,
          showSubRoute: false,
          page: 'guardians',
          icon: 'user-shield',
          subMenus: [
            {
              menuValue: 'All Guardians',
              route: routes.guardiansGrid,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Guardian List',
              route: routes.guardiansList,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
          ],
        },
        {
          menuValue: 'Teachers',
          hasSubRoute: true,
          showSubRoute: false,
          page: 'teachers',
          icon: 'fas fa-chalkboard-teacher',
          subMenus: [
            {
              menuValue: 'Teachers List',
              route: routes.teachersList,
              parentMenuValue: 'Teachers',
            },
            {
              menuValue: 'Add Teacher',
              route: routes.addTeacher,
              parentMenuValue: 'Teachers',
            },
            {
              menuValue: 'Teachers Assignments',
              route: routes.teacherAssignments,
              parentMenuValue: 'Teachers',
            }
          ],
        },
      ],
    },
    {
      tittle: 'Academic',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: false,
      menu: [
        {
          menuValue: 'Classes',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'school-bell',
          page: 'classes',
          subMenus: [
            {
              menuValue: 'All Classes',
              route: routes.classes,
            },
            {
              menuValue: 'Schedule',
              route: routes.scheduleClasses,
            },
          ],
        },
        {
          menuValue: 'Salle de Classe',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'building',
          route: routes.classRoom,
          base: 'class-room',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          customSubmenuTwo: false,
          subRoutes: [],
        },

          ],
        },
        {
          menuValue: 'Fees Collection',
          page: 'fees-collection',
          icon: 'report-money',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Fees Group',
              icon: 'package',
              route: routes.feesGroup,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Fees Type',
              icon: 'clipboard',
              route: routes.feesType,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Fees Master',
              icon: 'truck',
              route: routes.feesMaster,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Fees Assign',
              icon: 'truck',
              route: routes.feesAssign,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Collect Fees',
              icon: 'truck',
              route: routes.collectFees,
              base: 'collect-fees',
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },


  ];
  
  public ParentSidebarData = [
    {

      tittle: 'Main',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: false,
      base: '',
      page: '99',
      menu: [
        {
          menuValue: 'Dashboard',
          icon: 'layout-2',
          base: 'dashboard',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.adminDashboard,
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          customSubmenuTwo: false,
          subRoutes: [],
        },
      ],
    },
    {
      tittle: 'Peoples',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: true,
      base: 'peoples',
      menu: [
        {
          menuValue: 'Mes enfants.',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'school',
          page: 'students',

          subMenus: [
            {
              menuValue: 'informations médicales',
              route: routes.studentList,
            },
            {
              menuValue: 'notes / Bulletins',
              route: routes.studentPromotion,
            },
            {
              menuValue: 'programme des cours',
              route: routes.studentTransfer,
            },
            {
              menuValue: 'devoirs',
              route: routes.studentReportCard,
            },

            {
              menuValue: ' contrôles ou examen',
              route: routes.studentReportCard,
            },
            {
              menuValue: 'présence / absentéisme',
              route: routes.studentReportCard,
            },
            {
              menuValue: 'personne à contacter ',
              route: routes.studentReportCard,
            },
            {
              menuValue: 'Etat de paiements',
              route: routes.studentReportCard,
            },
          ],
        },
        {
          menuValue: 'Gestion du personelle',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user-bolt',
          page: 'parents',
          subMenus: [
            {
              menuValue: 'Faire une correspondance ',
              route: routes.parentGrid,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Consultation CV et Performance',
              route: routes.parentList,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Classe',
          hasSubRoute: true,
          showSubRoute: false,
          page: 'guardians',
          icon: 'user-shield',
          subMenus: [
            {
              menuValue: 'Statistique',
              route: routes.guardiansGrid,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Progression des cours',
              route: routes.guardiansList,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
          ],
        },
        {
          menuValue: 'Etablissement',
          hasSubRoute: true,
          showSubRoute: false,
          page: 'teachers',
          icon: 'fas fa-chalkboard-teacher',
          subMenus: [
            {
              menuValue: 'Consulter Fiche Etablissement ',
              route: routes.teachersList,
              parentMenuValue: 'Teachers',
            },
            {
              menuValue: 'Add Teacher',
              route: routes.addTeacher,
              parentMenuValue: 'Teachers',
            },
            {
              menuValue: 'Teachers Assignments',
              route: routes.teacherAssignments,
              parentMenuValue: 'Teachers',
            }
          ],
        },
        {
          menuValue: 'Planning',
          base: 'website-settings',
          icon: 'world-cog',
          hasSubRoute: true,
          showSubRoute: false,
          page: '22',
          subMenus: [
            {
              menuValue: 'Réunion des parents ',
              route: routes.companySettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Autres activités et jour férié',
              route: routes.localization,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },


      ],
    },



  ];

  public TeacherSidebarData = [
    {
      tittle: 'Main',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: false,
      base: '',
      page: '99',
      menu: [
        {
          menuValue: 'Dashboard',
          icon: 'layout-2',
          base: 'dashboard',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.adminDashboard,
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          customSubmenuTwo: false,
          subRoutes: [],
        },
      ],
    },
    {
      tittle: 'Peoples',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: true,
      base: 'peoples',
      menu: [
        {
          menuValue: 'Mes Classes',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'school',
          page: 'students',

          subMenus: [
            {
              menuValue: 'Fiche Classe',
              route: routes.studentList,
            },
            // Commented out Liste des élèves entry
            /* {
              menuValue: 'Liste des élèves',
              route: routes.studentPromotion,
            }, */
            {
              menuValue: 'programme des cours',
              route: routes.studentTransfer,
            },
            {
              menuValue: 'devoirs',
              route: routes.studentReportCard,
            },

            {
              menuValue: 'contrôles ou examen',
              route: routes.studentReportCard,
            },
            {
              menuValue: 'présence / absentéisme',
              route: routes.studentReportCard,
            },
          ],
        },
        {
          menuValue: 'Notes',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user-bolt',
          page: 'parents',
          subMenus: [
            {
              menuValue: 'Saisie des Notes ',
              route: routes.gradeEntry,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Calcul des Moyennes',
              route:routes.gradeCalculation,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Bulletins Scolaires',
              route: routes.reportCard,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Devoir / Homework ',
          hasSubRoute: true,
          showSubRoute: false,
          page: 'guardians',
          icon: 'user-shield',
          subMenus: [
            {
              menuValue: 'Statistique',
              route: routes.guardiansGrid,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Progression des cours',
              route: routes.guardiansList,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
          ],
        },
        {
          menuValue: 'Mes Documents',
          hasSubRoute: true,
          showSubRoute: false,
          page: 'teachers',
          icon: 'fas fa-chalkboard-teacher',
          subMenus: [
            {
              menuValue: 'Présences effectives / Prise de service',
              route: routes.addTeacher,
              parentMenuValue: 'Teachers',
            },
            {
              menuValue: 'Demande de Congé / Permission',
              route: routes.addTeacher,
              parentMenuValue: 'Teachers',
            },
            {
              menuValue: 'Consulter Fiche Etablissement ',
              route: routes.teachersList,
              parentMenuValue: 'Teachers',
            },
            {
              menuValue: 'Correspondance au Directeur',
              route: routes.addTeacher,
              parentMenuValue: 'Teachers',
            },
          ],
        },
        {
          menuValue: 'Planning',
          base: 'website-settings',
          icon: 'world-cog',
          hasSubRoute: true,
          showSubRoute: false,
          page: '22',
          subMenus: [
            {
              menuValue: 'Réunion des parents ',
              route: routes.companySettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Autres activités et jour férié',
              route: routes.localization,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },


      ],
    },



  ];

  public videocall = [
    {
      img: 'assets/img/users/user-01.jpg',
      name: 'Barbara',
    },
    {
      img: 'assets/img/users/user-02.jpg',
      name: 'Linnea',
    },
    {
      img: 'assets/img/users/user-05.jpg',
      name: 'Richard',
    },
    {
      img: 'assets/img/users/user-03.jpg',
      name: 'Freda',
    },
  ];

  public getMenuItems(): Array<any> {
    return [
      // ... existing items ...
      {
        menuValue: 'Teachers',
        route: routes.teachersList,
      hasSubRoute: true,
      showSubRoute: false,
        page: 'teachers',
        icon: 'fas fa-chalkboard-teacher',
      subMenus: [
        {
            menuValue: 'Teachers List',
            route: routes.teachersList,
            parentMenuValue: 'Teachers',
          },
          {
            menuValue: 'Add Teacher',
            route: routes.addTeacher,
            parentMenuValue: 'Teachers',
          },
          {
            menuValue: 'Teachers Assignments',
            route: routes.teacherAssignments,
            parentMenuValue: 'Teachers',
          }
        ],
      },
      // ... more menu items ...
    ];
  }

  public AdminSidebarData: Array<any> = [
    {
      tittle: 'Main',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: false,
      base: '',
      page: '99',
      menu: [
        {
          menuValue: 'Dashboard',
          icon: 'layout-2',
          base: 'dashboard',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.adminDashboard,
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          customSubmenuTwo: false,
          subRoutes: [],
        },
      ],
    },
    {
      tittle: 'Peoples',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: true,
      base: 'Administration Centrale',
      menu: [
        {
          menuValue: 'Division Administratif',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'school',
          page: '',

          subMenus: [
            {
              menuValue: 'Regions',
              route: routes.regionsList,
            },
            {
              menuValue: 'Departments',
              route: routes.departmentsList,
            },
            {
              menuValue: 'Municipalities',
              route: routes.municipalitiesList,
            },
          ],
        },
        {
          menuValue: 'Institutions',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'building',
          page: 'institutions',
          subMenus: [
            {
              menuValue: 'Institutions',
              route: '/peoples/institutions/institutions-list',
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Institutions Types',
              route: routes.classSection,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Sections',
              route: routes.classSection,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },

            {
              menuValue: 'Director',
              route: routes.classSection,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Années académiques',
              route: routes.academicYear,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: "Types d'enseignements",
              route: routes.educationType,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Staffs',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user-bolt',
          page: 'parents',
          subMenus: [
            {
              menuValue: 'Staffs',
              route: routes.parentGrid,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Function',
              route: routes.parentList,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Assignments',
              route: routes.parentList,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },

          ],
        },

      ],
    },
  ];

  public AdminSchoolSidebarData: Array<any> = [
    {
      tittle: 'Main',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: false,
      base: '',
      page: '99',
      menu: [
        {
          menuValue: 'Dashboard',
          icon: 'layout-2',
          base: 'dashboard',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.adminDashboard,
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          customSubmenuTwo: false,
          subRoutes: [],
        },
      ],
    },
    {
      tittle: 'Peoples',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: true,
      base: 'peoples',
      menu: [
        {
          menuValue: 'Élèves',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'school',
          page: 'students',

          subMenus: [
            {
              menuValue: 'Liste des Élèves',
              route: routes.studentsList,
            },
            {
              menuValue: 'Promotion d\'Élèves',
              route: routes.studentPromotion,
            },
            {
              menuValue: 'Transfert d\'Élève',
              route: routes.studentTransfer,
            },
            {
              menuValue: 'Bulletin de notes',
              route: routes.studentReportCard,
            },
          ],
        },
        {
          menuValue: 'Teachers',
          hasSubRoute: true,
          showSubRoute: false,
          page: 'teachers',
          icon: 'fas fa-chalkboard-teacher',
          subMenus: [
            {
              menuValue: 'Teachers List',
              route: routes.teachersList,
              parentMenuValue: 'Teachers',
            },
            {
              menuValue: 'Add Teacher',
              route: routes.addTeacher,
              parentMenuValue: 'Teachers',
            },
            {
              menuValue: 'Teachers Assignments',
              route: routes.teacherAssignments,
              parentMenuValue: 'Teachers',
            }
          ],
        },
        {
          menuValue: 'Parents',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user-bolt',
          page: 'parents',
          subMenus: [
            {
              menuValue: 'Tous les parents',
              route: routes.parentGrid,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Liste des parents',
              route: routes.parentList,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Students',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'users',
          page: 'students',
          subMenus: [
            // Commented out All Students entry
            /* {
              menuValue: 'All Students',
              route: '/peoples/students/student-grid',
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            }, */
            {
              menuValue: 'Students List',
              route: '/peoples/students/student-grid',
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Add Student',
              route: '/peoples/students/add-student',
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },

      ],
    },

  ];
}
