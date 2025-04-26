import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { ClassReportComponent } from './class-report/class-report.component';
import { SharedModule } from '../../shared/shared.module';
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


@NgModule({
  declarations: [
    ReportsComponent,
    AttendanceReportComponent,
    ClassReportComponent,
    DailyAttendanceComponent,
    FeesReportComponent,
    GradeReportComponent,
    StaffDayWiseComponent,
    StudentAttendanceTypeComponent,
    StaffReportComponent,
    LeaveReportComponent,
    StaffReportComponent,
    TeacherDayWiseComponent,
    TeacherReportComponent,
    StudentDayWiseComponent,
    StudentReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ]
})
export class ReportsModule { }
