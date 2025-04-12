import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativeDivisionRoutingModule } from './administrative-division-routing.module';
import { RegionComponent } from './region/region.component';
import { DepartmentComponent } from './department/department.component';
import { MunicipalitiesComponent } from './municipalities/municipalities.component';
import { SharedModule } from '../../shared/shared.module';
import { AdministrativeDivisionComponent } from './administrative-division.component';


@NgModule({
  declarations: [
    RegionComponent,
    DepartmentComponent,
    MunicipalitiesComponent,
    AdministrativeDivisionComponent
  ],
  imports: [
    CommonModule,
    AdministrativeDivisionRoutingModule,
    SharedModule
  ]
})
export class AdministrativeDivisionModule { } 