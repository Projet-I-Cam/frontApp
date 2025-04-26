import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrativeDivisionComponent } from './administrative-division.component';
import { RegionComponent } from './region/region.component';
import { DepartmentComponent } from './department/department.component';
import { MunicipalitiesComponent } from './municipalities/municipalities.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrativeDivisionComponent,
    children: [
      { path: 'regions', component: RegionComponent },
      { path: 'region/:id', component: DepartmentComponent },

      { path: 'departments', component: DepartmentComponent },
      { path: 'department/:id', component: MunicipalitiesComponent },

      { path: 'municipalities', component: MunicipalitiesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativeDivisionRoutingModule { }
