import { Injectable } from '@angular/core';
import { routes } from '../routes/routes';
import { Observable, map, from } from 'rxjs';
import { apiResultFormat } from '../model/pages.model';
import { LoginService } from '../../auth/services/login.service';
import { globalGet } from '../../services/statefull/http';
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

  public getSmileys() {
    return this.http.get<any>('assets/json/smileys-appreciation.json');
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

  public async getAnneeList(): Promise<apiResultFormat> {
    return {
      data: [],
      totalData: 0
    } as apiResultFormat;
  }

  public async getEducationTypes(): Promise<apiResultFormat> {
    return {
      data: [],
      totalData: 0
    } as apiResultFormat;
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

  public async getCoteList(): Promise<apiResultFormat> {
    return {
      data: [],
      totalData: 0
    } as apiResultFormat;
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

  public parseGender(element: any): any {
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
      filters: { 'isParent': true },
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

  public async getClassRoomList(): Promise<apiResultFormat> {

    const data: any = await globalGet({
      T: 'Classroom',
      filters: {},
      includes: [],
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
  public getSideBarData(): Array<any> {
    if (this.loginService.isLoggedIn()) {
      const user = this.loginService.getUser();
      const role = user?.role?.task_name || 'admin';
      console.log('the user role is', role);
      if ((role === 'etablissement')) {
        return this.AdminSchoolSidebarData;
      } else if (role === 'enseignant') {
        return this.TeacherSidebarData;
      } else if (role === 'parent') {
        return this.ParentSidebarData;
      }
      else if (role === 'regional' || role === 'departemental' || role === 'arrondissement' || role === 'administration') {
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
      title: 'Tableau de bord',
      showAsTab: false,
      menu: [
        {
          menuValue: 'Tableau de bord',
          icon: 'layout-2',
          route: routes.adminDashboard,
          hasSubRoute: false
        }
      ]
    },
    {
      title: 'Gestion pédagogique',
      showAsTab: false,
      menu: [
        {
          menuValue: 'Ma classe',
          icon: 'school',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Fiche classe', route: routes.studentList },
            { menuValue: 'Liste des élèves', route: '' },
            { menuValue: 'Modifier informations', route: '' },
            { menuValue: 'Programme des cours', route: routes.studentTransfer },
            { menuValue: 'Projet pédagogique', route: '' },
            { menuValue: 'Absences', route: routes.studentReportCard },
            { menuValue: 'Discipline', route: routes.studentReportCard }
          ]
        },
        {
          menuValue: 'Notes',
          icon: 'notes',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Saisie des notes', route: routes.gradeEntry },
            { menuValue: 'Relevé de notes', route: '' },
            { menuValue: 'Traitement des notes', route: '' },
            { menuValue: 'Calcul des moyennes', route: routes.gradeCalculation },
            { menuValue: 'Bulletins', route: routes.reportCard },
            { menuValue: 'Livret scolaire', route: '' }
          ]
        },
        {
          menuValue: 'Devoirs',
          icon: 'book',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Statistiques', route: routes.guardiansGrid },
            { menuValue: 'Progression', route: routes.guardiansList },
            { menuValue: 'Exercices', route: routes.studentReportCard },
            { menuValue: 'Contrôles/Examens', route: routes.studentReportCard }
          ]
        }
      ]
    },
    {
      title: 'Activités',
      showAsTab: false,
      menu: [
        {
          menuValue: 'Planning',
          icon: 'calendar',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Emploi du temps', route: '' },
            { menuValue: 'Réunion parents', route: routes.companySettings },
            { menuValue: 'Activités extrascolaires', route: '' },
            { menuValue: 'Jours sans cours', route: routes.localization },
            { menuValue: 'Carrefours pédagogiques', route: '' }
          ]
        }
      ]
    },
    {
      title: 'Documents',
      showAsTab: false,
      menu: [
        {
          menuValue: 'Mes documents',
          icon: 'folder',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Attestation présence', route: routes.addTeacher },
            { menuValue: 'Demande congé', route: routes.addTeacher },
            { menuValue: 'Permission absence', route: '' },
            { menuValue: 'Attestation service', route: '' },
            { menuValue: 'CV', route: '' },
            { menuValue: 'Fiche établissement', route: routes.teachersList }
          ]
        },
        {
          menuValue: 'Rapports',
          icon: 'file-chart-line',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Générer', route: '' },
            { menuValue: 'Modifier', route: '' },
            { menuValue: 'Imprimer', route: '' }
          ]
        }
      ]
    },
    {
      title: 'Communication',
      showAsTab: false,
      menu: [
        {
          menuValue: 'Communication',
          icon: 'comments',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Direction', route: routes.addTeacher },
            { menuValue: 'Parents', route: '' },
            { menuValue: 'Élèves', route: '' }
          ]
        },
        {
          menuValue: 'Mon profil',
          icon: 'user-cog',
          route: '',
          hasSubRoute: false
        }
      ]
    }
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
        {
          menuValue: 'Annuaire téléphonique',
          hasSubRoute: false,
          showSubRoute: false,
          route: '',
          customSubmenuTwo: false,
          icon: 'phone',
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
          menuValue: 'Organigramme',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.adminDashboard,
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
      ],
    },
    {
      title: 'HELP',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Division Administrative',
          hasSubRouteThree: true,
          icon: 'menu-2',
          showSubRoute: false,
          page: 'division',
          subMenus: [
            {
              menuValue: 'Régions',
              route: routes.regionsList,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuThree: false,
            },
            {
              menuValue: 'Départements',
              route: routes.departmentsList,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuThree: false,
            },
            {
              menuValue: 'Municipalités',
              route: routes.municipalitiesList,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuThree: false,
            },
            {
              menuValue: 'Administration Centrale',
              hasSubRoute: true,
              showSubRoute: true,
              customSubmenuThree: true,
              page: 'centrale',
              subMenusTwo: [
                {
                  menuValue: 'Secrétariat Central',
                  route: '', // Add actual route if available
                  hasSubRoute: false,
                  showSubRoute: false,
                  customSubmenuFour: false,
                },
                {
                  menuValue: "Direction de l'Enseignement",
                  hasSubRoute: true,
                  showSubRoute: false,
                  customSubmenuFour: true,
                  subMenusThree: [
                    {
                      menuValue: 'Sous-Direction 1',
                      route: '', // Add actual route if available
                      hasSubRoute: false,
                      showSubRoute: false,
                      customSubmenuFour: false,
                    },
                    {
                      menuValue: 'Sous-Direction 2',
                      route: '', // Add actual route if available
                      hasSubRoute: false,
                      showSubRoute: false,
                      customSubmenuFour: false,
                    },
                  ],
                },
              ],
            },
            {
              menuValue: 'Administration Déconcentrée',
              hasSubRoute: true,
              showSubRoute: true,
              customSubmenuThree: true,
              page: 'non-central',
              subMenusTwo: [
                {
                  menuValue: 'Services Déconcentrés',
                  route: '', // Add actual route if available
                  hasSubRoute: false,
                  showSubRoute: false,
                  customSubmenuFour: false,
                },
                {
                  menuValue: 'Directions Régionales',
                  hasSubRoute: true,
                  showSubRoute: false,
                  customSubmenuFour: true,
                  page: 'regianale',
                  subMenusThree: [
                    {
                      menuValue: 'DREN 1',
                      route: '', // Add actual route if available
                      hasSubRoute: false,
                      showSubRoute: false,
                      customSubmenuFour: false,
                    },
                    {
                      menuValue: 'DREN 2',
                      route: '', // Add actual route if available
                      hasSubRoute: false,
                      showSubRoute: false,
                      customSubmenuFour: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Gestion du Personnel',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Gestion des Personnels',
          hasSubRouteThree: true,
          icon: 'peoples',
          showSubRoute: false,
          page: 'personnel',
          subMenus: [
            {
              menuValue: 'Liste du Personnel',
              route: 'peoples/minebase/staffs',
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuThree: false,
            },
            {
              menuValue: 'Documents Administratifs',
              hasSubRoute: true,
              showSubRoute: true,
              customSubmenuThree: true,
              page: 'document',
              subMenusTwo: [
                {
                  menuValue: 'Attestation de présence effective',
                  route: '', // Add actual route if available
                  hasSubRoute: false,
                  showSubRoute: false,
                  customSubmenuFour: false,
                },
                {
                  menuValue: "Permission d'absence",
                  route: '', // Add actual route if available
                  hasSubRoute: false,
                  showSubRoute: false,
                  customSubmenuFour: false,
                },
                {
                  menuValue: "Notification de congés",
                  route: '', // Add actual route if available
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
            {
              menuValue: "Côtes",
              route: routes.coteList,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
                  customSubmenuFour: false,
                },
                {
                  menuValue: "Attestation de service",
                  route: '', // Add actual route if available
                  hasSubRoute: false,
                  showSubRoute: false,
                  customSubmenuFour: false,
                },
                {
                  menuValue: "Attestation de cessation de service",
                  route: '', // Add actual route if available
                  hasSubRoute: false,
                  showSubRoute: false,
                  customSubmenuFour: false,
                },
                {
                  menuValue: "CV",
                  route: '', // Add actual route if available
                  hasSubRoute: false,
                  showSubRoute: false,
                  customSubmenuFour: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Gestion du staff',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Gestion des staffs',
          hasSubRouteThree: true,
          icon: 'peoples',
          showSubRoute: false,
          page: 'staff',
          subMenus: [
            {
              menuValue: 'Liste des staffs',
              route: 'peoples/minebase/staffs',
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuThree: false,
            },
            {
              menuValue: 'Documents Administratifs',
              hasSubRoute: true,
              showSubRoute: true,
              customSubmenuThree: true,
              page: 'staff-document',
              subMenusTwo: [
                {
                  menuValue: "Permission d'absence",
                  route: '', // Add actual route if available
                  hasSubRoute: false,
                  showSubRoute: false,
                  customSubmenuFour: false,
                },
                {
                  menuValue: "CV",
                  route: '', // Add actual route if available
                  hasSubRoute: false,
                  showSubRoute: false,
                  customSubmenuFour: false,
                },
              ],
            },
          ],
        },
        {
          menuValue: 'Gestion des ultilisateurs',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'school',
          page: 'minedub-users',
          subMenus: [
            {
              menuValue: 'Liste des ultilisateurs',
              route: routes.rolesPermision,
            },
            {
              menuValue: 'Roles & Permissions',
              route: routes.rolesPermision,
            },
            {
              menuValue: 'Delete Account Request',
              route: routes.deleteAccount,
            },

          ],
        },
      ],
    },
    {
      tittle: 'Other',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: false,
      base: '',
      page: '99',
      menu: [
        {
          menuValue: 'Communicatiom',
          icon: 'layout',
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
        {
          menuValue: 'Rapports',
          hasSubRoute: false,
          showSubRoute: false,
          route: '',
          customSubmenuTwo: false,
          icon: 'phone',
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
      ],
    },

  ];

  public AdminSchoolSidebarData: Array<any> = [
    {
      title: 'Principal',
      showAsTab: false,
      menu: [
        {
          menuValue: 'Tableau de bord',
          icon: 'layout-2',
          route: routes.adminDashboard,
          hasSubRoute: false
        },
        {
          menuValue: 'Annuaire',
          icon: 'phone',
          route: '',
          hasSubRoute: false
        }
      ]
    },
    {
      title: 'Gestion',
      showAsTab: false,
      menu: [
        {
          menuValue: 'Paramétrage',
          icon: 'school',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Géolocalisation', route: '' },
            { menuValue: 'Classes', route: '' },
            { menuValue: 'Bulletins', route: '' },
            { menuValue: 'Frais', route: '' },
            { menuValue: 'Emploi du temps', route: '' }
          ]
        },
        {
          menuValue: 'Élèves',
          icon: 'school',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Liste', route: routes.studentsList },
            { menuValue: 'Inscrire', route: '' },
            { menuValue: 'Transferts', route: routes.studentTransfer },
            { menuValue: 'Inactifs', route: routes.studentsList },
            { menuValue: 'Absences', route: routes.studentsList },
            { menuValue: 'Discipline', route: routes.studentsList },
            { menuValue: 'Promotions', route: routes.studentPromotion },
            { menuValue: 'Bulletins', route: routes.studentReportCard }
          ]
        },
        {
          menuValue: 'Notes',
          icon: 'notes',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Relevés', route: routes.notes },
            { menuValue: 'Bulletins', route: '' },
            { menuValue: 'Livrets', route: '' }
          ]
        },
        {
          menuValue: 'Parents',
          icon: 'people',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Tous', route: routes.pagesMain },
            { menuValue: 'Liste', route: routes.parentList },
            { menuValue: 'Messages', route: '' }
          ]
        },
        {
          menuValue: 'Classes',
          icon: 'school-bell',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Projet pédagogique', route: routes.classHomeWork },
            { menuValue: 'Indicateurs', route: '' },
            { menuValue: 'Évaluations', route: '' },
            { menuValue: 'Réussite', route: '' },
            { menuValue: 'Devoirs', route: routes.classHomeWork },
            { menuValue: 'Liste', route: routes.classRoom },
            { menuValue: 'Horaires', route: routes.scheduleClasses }
          ]
        },
        {
          menuValue: 'Personnel',
          icon: 'peoples',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Ajouter', route: routes.addStaff },
            { menuValue: 'Liste', route: routes.staffList },
            {
              menuValue: 'Documents',
              hasSubRoute: true,
              showSubRoute: false,
              subMenus: [
                { menuValue: 'Présence', route: '' },
                { menuValue: 'Absence', route: '' },
                { menuValue: 'Congés', route: '' },
                { menuValue: 'Service', route: '' },
                { menuValue: 'Cessation', route: '' },
                { menuValue: 'CV', route: '' }
              ]
            }
          ]
        },
        {
          menuValue: 'Enseignants',
          icon: 'chalkboard-teacher',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Liste', route: routes.teachersList },
            { menuValue: 'Ajouter', route: routes.addTeacher },
            { menuValue: 'Affectations', route: routes.teacherAssignments }
          ]
        },
        {
          menuValue: 'Utilisateurs',
          icon: 'user-cog',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Gestion', route: routes.users },
            { menuValue: 'Rôles', route: routes.rolesPermision },
            { menuValue: 'Demandes suppression', route: routes.deleteAccount }
          ]
        },
        {
          menuValue: 'Rapports',
          icon: 'file-chart-line',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Générer', route: '' },
            { menuValue: 'Modifier', route: '' },
            { menuValue: 'Imprimer', route: '' }
          ]
        },
        {
          menuValue: 'Communication',
          icon: 'comments',
          route: '',
          hasSubRoute: false
        }
      ]
    }
  ];
}
