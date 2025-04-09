import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratifDivisionComponent } from './administratif-division.component';
import { RegionComponent } from './region/region.component';
import { DepartementComponent } from './departement/departement.component';
import { MunicipalitiesComponent } from './municipalities/municipalities.component';

const routes: Routes = [
  {
    path: '',
    component: AdministratifDivisionComponent,
    children: [
      {
        path: 'regions',
        component: RegionComponent,
      },
      {
        path: 'departements',
        component: DepartementComponent,
      },
      {
        path: 'municipalities',
        component: MunicipalitiesComponent,

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratifDivisionRoutingModule { }
