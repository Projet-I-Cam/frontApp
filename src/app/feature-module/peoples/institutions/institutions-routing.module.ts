import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionsComponent } from './institutions.component';
import { InstitutionsListComponent } from './institutions-list/institutions-list.component';
import { AddInstitutionComponent } from './add-institution/add-institution.component';
import { InstitutionDetailsComponent } from './institution-details/institution-details.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutionsComponent,
    children: [
      {
        path: 'institution-details/:id',
        component: InstitutionDetailsComponent
      },
      {
        path: 'institutions-list',
        component: InstitutionsListComponent
      },
      {
        path: 'add-institution',
        component: AddInstitutionComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionsRoutingModule { }
