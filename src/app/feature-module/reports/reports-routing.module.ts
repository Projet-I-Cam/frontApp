import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { ClassReportComponent } from './class-report/class-report.component';
import { DailyAttendanceComponent } from './daily-attendance/daily-attendance.component';
import { FeesReportComponent } from './fees-report/fees-report.component';
import { GradeReportComponent } from './grade-report/grade-report.component';
import { StaffDayWiseComponent } from './staff-day-wise/staff-day-wise.component';
import { StudentAttendanceTypeComponent } from './student-attendance-type/student-attendance-type.component';
import { StaffReportComponent } from './staff-report/staff-report.component';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import { TeacherDayWiseComponent } from './teacher-day-wise/teacher-day-wise.component';
import { TeacherReportComponent } from './teacher-report/teacher-report.component';
import { StudentDayWiseComponent } from './student-day-wise/student-day-wise.component';
import { StudentReportComponent } from './student-report/student-report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'attendance-report',
        component: AttendanceReportComponent,
      },
      {
        path: 'class-report',
        component: ClassReportComponent,
      },
      {
        path: 'daily-attendance',
        component: DailyAttendanceComponent,
      },
      {
        path: 'fees-report',
        component: FeesReportComponent,
      },
      {
        path: 'grade-report',
        component: GradeReportComponent,
      },

      {
        path: 'staff-day-wise',
        component: StaffDayWiseComponent,
      },

      {
        path: 'student-attendance-type',
        component: StudentAttendanceTypeComponent,
      },
      {
        path: 'staff-report',
        component: StaffReportComponent,
      },
      {
        path: 'leave-report',
        component: LeaveReportComponent,
      },
      {
        path: 'teacher-day-wise',
        component: TeacherDayWiseComponent,
      },
      {
        path: 'teacher-report',
        component: TeacherReportComponent,
      },
      {
        path: 'student-day-wise',
        component: StudentDayWiseComponent,
      },
      {
        path: 'student-report',
        component: StudentReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
