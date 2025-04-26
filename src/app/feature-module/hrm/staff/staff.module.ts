import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { StaffLeavesComponent } from './staff-leaves/staff-leaves.component';
import { StaffPayrollComponent } from './staff-payroll/staff-payroll.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { SharedModule } from '../../../shared/shared.module';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { StaffListComponent } from './staff-list/staff-list.component';


@NgModule({
  declarations: [
    StaffComponent,
    StaffDetailsComponent,
    StaffLeavesComponent,
    StaffPayrollComponent,
    AddStaffComponent,
    EditStaffComponent,
    StaffListComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule
  ]
})
export class StaffModule { }
