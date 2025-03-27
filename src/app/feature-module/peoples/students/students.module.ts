import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { SharedModule } from '../../../shared/shared.module';

import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentPromotionComponent } from './student-promotion/student-promotion.component';
import { StudentTimeTableComponent } from './student-time-table/student-time-table.component';
import { StudentLeavesComponent } from './student-leaves/student-leaves.component';
import { StudentFeesComponent } from './student-fees/student-fees.component';
import { StudentLibraryComponent } from './student-library/student-library.component';
import { StudentTransferComponent } from './student-transfer/student-transfer.component';
import { StudentReportCardComponent } from './student-report-card/student-report-card.component';


@NgModule({
  declarations: [
    StudentsComponent,
    EditStudentComponent,
    AddStudentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    StudentsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StudentTimeTableComponent,
    StudentLeavesComponent,
    StudentFeesComponent,
    StudentLibraryComponent,
    StudentTransferComponent,
    StudentReportCardComponent,
    StudentDetailsComponent,
    StudentPromotionComponent,
    StudentsListComponent
  ]
})
export class StudentsModule { }
