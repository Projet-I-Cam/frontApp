import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentResultComponent } from './student-result/student-result.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { SharedModule } from '../../../shared/shared.module';

import { StudentTimeTableComponent } from './student-time-table/student-time-table.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentGridComponent } from './student-grid/student-grid.component';
import { StudentPromotionComponent } from './student-promotion/student-promotion.component';
import { StudentLeavesComponent } from './student-leaves/student-leaves.component';
import { StudentLibraryComponent } from './student-library/student-library.component';
import { StudentFeesComponent } from './student-fees/student-fees.component';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentResultComponent,
    EditStudentComponent,
    StudentTimeTableComponent,
    AddStudentComponent,
    StudentsListComponent,
    StudentDetailsComponent,
    StudentGridComponent,
    StudentPromotionComponent,
    StudentLeavesComponent,
    StudentLibraryComponent,
    StudentFeesComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule
  ]
})
export class StudentsModule { }
