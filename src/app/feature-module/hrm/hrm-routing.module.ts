import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrmComponent } from './hrm.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationComponent } from './designation/designation.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { PayrollComponent } from './payroll/payroll.component';

const routes: Routes = [
  {
    path: '',
    component: HrmComponent,
    children: [
      {
        path: 'leaves',
        loadChildren: () =>
          import('./leaves/leaves.module').then((m) => m.LeavesModule),
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
      },
      {
        path: 'designation',
        component: DesignationComponent,
      },
      {
        path: 'holidays',
        component: HolidaysComponent,
      },
      {
        path: 'payroll',
        component: PayrollComponent,
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./staff/staff.module').then((m) => m.StaffModule),
      },
      {
        path: 'attendance',
        loadChildren: () =>
          import('./attendance/attendance.module').then(
            (m) => m.AttendanceModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HrmRoutingModule {}
