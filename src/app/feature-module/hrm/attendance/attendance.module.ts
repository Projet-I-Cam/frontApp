import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { SharedModule } from '../../../shared/shared.module';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';
import { TeacherAttendanceComponent } from './teacher-attendance/teacher-attendance.component';
import { StaffsAttendanceComponent } from './staffs-attendance/staffs-attendance.component';

@NgModule({
  declarations: [
    AttendanceComponent,
    StudentAttendanceComponent,
    StaffAttendanceComponent,
    TeacherAttendanceComponent,
    StaffsAttendanceComponent,
  ],
  imports: [CommonModule, AttendanceRoutingModule, SharedModule],
})
export class AttendanceModule {}
