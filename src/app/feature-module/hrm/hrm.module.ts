import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmRoutingModule } from './hrm-routing.module';
import { HrmComponent } from './hrm.component';
import { SharedModule } from '../../shared/shared.module';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationComponent } from './designation/designation.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { PayrollComponent } from './payroll/payroll.component';


@NgModule({
  declarations: [
    HrmComponent,
    DepartmentsComponent,
    DesignationComponent,
    HolidaysComponent,
    PayrollComponent
  ],
  imports: [
    CommonModule,
    HrmRoutingModule,
    SharedModule
  ]
})
export class HrmModule { }
