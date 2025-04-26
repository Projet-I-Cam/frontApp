import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffsModuleComponent } from './staffs-module.component';
import { StaffsListComponent } from './staffs-list/staffs-list.component';
import { StaffsCreateComponent } from './staffs-create/staffs-create.component';
import { StaffsDetailsComponent } from './staffs-details/staffs-details.component';
import { StaffsFunctionComponent } from './staffs-function/staffs-function.component';
import { StaffsAffectationComponent } from './staffs-affectation/staffs-affectation.component';

const routes: Routes = [
  {
    path: '',
    component: StaffsModuleComponent,
    children: [
      {
        path: 'staffs',
        component: StaffsListComponent
      },
      {
        path: 'staffs/create',
        component: StaffsCreateComponent
      },
      {
        path: 'staffs/functions',
        component: StaffsFunctionComponent
      },
      {
        path: 'staffs/:id',
        component: StaffsDetailsComponent
      },
      {
        path: 'staffs/affectation/:id',
        component: StaffsAffectationComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffsModuleRoutingModule { }
