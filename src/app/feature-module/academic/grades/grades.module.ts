import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GradesRoutingModule } from './grades-routing.module';
import { GradesComponent } from './grades.component';
import { GradeEntryComponent } from './grade-entry/grade-entry.component';
import { GradeCalculationComponent } from './grade-calculation/grade-calculation.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { CustomPaginationModule } from '../../../shared/custom-pagination/custom-pagination.module';
import {GradeModalComponent} from "../../../grade-modal/grade-modal.component";

@NgModule({
  declarations: [
    GradesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    GradesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    BsDatepickerModule,
    DropdownModule,
    CustomPaginationModule,
    GradeEntryComponent,
    GradeCalculationComponent,
    ReportCardComponent,
    GradeModalComponent
  ]
})
export class GradesModule { }
