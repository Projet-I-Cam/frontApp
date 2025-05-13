import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';

import { LoginService } from '../../auth/services/login.service';
import { globalGet } from '../../services/statefull/http';
import { Section } from '../model/institution.model';
import { apiResultFormat, classRoomData } from '../model/pages.model';
import { routes } from '../routes/routes';
import { SettingsService } from '../settings/settings.service';

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
    } else {
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
    } else {
      return {
        data: data,
        totalData: data.length
      } as apiResultFormat;
    }
  }

  public async getStudents(): Promise<any> {

    const data = await globalGet({
      T: 'Person',
      filters: { 'isStudent': true },
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
  public getSideBarData(): any {
    if (this.loginService.isLoggedIn()) {
      const user = this.loginService.getUser();
      const role = user?.role?.task_name || 'admin';
      console.log('the user role is', role);
      if ((role === 'etablissement')) {
        return this.AdminSchoolSidebarData;
      } else if (role === 'enseignant') {
        return this.TeacherSidebarData;
      } else if (role === 'parent') {
        console.log('Parent children:', this.parentChildren);
        return this.getParentMenu(this.parentChildren || []);
      }
      else if (role === 'administration' || role === 'services_centraux' || role == 'ministre') {
        return this.AdminSidebarData;
      }
      else if (role === 'regional') {
        return this.AdminRegionSidebarData;
      }
      else if (role === 'departemental') {
        return this.AdminDepartementSidebarData;
      }
      else if (role === 'arrondissement') {
        return this.AdminInspectionSidebarData;
      }
      return this.AdminSidebarData;
    }
    return this.sidebarData1;
  }

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

  parentChildren = [
    {
      name: "MBA TADA Sony Bruce",
      school: {
        name: "École Primaire de Yaoundé",
        director: "M. Mbarga",
        teacher: "Mme. Ngo"
      },
      class: {
        name: "CP-A",
        totalStudents: 30,
        girls: 15,
        boys: 15
      }
    },
    {
      name: "ABADA ATEBA Serge",
      school: {
        name: "Lycée Général Leclerc",
        director: "M. Essomba",
        teacher: "M. Tchouaga"
      },
      class: {
        name: "6ème B",
        totalStudents: 45,
        girls: 20,
        boys: 25
      }
    }
  ];

  // Updated getParentMenu method with proper formatting
  getParentMenu(children: any[] = []) {
    try {
      // Validate input
      const safeChildren = Array.isArray(children) ? children.filter(child =>
        child && typeof child === 'object' && 'name' in child
      ) : [];

      // Generate child menus with proper structure
      const childMenus = safeChildren.map(child => ({
        menuValue: child?.name || 'Enfant sans nom',
        hasSubRoute: true,
        showSubRoute: true,
        customSubmenuThree: true,
        icon: 'user', // Added icon for consistency
        subMenusTwo: [ // Changed from subMenusTwo to subMenus to match your structure
          {
            menuValue: 'Établissement',
            customSubmenuFour: true,
            subMenusThree: [
              { menuValue: `Etablissement: ${child.school?.name || 'Non spécifié'}`, route: '', customSubmenuFour: false },
              { menuValue: `Directeur: ${child.school?.director || 'Non spécifié'}`, route: '', customSubmenuFour: false },
              { menuValue: `Enseignant: ${child.school?.teacher || 'Non spécifié'}`, route: '', customSubmenuFour: false },
              { menuValue: `Classe: ${child.class?.name || 'Non spécifié'}`, route: '', customSubmenuFour: false },
              { menuValue: `Effectif: ${child.class?.totalStudents || 'N/A'}`, route: '', customSubmenuFour: false },
              { menuValue: `Filles: ${child.class?.girls || 'N/A'}`, route: '', customSubmenuFour: false },
              { menuValue: `Garçons: ${child.class?.boys || 'N/A'}`, route: '', customSubmenuFour: false }
            ]
          },
          {
            menuValue: 'Informations Sanitaires',
            customSubmenuFour: true,
            subMenusThree: [
              { menuValue: 'Etat de Santé', route: '', customSubmenuFour: false },
              { menuValue: 'Certificat Médical', route: '', customSubmenuFour: false, },
              { menuValue: 'Aptitude au Sport', route: '', customSubmenuFour: false }
            ]
          },
          { menuValue: 'Programme des Cours', route: routes.classTimeTable, customSubmenuFour: false, },
          { menuValue: 'Devoirs', route: '' },
          { menuValue: 'Absences/Présences', route: '', customSubmenuFour: false },
          { menuValue: 'Planning des Examens', route: routes.examSchedule, customSubmenuFour: false },
          { menuValue: 'Notes / Bulletins', route: '', customSubmenuFour: false },
          { menuValue: 'Etat de Payement', route: '', customSubmenuFour: false },
          {
            menuValue: 'Informations/planning',
            customSubmenuFour: true,
            subMenusThree: [
              { menuValue: 'Permission/Congés', route: '', customSubmenuThree: false },
              { menuValue: 'Convocations', route: '', customSubmenuThree: false },
              { menuValue: 'Réunion des Parents', route: '', customSubmenuThree: false },
              { menuValue: 'Jours sans cours', route: '', customSubmenuThree: false },
              { menuValue: 'Activités Extrascolaires', route: '', customSubmenuThree: false }
            ]
          }
        ]
      }));

      // Return properly formatted parent menu
      return [{
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
            customSubmenuTwo: false,
            subRoutes: [],
          },
          {
            menuValue: 'Mes enfants Inscrit',
            hasSubRouteThree: true,
            icon: 'school',
            page: 'students',
            subMenus: childMenus.length ? childMenus : [{
              menuValue: 'Aucun enfant inscrit',
              customSubmenuThree: false,
              route: ''
            }]
          }
        ]
      }];
    } catch (error) {
      console.error('Error generating parent menu:', error);
      return this.getFallbackParentMenu();
    }
  }


  // Updated fallback menu
  private getFallbackParentMenu(): any[] {
    return [{
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
          route: routes.adminDashboard,
          hasSubRoute: false
        },
        {
          menuValue: 'Mes enfants Inscrit',
          icon: 'school',
          subMenus: [{
            menuValue: 'Erreur de chargement',
            customSubmenuThree: false,
            route: ''
          }]
        }
      ]
    }];
  }

  // Rest of your existing menu definitions...
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
          customSubmenuTwo: false,
          subRoutes: [],
        },
        {
          menuValue: 'Mes enfants Inscrit',
          hasSubRouteThree: true,
          icon: 'school',
          page: 'students',
          subMenus: [],
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
            { menuValue: 'Mon collaborateur', route: '' },
            { menuValue: 'Liste des élèves inscrits', route: routes.studentList },
            { menuValue: 'Projet pédagogique', route: '' },
            { menuValue: 'Programme des cours', route: routes.studentTransfer },
            { menuValue: 'Manuels au programme', route: '' },
            { menuValue: 'Matériel pédagogique', route: '' },
            { menuValue: 'Devoirs/Exercices', route: routes.classHomeWork },
            { menuValue: 'Contrôle/Examens', route: '' },
            { menuValue: 'Gestion des absences', route: routes.studentReportCard },
            { menuValue: 'Suivi des élèves/Discipline', route: routes.studentReportCard }
          ]
        },
        {
          menuValue: 'Planning',
          icon: 'calendar', // Suggested icon (adjust as needed)
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Cours/Emploi de temps', route: routes.classTimeTable }, // Assuming you have a schedule route
            { menuValue: 'Réunion des parents', route: routes.parentList },
            { menuValue: 'Contrôle/Examens', route: routes.examList },
            { menuValue: 'Jours sans cours', route: '' },
            { menuValue: 'Activités extra-scolaires', route: '' },
            { menuValue: 'Carrefours pédagogiques', route: '' }
          ]
        },
        {
          menuValue: 'Gestion des notes',
          icon: 'notes',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Saisie des notes', route: routes.gradeEntry },
            { menuValue: 'Relevé de notes et notes', route: '' },
            { menuValue: 'Traitement des notes', route: '' },
            { menuValue: 'Bulletins de notes', route: routes.reportCard },
            { menuValue: 'Livret scolaire', route: '' }
          ]
        },
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
          menuValue: 'Communications',
          icon: 'comments',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Correspondance aux directeurs', route: routes.addTeacher },
            { menuValue: 'Parents', route: '' },
            { menuValue: 'Élèves', route: '' }
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
    }
  ];

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
          menuValue: 'Annuaire',
          icon: 'phone',
          base: 'base',
          hasSubRoute: false,
          showSubRoute: false,
          route: '',
          customSubmenuTwo: false,
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
          menuValue: "Etablissements",
          hasSubRouteTwo: true,
          icon: 'settings',
          showSubRoute: false,
          page: 'institution-settings',
          subMenus: [
            {
              menuValue: "Liste des etablissements",
              route: '/peoples/institutions/institutions-list',
              customSubmenuTwo: false,
            },
            {
              menuValue: "Liste des eleves inscrit",
              route: routes.studentList,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Liste des eleves inactif",
              route: routes.studentList,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Notes/Bulletin",
              route: routes.notes
            },
            {
              menuValue: "Livret Scolaire",
              route: routes.studentReportCard
            },
            {
              menuValue: "Liste des demande de transferer",
              route: routes.studentTransfer
            },
            {
              menuValue: 'Geo-Localisation et autres',
              route: routes.securitySettings,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Années académiques',
              route: routes.academicYear,
              customSubmenuTwo: false,

            },
            {
              menuValue: "Types d'enseignements",
              route: routes.educationType,
              customSubmenuTwo: false,
            },
          ],
        },
      ],
    },
    {
      title: 'Gestions des delegations',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: "Gestion Delegation",
          hasSubRouteTwo: true,
          icon: 'building',
          showSubRoute: false,
          page: 'institution-settings',
          subMenus: [
            {
              menuValue: 'Liste des delegations regionale',
              route: routes.regionsList,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Liste des delegations departementale',
              route: routes.departmentsList,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Liste des delegations d'arrondissement",
              route: routes.municipalitiesList,
              customSubmenuTwo: false,
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
          showSubRoute: false,
          page: 'base',
          hasSubRouteTwo: true,
          icon: 'staff',
          subMenus: [
            {
              menuValue: 'Ajouter un personnel',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Liste du Personnel',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Annuaire Telephonique',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Documents Administratifs',
              customSubmenuTwo: true,
              page: 'base2',
              subMenusTwo: [
                {
                  menuValue: 'Attestation de présence effective',
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Permission d'absence",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Notification de congés",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Attestation de service",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Attestation de cessation de service",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "CV",
                  route: '', // Add actual route if available
                },
              ],
            },
            {
              menuValue: 'Ultilisateur et Role',
              customSubmenuTwo: true,
              page: 'base2',
              subMenusTwo: [
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
            {
              menuValue: 'Staffs',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
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
          menuValue: 'Communications',
          showSubRoute: true,
          page: 'base',
          hasSubRoute: true,
          icon: 'speaker',
          subMenus: [
            {
              menuValue: 'Pour les delegues Regionaux',
              route: 'peoples/minebase/staffs',

            },
            {
              menuValue: 'Pour les delegues departementaux',
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour les inspecteurs d'arrondissement",
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour les directeurs d'ecoles",
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour les enseignant",
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour la communaute educative",
              route: 'peoples/minebase/staffs',
            },
          ],
        },

        {
          menuValue: 'Rapports',
          hasSubRoute: false,
          showSubRoute: false,
          route: '',
          customSubmenuTwo: false,
          icon: 'file',
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

  public AdminRegionSidebarData: Array<any> = [
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
          menuValue: 'Annuaire',
          icon: 'phone',
          base: 'base',
          hasSubRoute: false,
          showSubRoute: false,
          route: '',
          customSubmenuTwo: false,
          subRoutes: [],
        },
         {
              menuValue: 'Liste des delegations departementale',
              route: routes.departmentsList,
              icon: 'office'
            },
      ],
    },
    {
      title: 'HELP',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: "Etablissements",
          hasSubRouteTwo: true,
          icon: 'settings',
          showSubRoute: false,
          page: 'institution-settings',
          subMenus: [
            {
              menuValue: "Liste des etablissements",
              route: '/peoples/institutions/institutions-list',
              customSubmenuTwo: false,
            },
            {
              menuValue: "Liste des eleves inscrit",
              route: routes.studentList,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Liste des eleves inactif",
              route: routes.studentList,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Notes/Bulletin",
              route: routes.notes
            },
            {
              menuValue: "Livret Scolaire",
              route: routes.studentReportCard
            },
            {
              menuValue: "Liste des demande de transferer",
              route: routes.studentTransfer
            },
            {
              menuValue: 'Geo-Localisation et autres',
              route: routes.securitySettings,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Années académiques',
              route: routes.academicYear,
              customSubmenuTwo: false,

            },
            {
              menuValue: "Types d'enseignements",
              route: routes.educationType,
              customSubmenuTwo: false,
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
          showSubRoute: false,
          page: 'base',
          hasSubRouteTwo: true,
          icon: 'staff',
          subMenus: [
            {
              menuValue: 'Ajouter un personnel',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Liste du Personnel',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Annuaire Telephonique',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Documents Administratifs',
              customSubmenuTwo: true,
              page: 'base2',
              subMenusTwo: [
                {
                  menuValue: 'Attestation de présence effective',
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Permission d'absence",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Notification de congés",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Attestation de service",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Attestation de cessation de service",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "CV",
                  route: '', // Add actual route if available
                },
              ],
            },
            {
              menuValue: 'Ultilisateur et Role',
              customSubmenuTwo: true,
              page: 'base2',
              subMenusTwo: [
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
            {
              menuValue: 'Staffs',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
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
          menuValue: 'Communications',
          showSubRoute: true,
          page: 'base',
          hasSubRoute: true,
          icon: 'speaker',
          subMenus: [
            {
              menuValue: 'Pour les delegues Regionaux',
              route: 'peoples/minebase/staffs',

            },
            {
              menuValue: 'Pour les delegues departementaux',
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour les inspecteurs d'arrondissement",
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour les directeurs d'ecoles",
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour les enseignant",
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour la communaute educative",
              route: 'peoples/minebase/staffs',
            },
          ],
        },

        {
          menuValue: 'Rapports',
          hasSubRoute: false,
          showSubRoute: false,
          route: '',
          customSubmenuTwo: false,
          icon: 'file',
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

  public AdminDepartementSidebarData: Array<any> = [
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
          menuValue: 'Annuaire',
          icon: 'phone',
          base: 'base',
          hasSubRoute: false,
          showSubRoute: false,
          route: '',
          customSubmenuTwo: false,
          subRoutes: [],
        },
         {
             menuValue: 'Liste des Inspection',
              route: routes.municipalitiesList,
              icon: 'office'
            },
      ],
    },
    {
      title: 'HELP',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: "Etablissements",
          hasSubRouteTwo: true,
          icon: 'settings',
          showSubRoute: false,
          page: 'institution-settings',
          subMenus: [
            {
              menuValue: "Liste des etablissements",
              route: '/peoples/institutions/institutions-list',
              customSubmenuTwo: false,
            },
            {
              menuValue: "Liste des eleves inscrit",
              route: routes.studentList,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Liste des eleves inactif",
              route: routes.studentList,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Notes/Bulletin",
              route: routes.notes
            },
            {
              menuValue: "Livret Scolaire",
              route: routes.studentReportCard
            },
            {
              menuValue: "Liste des demande de transferer",
              route: routes.studentTransfer
            },
            {
              menuValue: 'Geo-Localisation et autres',
              route: routes.securitySettings,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Années académiques',
              route: routes.academicYear,
              customSubmenuTwo: false,

            },
            {
              menuValue: "Types d'enseignements",
              route: routes.educationType,
              customSubmenuTwo: false,
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
          showSubRoute: false,
          page: 'base',
          hasSubRouteTwo: true,
          icon: 'staff',
          subMenus: [
            {
              menuValue: 'Ajouter un personnel',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Liste du Personnel',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Annuaire Telephonique',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Documents Administratifs',
              customSubmenuTwo: true,
              page: 'base2',
              subMenusTwo: [
                {
                  menuValue: 'Attestation de présence effective',
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Permission d'absence",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Notification de congés",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Attestation de service",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Attestation de cessation de service",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "CV",
                  route: '', // Add actual route if available
                },
              ],
            },
            {
              menuValue: 'Ultilisateur et Role',
              customSubmenuTwo: true,
              page: 'base2',
              subMenusTwo: [
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
            {
              menuValue: 'Staffs',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
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
          menuValue: 'Communications',
          showSubRoute: true,
          page: 'base',
          hasSubRoute: true,
          icon: 'speaker',
          subMenus: [
            {
              menuValue: 'Pour les delegues Regionaux',
              route: 'peoples/minebase/staffs',

            },
            {
              menuValue: 'Pour les delegues departementaux',
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour les inspecteurs d'arrondissement",
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour les directeurs d'ecoles",
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour les enseignant",
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour la communaute educative",
              route: 'peoples/minebase/staffs',
            },
          ],
        },

        {
          menuValue: 'Rapports',
          hasSubRoute: false,
          showSubRoute: false,
          route: '',
          customSubmenuTwo: false,
          icon: 'file',
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

  public AdminInspectionSidebarData: Array<any> = [
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
          menuValue: 'Annuaire',
          icon: 'phone',
          base: 'base',
          hasSubRoute: false,
          showSubRoute: false,
          route: '',
          customSubmenuTwo: false,
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
          menuValue: "Etablissements",
          hasSubRouteTwo: true,
          icon: 'settings',
          showSubRoute: false,
          page: 'institution-settings',
          subMenus: [
            {
              menuValue: "Liste des etablissements",
              route: '/peoples/institutions/institutions-list',
              customSubmenuTwo: false,
            },
            {
              menuValue: "Liste des eleves inscrit",
              route: routes.studentList,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Liste des eleves inactif",
              route: routes.studentList,
              customSubmenuTwo: false,
            },
            {
              menuValue: "Notes/Bulletin",
              route: routes.notes
            },
            {
              menuValue: "Livret Scolaire",
              route: routes.studentReportCard
            },
            {
              menuValue: "Liste des demande de transferer",
              route: routes.studentTransfer
            },
            {
              menuValue: 'Geo-Localisation et autres',
              route: routes.securitySettings,
              hasSubRoute: false,
              showSubRoute: false,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Années académiques',
              route: routes.academicYear,
              customSubmenuTwo: false,

            },
            {
              menuValue: "Types d'enseignements",
              route: routes.educationType,
              customSubmenuTwo: false,
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
          showSubRoute: false,
          page: 'base',
          hasSubRouteTwo: true,
          icon: 'staff',
          subMenus: [
            {
              menuValue: 'Ajouter un personnel',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Liste du Personnel',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Annuaire Telephonique',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Documents Administratifs',
              customSubmenuTwo: true,
              page: 'base2',
              subMenusTwo: [
                {
                  menuValue: 'Attestation de présence effective',
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Permission d'absence",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Notification de congés",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Attestation de service",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "Attestation de cessation de service",
                  route: '', // Add actual route if available
                },
                {
                  menuValue: "CV",
                  route: '', // Add actual route if available
                },
              ],
            },
            {
              menuValue: 'Ultilisateur et Role',
              customSubmenuTwo: true,
              page: 'base2',
              subMenusTwo: [
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
            {
              menuValue: 'Staffs',
              route: 'peoples/minebase/staffs',
              customSubmenuTwo: false,
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
          menuValue: 'Communications',
          showSubRoute: true,
          page: 'base',
          hasSubRoute: true,
          icon: 'speaker',
          subMenus: [
            {
              menuValue: "Pour les inspecteurs d'arrondissement",
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour les directeurs d'ecoles",
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour les enseignant",
              route: 'peoples/minebase/staffs',
            },
          ],
        },

        {
          menuValue: 'Rapports',
          hasSubRoute: false,
          showSubRoute: false,
          route: '',
          customSubmenuTwo: false,
          icon: 'file',
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
            { menuValue: 'Géolocalisation', route: routes.generalSettings },
            { menuValue: 'Administration des Classes', route: routes.classReport },
            { menuValue: 'Parametrage Bulletins', route: routes.reportCard },
            { menuValue: 'Frais Scolaires', route: routes.feesMaster },
            { menuValue: 'Emploi du temps', route: routes.classTimeTable },
            { menuValue: "Conseil d'etablissement", route: routes.classSyllabus },
            { menuValue: "Bureau APEE", route: routes.classSyllabus }
          ]
        },
        {
          menuValue: 'Gestion Élèves',
          icon: 'school',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: "Inscrire un Élèves", route: routes.studentsList },
            { menuValue: "Liste des Élèves", route: routes.studentsList },
            { menuValue: 'Transferts', route: routes.studentTransfer },
            { menuValue: 'Élèves Inactifs', route: routes.studentsList },
            { menuValue: 'Tableau Absences', route: routes.studentsList },
            { menuValue: 'Suivi Discipline', route: routes.studentsList },
            { menuValue: 'Promotions', route: routes.studentPromotion },
          ]
        },
        {
          menuValue: 'Notes',
          icon: 'notes',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Traitement des notes', route: routes.notes },
            { menuValue: 'Bulletins de notes', route: '' },
            { menuValue: 'Livret scolaire', route: '' }
          ]
        },
        {
          menuValue: 'Gestion des Personnels',
          icon: 'peoples',
          showSubRoute: false,
          page: 'base',
          hasSubRouteTwo: true,
          subMenus: [
            { menuValue: 'Ajouter un personnel', route: routes.addStaff, customSubmenuTwo: false },
            { menuValue: 'Liste des personnels', route: routes.staffList, customSubmenuTwo: false },
            { menuValue: 'Annuaire téléphonique', route: '', customSubmenuTwo: false },
            {
              menuValue: 'Documents administratifs',
              hasSubRoute: true,
              showSubRoute: false,
              customSubmenuTwo: true,
              subMenusTwo: [
                { menuValue: 'Attestation présence effective', route: '' },
                { menuValue: 'Permission absence', route: '' },
                { menuValue: 'Notification de congé', route: '' },
                { menuValue: 'Attestation de service', route: '' },
                { menuValue: 'Attestation de cessation de service', route: '' },
                { menuValue: 'CV', route: '' }
              ]
            },
            {
              menuValue: 'Ultilisateur et Role',
              customSubmenuTwo: true,
              page: 'base2',
              subMenusTwo: [
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
            { menuValue: 'Staff', route: '', customSubmenuTwo: false }
          ]
        },
        {
          menuValue: 'Gestion des classes',
          icon: 'school-bell',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Liste des classes', route: routes.classes },
            { menuValue: 'Projet pédagogique', route: routes.classHomeWork },
            { menuValue: 'Programme des cours', route: routes.scheduleClasses },
            { menuValue: 'Manuels au programme', route: '' },
            { menuValue: 'Matériel pédagogique', route: '' },
            { menuValue: 'Devoirs/Exercices', route: '' },
            { menuValue: 'Contrôle/Examens', route: '' },
            { menuValue: 'Gestion des absences', route: '' },
            { menuValue: 'Suivi des élèves/Discipline', route: '' }
          ]
        },
        {
          menuValue: 'Gestion des parents',
          icon: 'people',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            { menuValue: 'Parents et tuteurs', route: routes.pagesMain },
            { menuValue: 'Liste des parents/tuteurs', route: routes.parentList }
          ]
        },
        {
          menuValue: 'Communications',
          showSubRoute: true,
          page: 'base',
          hasSubRoute: true,
          icon: 'speaker',
          subMenus: [
            {
              menuValue: "Pour les enseignants",
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour les parents",
              route: 'peoples/minebase/staffs',
            },
            {
              menuValue: "Pour les élèves",
              route: 'peoples/minebase/staffs',
            },
          ],
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

      ]
    }
  ];
}
