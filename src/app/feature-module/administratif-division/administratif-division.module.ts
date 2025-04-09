import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratifDivisionRoutingModule } from './administratif-division-routing.module';
import { RegionComponent } from './region/region.component';
import { DepartementComponent } from './departement/departement.component';
import { MunicipalitiesComponent } from './municipalities/municipalities.component';
import { SharedModule } from '../../shared/shared.module';
import { AdministratifDivisionComponent } from './administratif-division.component';


@NgModule({
  declarations: [
    RegionComponent,
    DepartementComponent,
    MunicipalitiesComponent,
    AdministratifDivisionComponent
  ],
  imports: [
    CommonModule,
    AdministratifDivisionRoutingModule,
    SharedModule
  ]
})
export class AdministratifDivisionModule { }
