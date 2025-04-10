import { Injectable } from '@angular/core';
import { routes } from '../routes/routes';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { apiResultFormat } from '../model/pages.model';
import { LoginService } from '../../auth/services/login.service';

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
  public getCountries() {
    return this.http.get<apiResultFormat>('assets/json/countries.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
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
  public getParentList() {
    return this.http.get<apiResultFormat>('assets/json/parents-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
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
      const role = user.role.task_name;
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
              menuValue: 'Student List',
              route: routes.studentList,

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
              menuValue: 'All Parents',
              route: routes.parentGrid,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Parent List',
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
              menuValue: 'All Teachers',
              route: routes.teacherGrid,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,

            },
            {
              menuValue: 'Teacher List',
              route: routes.teachersList,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,

            },
            {
              menuValue: 'Teacher Details',
              route: routes.teacherDetails,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,

            },
            {
              menuValue: 'Routine',
              customSubmenuTwo: false,
              route: routes.teacherRoutine,
              hasSubRoute: true,
              showSubRoute: false,

            },
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
          menuValue: 'Class Room',
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
        {
          menuValue: 'Class Routine',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'bell-school',
          route: routes.classRoutine,
          base: 'class-routine',
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
          menuValue: 'Section',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'square-rotated-forbid-2',
          route: routes.classSection,
          base: 'class-section',
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
          menuValue: 'Subject',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'book',
          route: routes.classSubject,
          base: 'class-subject',
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
          menuValue: 'Syllabus',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'book-upload',
          route: routes.classSyllabus,
          base: 'class-syllabus',
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
          menuValue: 'Time Table',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'table',
          route: routes.classTimeTable,
          base: 'class-time-table',
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
          menuValue: 'Home Work',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'license',
          route: routes.classHomeWork,
          customSubmenuTwo: false,
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          base: 'class-home-work',
          subRoutes: [],
        },
        {
          menuValue: 'Notes',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'file-text',
          page: 'grades',
          subMenus: [
            {
              menuValue: 'Saisie des Notes',
              route: routes.gradeEntry,
            },
            {
              menuValue: 'Calcul des Moyennes',
              route: routes.gradeCalculation,
            },
            {
              menuValue: 'Bulletins Scolaires',
              route: routes.reportCard,
            },
          ],
        },
        {
          menuValue: 'Examinations',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'hexagonal-prism-plus',
          page: 'examinations',
          subMenus: [
            {
              menuValue: 'Exam',
              route: routes.examList,
            },
            {
              menuValue: 'Exam Schedule',
              route: routes.examSchedule,
            },
            {
              menuValue: 'Grade',
              route: routes.grade,
            },
            {
              menuValue: 'Exam Attendance',
              route: routes.examAttendance,
            },
            {
              menuValue: 'Exam Results',
              route: routes.examResults,
            },
          ],
        },
        {
          menuValue: 'Reason',
          hasSubRoute: false,
          showSubRoute: false,
          base: 'academic-reasons',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          icon: 'lifebuoy',
          route: routes.academicReasons,
          customSubmenuTwo: false,
          subRoutes: [],
        },
        {
          menuValue: 'exam',
          title: 'Exam',
          link: routes.examList,
        },
        {
          menuValue: 'grades',
          title: 'Notes et Bulletins',
          hasSubRoute: true,
          showSubRoute: false,
          subRoutes: [
            {
              title: 'Saisie des Notes',
              link: routes.gradeEntry,
            },
            {
              title: 'Calcul des Moyennes',
              link: routes.gradeCalculation,
            },
            {
              title: 'Bulletins Scolaires',
              link: routes.reportCard,
            },
          ],
        },
      ],
    },
    {
      tittle: 'Management',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Pupil Management',
          page: 'pupil-management',
          icon: 'users',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'pupil-management',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          subMenus: [
            {
              menuValue: 'Dashboard',
              icon: 'dashboard',
              route: routes.pupilManagementDashboard,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'dashboard',
            },
            {
              menuValue: 'Pupil List',
              icon: 'list',
              route: routes.pupilManagementList,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'list',
            },
            {
              menuValue: 'Register Pupil',
              icon: 'user-plus',
              route: routes.pupilManagementRegister,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'register',
            },
            {
              menuValue: 'Report Cards',
              icon: 'file-text',
              route: routes.pupilManagementReportCards,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'report-cards',
            },
            {
              menuValue: 'Pupil Transfers',
              icon: 'exchange',
              route: routes.pupilManagementTransfers,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'transfers',
            }
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
        {
          menuValue: 'Library',
          page: 'library',
          icon: 'notebook',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Library Members',
              icon: 'package',
              route: routes.libraryMembers,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Books',
              icon: 'clipboard',
              route: routes.Books,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Issue Book',
              icon: 'truck',
              route: routes.issueBook,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Return',
              icon: 'truck',
              route: routes.returnBook,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Sports',
          icon: 'run',
          route: routes.sports,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'sports',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Players',
          icon: 'play-football',
          route: routes.players,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'players',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Hostel',
          page: 'hostel',
          icon: 'building-fortress',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Hostel List',
              icon: 'package',
              route: routes.hostelList,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'hostel-list',
            },
            {
              menuValue: 'Hostel Rooms',
              icon: 'clipboard',
              route: routes.hostelRooms,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'hostel-rooms',
            },
            {
              menuValue: 'Room Type',
              icon: 'truck',
              route: routes.hostelRoomType,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'hostel-room-type',
            },
          ],
        },
        {
          menuValue: 'Transport',
          page: 'transport',
          icon: 'bus',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Routes',
              icon: 'package',
              route: routes.transportRoutes,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'trasnsport-routes',
            },
            {
              menuValue: 'Pickup Points',
              icon: 'clipboard',
              route: routes.transportPickupPoints,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'transport-pickup-points',
            },
            {
              menuValue: 'Vehicle Drivers',
              icon: 'truck',
              route: routes.transportVehicleDrivers,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'transport-vehicle-drivers',
            },
            {
              menuValue: 'Vehicle',
              icon: 'truck',
              route: routes.transportVehicle,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'transport-vehicle',
            },
            {
              menuValue: 'Assign Vehicle',
              icon: 'truck',
              route: routes.transportAssignVehicle,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'transport-assign-vehicle',
            },
          ],
        },
      ],
    },
    {
      tittle: 'HRM',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Staffs',
          icon: 'users-group',
          route: routes.staffList,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'staff',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Departments',
          icon: 'layout-distribute-horizontal',
          route: routes.departments,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'departments',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Designation',
          icon: 'user-exclamation',
          route: routes.designation,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'designation',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Attendance',
          page: 'attendance',
          icon: 'calendar-share',
          hasSubRoute: true,
          showSubRoute: false,

          subMenus: [
            {
              menuValue: 'Student Attendance',
              route: routes.studentAttendance,
            },
            {
              menuValue: 'Teacher Attendance',
              route: routes.teacherAttendance,
            },
            {
              menuValue: 'Staff Attendance',
              route: routes.staffAttendance,
            },
          ],
        },
        {
          menuValue: 'Leaves',
          icon: 'calendar-stats',
          hasSubRoute: true,
          showSubRoute: false,
          page: 'leaves',
          subMenus: [
            {
              menuValue: 'List of leaves',
              route: routes.listLeaves,
            },
            {
              menuValue: 'Approve Request',
              route: routes.approveRequest,
            },
          ],
        },
        {
          menuValue: 'Holidays',
          icon: 'briefcase',
          route: routes.holiday,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'holidays',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Payroll',
          icon: 'moneybag',
          route: routes.payRoll,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'payroll',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
      ],
    },
    {
      tittle: 'Finance & Accounts',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Accounts',
          base: 'accounts',
          icon: 'swipe',
          hasSubRoute: true,
          showSubRoute: false,
          base1: 'Blog',
          page: '7',
          subMenus: [
            {
              menuValue: 'Expenses',
              route: routes.expenses,
            },
            {
              menuValue: 'Expense Category',
              route: routes.expensesCategory,
            },
            {
              menuValue: 'Income',
              route: routes.income,
            },
            {
              menuValue: 'Invoices',
              route: routes.accountsInvoices,
            },
            {
              menuValue: 'Invoice View',
              route: routes.invoice,
            },
            {
              menuValue: 'Transactions',
              route: routes.transactions,
              base: 'transactions',
            },
          ],
        },
      ],
    },
    {
      tittle: 'Announcements',
      showAsTab: true,
      hasSubRoute: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Notice Board',
          icon: 'clipboard-data',
          route: routes.noticeBoard,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'notice-board',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Events',
          icon: 'users',
          route: routes.events,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'event',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
      ],
    },
    {
      tittle: 'Reports',
      showAsTab: true,
      separateRoute: false,
      page: '10',
      menu: [
        {
          menuValue: 'Attendance Report',
          icon: 'calendar-due',
          route: routes.attendanceReport,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'attendance-report',
          base2: 'student-attendance-type',
          base3: 'daily-attendance',
          base5: 'student-day-wise',
          base6: 'teacher-day-wise',
          base7: 'teacher-report',
          base8: 'staff-day-wise',
          base9: 'staff-report'

        },
        {
          menuValue: 'Class Report',
          icon: 'graph',
          route: routes.classReport,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'class-report',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Student Report',
          icon: 'chart-infographic',
          route: routes.studentReport,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'student-report',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Grade Report',
          icon: 'calendar-x',
          route: routes.gradeReport,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'grade-report',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Leave Report',
          icon: 'line',
          route: routes.leaveReport,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'leave-report',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Fees Report',
          icon: 'mask',
          route: routes.feesReport,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'fees-report',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
      ],
    },
    {
      tittle: 'USER MANAGEMENT',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Users',
          icon: 'users',
          route: routes.users,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'users',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Roles & Permissions',
          icon: 'navigation-cog',
          route: routes.rolesPermision,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'roles-permission',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Delete Account Request',
          icon: 'flag-question',
          route: routes.deleteAccount,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'delete-account',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
      ],
    },
    {
      tittle: 'MEMBERSHIP',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Membership Plans',
          base: 'membership-plans',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.membershipPlans,
        },
        {
          menuValue: 'Membership Addons',
          base: 'membership-addons',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.membershipAddons,
        },
        {
          menuValue: 'Transactions',
          base: 'membership-transactions',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.membershipTransactions,
        },
      ],
    },
    {
      tittle: 'CONTENT',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Pages',
          base: 'pages',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          icon: 'page-break',
          hasSubRoute: false,
          showSubRoute: false,
          page: '2',
          route: routes.pagesMain,
        },
        {
          menuValue: 'Blog',
          base: 'expense',
          page: '3',
          icon: 'map-pin-pin',
          hasSubRoute: true,
          showSubRoute: false,
          base1: 'Blog',
          subMenus: [
            {
              menuValue: 'All Blogs',
              route: routes.allBlog,
            },
            {
              menuValue: 'Categories',
              route: routes.blogCategories,
            },
            {
              menuValue: 'Comments',
              route: routes.blogComments,
            },
            {
              menuValue: 'Tags',
              route: routes.blogTags,
            },
          ],
        },
        {
          menuValue: 'Location',

          icon: 'map-pin-pin',
          hasSubRoute: true,
          showSubRoute: false,
          page: 'location',
          subMenus: [
            {
              menuValue: 'Countries',
              route: routes.countries,
            },
            {
              menuValue: 'States',
              route: routes.states,
            },
            {
              menuValue: 'Cities',
              route: routes.cities,
            },
          ],
        },
        {
          menuValue: 'Testimonials',
          base: 'testimonials',
          icon: 'quote',
          route: routes.testimonials,
          hasSubRoute: false,
          showSubRoute: false,
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'FAQ',
          base: 'faq',
          icon: 'question-mark',
          route: routes.faq,
          hasSubRoute: false,
          showSubRoute: false,
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
      ],
    },
    {
      tittle: 'SUPPORT',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Contact Messages',
          icon: 'page-break',
          route: routes.contactMessages,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'contact-messages',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Tickets',
          icon: 'ticket',
          route: routes.ticketsList,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'tickets',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
      ],
    },
    {
      tittle: 'Pages',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Profile',
          icon: 'apps',
          route: routes.profile,
          base: 'profile',
          hasSubRoute: false,
          showSubRoute: false,
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Authentication',
          icon: 'lock-square-rounded',
          hasSubRouteTwo: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Login',
              hasSubRoute: true,
              showSubRoute: true,
              customSubmenuTwo: true,
              showAsTab: true,
              subMenusTwo: [
                {
                  menuValue: 'Cover',
                  icon: 'lock-square-rounded',
                  hasSubRoute: true,
                  showSubRoute: false,
                  route: routes.login,
                }
                ,
                {
                  menuValue: 'Illustration',
                  icon: 'lock-square-rounded',
                  hasSubRoute: true,
                  showSubRoute: false,
                  route: routes.login2,

                },
                {
                  menuValue: 'Basic',
                  icon: 'lock-square-rounded',
                  hasSubRoute: true,
                  showSubRoute: false,
                  route: routes.login3,

                }
              ]

            },
            {
              menuValue: 'Register',
              hasSubRoute: true,
              showSubRoute: true,
              customSubmenuTwo: true,
              showAsTab: true,
              subMenusTwo: [
                {
                  menuValue: 'Cover',
                  icon: 'lock-square-rounded',
                  hasSubRoute: true,
                  showSubRoute: false,
                  route: routes.register,
                }
                ,
                {
                  menuValue: 'Illustration',
                  icon: 'lock-square-rounded',
                  hasSubRoute: true,
                  showSubRoute: false,
                  route: routes.register2,
                },
                {
                  menuValue: 'Basic',
                  icon: 'lock-square-rounded',
                  hasSubRoute: true,
                  showSubRoute: false,
                  route: routes.register3,
                }
              ]

            },
            {
              menuValue: 'Forgot Password',
              hasSubRoute: true,
              route: routes.forgotPassword,
              showSubRoute: true,
              customSubmenuTwo: true,
              showAsTab: true,
              subMenusTwo: [
                {
                  menuValue: 'Cover',
                  icon: 'lock-square-rounded',
                  hasSubRoute: true,
                  showSubRoute: false,
                  route: routes.forgotPassword,
                }
                ,
                {
                  menuValue: 'Illustration',
                  icon: 'lock-square-rounded',
                  hasSubRoute: true,
                  showSubRoute: false,
                  route: routes.forgotPassword2,
                },
                {
                  menuValue: 'Basic',
                  icon: 'lock-square-rounded',
                  hasSubRoute: true,
                  route: routes.forgotPassword3,
                  showSubRoute: false,
                }
              ]

            },
            {
              menuValue: 'Reset Password',
              hasSubRoute: true,
              showSubRoute: true,
              customSubmenuTwo: true,
              showAsTab: true,
              subMenusTwo: [
                {
                  menuValue: 'Cover',
                  icon: 'lock-square-rounded',
                  hasSubRoute: true,
                  route: routes.resetPasseword,
                  showSubRoute: false,
                }
                ,
                {
                  menuValue: 'Illustration',
                  icon: 'lock-square-rounded',
                  route: routes.resetPasseword2,
                  hasSubRoute: true,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Basic',
                  icon: 'lock-square-rounded',
                  route: routes.resetPasseword3,
                  hasSubRoute: true,
                  showSubRoute: false,
                }
              ]

            },
            {
              menuValue: 'Email Verification',
              hasSubRoute: true,
              showSubRoute: true,
              customSubmenuTwo: true,
              showAsTab: true,
              subMenusTwo: [
                {
                  menuValue: 'Cover',
                  icon: 'lock-square-rounded',
                  route: routes.emailVerification,
                  hasSubRoute: true,
                  showSubRoute: false,
                }
                ,
                {
                  menuValue: 'Illustration',
                  icon: 'lock-square-rounded',
                  route: routes.emailVerification2,
                  hasSubRoute: true,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Basic',
                  icon: 'lock-square-rounded',
                  route: routes.emailVerification3,
                  hasSubRoute: true,
                  showSubRoute: false,
                }
              ]

            },
            {
              menuValue: '2 Step Verification',
              hasSubRoute: true,
              showSubRoute: true,
              customSubmenuTwo: true,
              showAsTab: true,
              subMenusTwo: [
                {
                  menuValue: 'Cover',
                  icon: 'lock-square-rounded',
                  route: routes.twoStepVerfication,
                  hasSubRoute: true,
                  showSubRoute: false,
                }
                ,
                {
                  menuValue: 'Illustration',
                  icon: 'lock-square-rounded',
                  route: routes.twoStepVerfication2,
                  hasSubRoute: true,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Basic',
                  icon: 'lock-square-rounded',
                  route: routes.twoStepVerfication3,
                  hasSubRoute: true,
                  showSubRoute: false,
                }
              ]

            },
            {
              menuValue: 'Lock Screen',
              route: routes.lockScreen,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
          ],
        },

        {
          menuValue: 'Error Pages',
          icon: 'error-404',
          hasSubRoute: true,
          showSubRoute: false,
          page: '4',
          subMenus: [
            {
              menuValue: '404 Error',
              route: routes.error404,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: '500 Error',
              route: routes.error500,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Blank Page',
          icon: 'apps',
          route: routes.blankPage,
          hasSubRoute: false,
          showSubRoute: false,
          page: '50',
          base: '',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Coming Soon',
          icon: 'device-laptop',
          route: routes.comingSoon,
          hasSubRoute: false,
          showSubRoute: false,
          page: '6',
          base: '',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
        {
          menuValue: 'Under Maintenance',
          icon: 'moneybag',
          route: routes.underMaintenance,
          hasSubRoute: false,
          showSubRoute: false,
          page: '11',
          base: '',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
        },
      ],
    },
    {
      tittle: 'Settings',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'General Settings',
          icon: 'settings-cog',
          hasSubRoute: true,
          showSubRoute: false,
          page: 'general-settings',
          base: 'general-settings',
          subMenus: [
            {
              menuValue: 'Profile Settings',
              route: routes.profileSettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Security Settings',
              route: routes.securitySettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Notifications Settings',
              route: routes.notificationsSettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Connected Apps',
              route: routes.connectedApps,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Website Settings',
          base: 'website-settings',
          icon: 'world-cog',
          hasSubRoute: true,
          showSubRoute: false,
          page: '22',
          subMenus: [
            {
              menuValue: 'Company Settings',
              route: routes.companySettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Localization',
              route: routes.localization,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Prefixes',
              route: routes.prefixes,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Preference',
              route: routes.preferences,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Social Authentication',
              route: routes.socialAuthentication,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Language',
              route: routes.language,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'App Settings',
          page: 'app-settings',
          icon: 'apps',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'app-settings',
          subMenus: [
            {
              menuValue: 'Invoice Settings',
              route: routes.invoiceSettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Custom Fields',
              route: routes.customFields,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'System Settings',
          page: 'system-settings',
          icon: 'device-laptop',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'system-settings',
          subMenus: [
            {
              menuValue: 'Email Settings',
              route: routes.emailSettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Email Templates',
              route: routes.emailTemplates,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'SMS Settings',
              route: routes.smsSettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'OTP',
              route: routes.otpSettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'GDPR Cookies',
              route: routes.gdprCookies,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Financial Settings',
          page: 'financial-settings',
          icon: 'moneybag',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'financial-settings',
          subMenus: [
            {
              menuValue: 'Payment Gateways',
              route: routes.paymentGateway,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Tax Rates',
              route: routes.taxRates,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Academic Settings',
          page: 'academic-settings',
          icon: 'flag-cog',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'academic-settings',
          subMenus: [
            {
              menuValue: 'School Settings',
              route: routes.schoolSettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Religion',
              route: routes.religion,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Other Settings',
          page: 'other-settings',
          icon: 'flag-cog',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'other-settings',
          subMenus: [
            {
              menuValue: 'Storage',
              route: routes.storage,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Ban IP Address',
              route: routes.banIpAddress,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
      ],
    },
    {
      tittle: 'UI Interface',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Base UI',
          base: 'base-ui',
          icon: 'hierarchy-2',
          hasSubRoute: true,
          showSubRoute: false,
          page: '30',
          subMenus: [
            {
              menuValue: 'Alerts',
              route: routes.alerts,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Accordion',
              route: routes.uiAccordion,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Avatar',
              route: routes.uiAvatar,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Badges',
              route: routes.uiBadges,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Border',
              route: routes.uiBorders,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Buttons',
              route: routes.uiButtons,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Button Group',
              route: routes.uiButtonsGroup,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Breadcrumb',
              route: routes.uiBreadcrumb,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Card',
              route: routes.uiCards,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Carousel',
              route: routes.uiCarousel,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Colors',
              route: routes.uiColors,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Dropdowns',
              route: routes.uiDropdowns,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Grid',
              route: routes.uiGrid,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Images',
              route: routes.uiImages,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Lightbox',
              route: routes.uiLightbox,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Media',
              route: routes.uiMedia,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Modals',
              route: routes.uiModals,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Offcanvas',
              route: routes.uiOffcanvas,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Pagination',
              route: routes.uiPagination,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Popovers',
              route: routes.uiPopovers,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Progress',
              route: routes.uiProgress,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Placeholders',
              route: routes.uiPlaceholders,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Range Slider',
              route: routes.uiRangeSlider,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Spinner',
              route: routes.uiSpinner,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Sweet Alerts',
              route: routes.uiSweetAlerts,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Tabs',
              route: routes.uiNavTabs,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Toasts',
              route: routes.uiToasts,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Tooltips',
              route: routes.uiTooltips,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Typography',
              route: routes.uiTypography,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Video',
              route: routes.uiVideo,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Advanced UI',
          base: 'advanced-ui',
          icon: 'hierarchy-3',
          hasSubRoute: true,
          showSubRoute: false,
          page: '40',
          subMenus: [
            {
              menuValue: 'Ribbon',
              route: routes.ribbon,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Clipboard',
              route: routes.clipboard,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Drag & Drop',
              route: routes.dragDrop,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Rating',
              route: routes.rating,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Text Editor',
              route: routes.textEditor,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Counter',
              route: routes.counter,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Scrollbar',
              route: routes.scrollbar,
              hasSubRoute: false,
              showSubRoute: false,
            },

            {
              menuValue: 'Timeline',
              route: routes.timeline,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Charts',
          icon: 'chart-line',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'charts',
          page: '5',
          subMenus: [
            {
              menuValue: 'Apex Charts',
              route: routes.chartApex,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Prime NG Charts',
              hasSubRoute: false,
              showSubRoute: false,
              route: routes.chartPrime,
              subRoutes: [],
            },
          ],
        },
        {
          menuValue: 'Icons',
          icon: 'icons',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'icons',
          page: '30',
          subMenus: [
            {
              menuValue: 'Fontawesome Icons',
              route: routes.iconFontAwesome,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Feather Icons',
              route: routes.iconFeather,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Ionic Icons',
              route: routes.iconIonic,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Material Icons',
              route: routes.iconMaterial,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Pe7 Icons',
              route: routes.iconPe7,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Simpleline Icons',
              route: routes.iconSimpleline,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Themify Icons',
              route: routes.iconThemify,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Weather Icons',
              route: routes.iconWeather,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Typicon Icons',
              route: routes.iconTypicon,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Flag Icons',
              route: routes.iconFlag,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Forms',
          icon: 'input-search',
          base: 'forms',
          hasSubRouteTwo: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Form Elements',
              page1: 'form-basic-inputs',
              page2: 'form-checkbox-radios',
              page3: 'form-input-groups',
              page4: 'form-grid-gutters',
              page5: 'form-select',
              page6: 'form-mask',
              page7: 'form-fileupload',
              page8: 'form-elements',
              customSubmenuTwo: true,
              hasSubRoute: true,
              showSubRoute: false,
              subMenusTwo: [
                {
                  menuValue: 'Basic Inputs',
                  route: routes.formBasicInputs,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Checkbox & Radios',
                  route: routes.formCheckboxRadios,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Input Groups',
                  route: routes.formInputsGroups,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Grid & Gutters',
                  route: routes.formGridGutters,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Form Select',
                  route: routes.formSelect,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Input Masks',
                  route: routes.formMask,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'File Uploads',
                  route: routes.formFileUpload,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
              ],
            },
            {
              menuValue: 'Layouts',
              customSubmenuTwo: true,
              page1: 'form-horizontal',
              page2: 'form-vertical',
              page3: 'form-floating-labels',
              hasSubRoute: true,
              showSubRoute: false,
              subMenusTwo: [
                {
                  menuValue: 'Horizontal Form',
                  route: routes.formHorizontal,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Vertical Form',
                  route: routes.formVertical,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Floating Labels',
                  route: routes.formFloatingLabels,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
              ],
            },
            {
              menuValue: 'Form Validation',
              route: routes.formValidation,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
          ],
        },
        {
          menuValue: 'Tables',
          icon: 'table-plus',
          base: 'table',
          page: '30',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Basic Tables',
              route: routes.basicTable,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Data Table',
              route: routes.dataTable,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
      ],
    },
    {
      tittle: 'HELP',
      showAsTab: true,
      separateRoute: false,
      menu: [

        {
          menuValue: 'Multi Level',
          hasSubRouteThree: true,
          icon: 'menu-2',
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Level 1.1',
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuThree: false,
            },
            {
              menuValue: 'Level 1.2',
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuThree: true,
              subMenusTwo: [
                {
                  menuValue: 'Level 2.1',
                  hasSubRoute: false,
                  showSubRoute: false,
                  customSubmenuFour: false,
                },
                {
                  menuValue: 'Level 2.2',
                  hasSubRoute: false,
                  showSubRoute: false,
                  customSubmenuFour: true,
                  subMenusThree: [
                    {
                      menuValue: 'Level 3.1',
                      hasSubRoute: false,
                      showSubRoute: false,
                      customSubmenuFour: true,
                    },
                    {
                      menuValue: 'Level 3.2',
                      hasSubRoute: false,
                      showSubRoute: false,
                      customSubmenuFour: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  public AdminSidebarData = [
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
              menuValue: 'Departements',
              route: routes.departementsList,
            },
            {
              menuValue: 'Arrondissements',
              route: routes.municipalitiesList,
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
              menuValue: 'All Parents',
              route: routes.parentGrid,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Parent List',
              route: routes.parentList,
              customSubmenuTwo: false,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Structure Educatif',
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
          menuValue: 'Gestion des ultilisateurs',
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
          menuValue: 'Gestion des Examens',
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
          menuValue: 'Curriculum scolaire',
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
          menuValue: 'Conges scolaire et autres',
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
          menuValue: 'Paramétres',
          base: 'website-settings',
          icon: 'world-cog',
          hasSubRoute: true,
          showSubRoute: false,
          page: '22',
          subMenus: [
            {
              menuValue: 'Company Settings',
              route: routes.companySettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Localization',
              route: routes.localization,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Prefixes',
              route: routes.prefixes,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Preference',
              route: routes.preferences,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Social Authentication',
              route: routes.socialAuthentication,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Language',
              route: routes.language,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },

      ],
    },
  ];

  public AdminSchoolSidebarData = [
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
              route: routes.studentList,
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
          menuValue: 'Parents',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user-bolt',
          page: 'parents',
          subMenus: [
            {
              menuValue: 'All Parents',
              route: routes.parentGrid,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Parent List',
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
        {
          menuValue: 'Paramétres',
          base: 'website-settings',
          icon: 'world-cog',
          hasSubRoute: true,
          showSubRoute: false,
          page: '22',
          subMenus: [
            {
              menuValue: 'Company Settings',
              route: routes.companySettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Localization',
              route: routes.localization,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Prefixes',
              route: routes.prefixes,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Preference',
              route: routes.preferences,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Social Authentication',
              route: routes.socialAuthentication,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Language',
              route: routes.language,
              hasSubRoute: false,
              showSubRoute: false,
            },
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
          menuValue: 'Scholarite',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'school-bell',
          page: 'classes',
          subMenus: [
            {
              menuValue: 'Matieres',
              route: routes.classes,
            },
            {
              menuValue: 'Emploie de temps',
              route: routes.scheduleClasses,
            },
            {
              menuValue: 'Salle de classes',
              icon: 'building',
              route: routes.classRoom,
            },
            {
              menuValue: 'Class Routine',

              icon: 'bell-school',
              route: routes.classRoutine,
              base: 'class-routine',
            },
            {
              menuValue: 'Section',
              icon: 'square-rotated-forbid-2',
              route: routes.classSection,
            },
            {
              menuValue: 'Subject',
              icon: 'book',
              route: routes.classSubject,
            },
            {
              menuValue: 'Syllabus',
              icon: 'book-upload',
              route: routes.classSyllabus,
              base: 'class-syllabus',
            },
            {
              menuValue: 'Time Table',
              icon: 'table',
              route: routes.classTimeTable,
            },
            {
              menuValue: 'Home Work',
              icon: 'license',
              route: routes.classHomeWork,

            }

          ],

        },
        {
          menuValue: 'Notes',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'file-text',
          page: 'grades',
          subMenus: [
            {
              menuValue: 'Saisie des Notes',
              route: routes.gradeEntry,
            },
            {
              menuValue: 'Calcul des Moyennes',
              route: routes.gradeCalculation,
            },
            {
              menuValue: 'Bulletins Scolaires',
              route: routes.reportCard,
            },
          ],
        },
        {
          menuValue: 'Examinations',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'hexagonal-prism-plus',
          page: 'examinations',
          subMenus: [
            {
              menuValue: 'Exam',
              route: routes.examList,
            },
            {
              menuValue: 'Exam Schedule',
              route: routes.examSchedule,
            },
            {
              menuValue: 'Grade',
              route: routes.grade,
            },
            {
              menuValue: 'Exam Attendance',
              route: routes.examAttendance,
            },
            {
              menuValue: 'Exam Results',
              route: routes.examResults,
            },
          ],
        },
        {
          menuValue: 'exam',
          title: 'Exam',
          link: routes.examList,
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
        {
          menuValue: 'System Settings',
          page: 'system-settings',
          icon: 'device-laptop',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'system-settings',
          subMenus: [
            {
              menuValue: 'Email Settings',
              route: routes.emailSettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Email Templates',
              route: routes.emailTemplates,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'SMS Settings',
              route: routes.smsSettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'OTP',
              route: routes.otpSettings,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'GDPR Cookies',
              route: routes.gdprCookies,
              hasSubRoute: false,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Gestion des ultilisateurs',
          icon: 'users',
          hasSubRoute: true,
          showSubRoute: false,
          base: '',
          subMenus: [
            {
              menuValue: 'Users',
              icon: 'users',
              route: routes.users,

            },
            {
              menuValue: 'Roles & Permissions',
              icon: 'navigation-cog',
              route: routes.rolesPermision,

            },
            {
              menuValue: 'Delete Account Request',
              icon: 'flag-question',
              route: routes.deleteAccount,
            },
          ],
        },
        {
          menuValue: 'Reason',
          hasSubRoute: false,
          showSubRoute: false,
          base: 'academic-reasons',
          base2: "",
          base3: "",
          base4: "",
          base5: "",
          base6: "",
          base7: "",
          base8: "",
          base9: "",
          icon: 'lifebuoy',
          route: routes.academicReasons,
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
          menuValue: 'Enseignant',
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
            {
              menuValue: 'Liste des élèves',
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
}
