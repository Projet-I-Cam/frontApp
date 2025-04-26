import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffsModuleRoutingModule } from './staffs-module-routing.module';
import { StaffsListComponent } from './staffs-list/staffs-list.component';
import { StaffsCreateComponent } from './staffs-create/staffs-create.component';
import { StaffsDetailsComponent } from './staffs-details/staffs-details.component';
import { StaffsFunctionComponent } from './staffs-function/staffs-function.component';
import { StaffsAffectationComponent } from './staffs-affectation/staffs-affectation.component';
import { StaffsModuleComponent } from './staffs-module.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    StaffsListComponent,
    StaffsCreateComponent,
    StaffsDetailsComponent,
    StaffsFunctionComponent,
    StaffsAffectationComponent,
    StaffsModuleComponent,
  ],
  imports: [
    CommonModule,
    StaffsModuleRoutingModule,
    SharedModule,
  ]
})
export class StaffsModule { }
