import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { StaffLeavesComponent } from './staff-leaves/staff-leaves.component';
import { StaffPayrollComponent } from './staff-payroll/staff-payroll.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { StaffListComponent } from './staff-list/staff-list.component';

const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
    children: [
      {
        path: 'staff-details',
        component: StaffDetailsComponent,
      },
      {
        path: 'staff-leaves',
        component: StaffLeavesComponent,
      },
      {
        path: 'staff-payroll',
        component: StaffPayrollComponent,
      },
      {
        path: 'add-staff',
        component: AddStaffComponent,
      },
      {
        path: 'edit-staff',
        component: EditStaffComponent,
      },
      {
        path: 'staff-list',
        component: StaffListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
