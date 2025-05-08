import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InstitutionsRoutingModule } from './institutions-routing.module';
import { InstitutionsComponent } from './institutions.component';
import { InstitutionsListComponent } from './institutions-list/institutions-list.component';
import { AddInstitutionComponent } from './add-institution/add-institution.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { InstitutionDetailsComponent } from './institution-details/institution-details.component';
import { AcademicYearComponent } from '../../academic/academic-year/academic-year.component';
import { DropdownModule } from 'primeng/dropdown';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [
    InstitutionsListComponent,
    InstitutionDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    InstitutionsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    InstitutionsComponent,
    AddInstitutionComponent,
    DropdownModule
  ],
  exports: [
    InstitutionsListComponent,
    InstitutionDetailsComponent,
  ]
})
export class InstitutionsModule { }
