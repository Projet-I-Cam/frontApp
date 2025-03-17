import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';
import { TeacherAttendanceComponent } from './teacher-attendance/teacher-attendance.component';
import { StaffsAttendanceComponent } from './staffs-attendance/staffs-attendance.component';

const routes: Routes = [
  {
    path: '',
    component: AttendanceComponent,
    children: [
      { path: 'student-attendance', component: StudentAttendanceComponent },
      {
        path: 'staff-attendance',
        component: StaffAttendanceComponent,
      },
      {
        path: 'teacher-attendance',
        component: TeacherAttendanceComponent,
      },
      {
        path: 'staffs-attendance',
        component: StaffsAttendanceComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRoutingModule {}
