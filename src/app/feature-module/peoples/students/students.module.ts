import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentGridComponent } from './student-grid/student-grid.component';
import { SharedModule } from '../../../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { StudentService } from '../../../services/student.service';
import { PersonService } from '../../../services/person.service';
import { EditStudentModule } from './edit-student/edit-student.module';
import { AddStudentComponent } from './add-student/add-student.component';
import { MyStudentsComponent } from './my-students/my-students.component';
import {StudentDetailsComponent} from './student-details/student-details.component'
import {StudentTimeTableComponent} from './student-time-table/student-time-table.component'
import {StudentLeavesComponent} from './student-leaves/student-leaves.component'
import {StudentFeesComponent} from './student-fees/student-fees.component'
import {StudentResultComponent} from './student-result/student-result.component'
import {StudentReportCardComponent} from './student-report-card/student-report-card.component';
import { StudentListHomeworksComponent } from './student-list-homeworks/student-list-homeworks.component'
import { StudentInfosComponent } from './student-infos/student-infos.component';
import { StudentSchoolComponent } from './student-school/student-school.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentReinscriptionComponent } from './student-reinscription/student-reinscription.component';
import { StudentUnregisteredListComponent } from './student-unregistered-list/student-unregistered-list.component';
import { StudentsAbscenceListComponent } from './students-abscence-list/students-abscence-list.component';
import { StudentsBehaviourListComponent } from './students-behaviour-list/students-behaviour-list.component'
@NgModule({
  declarations: [
    MyStudentsComponent,
    StudentDetailsComponent,
    StudentTimeTableComponent,
    StudentLeavesComponent,
    StudentFeesComponent,
    StudentResultComponent,
    StudentReportCardComponent,
    StudentListHomeworksComponent,
    StudentInfosComponent,
    StudentSchoolComponent,
    AddStudentComponent,
    StudentListComponent,
    StudentReinscriptionComponent,
    StudentUnregisteredListComponent,
    StudentsAbscenceListComponent,
    StudentsBehaviourListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StudentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DropdownModule,
    CalendarModule,
    ChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    EditStudentModule,
    StudentsComponent,
    StudentGridComponent,
  ],
  providers: [
    StudentService,
    PersonService
  ],
  exports:[
    MyStudentsComponent,
     StudentTimeTableComponent,
     StudentLeavesComponent,
     StudentFeesComponent,
     StudentResultComponent,
     StudentReportCardComponent,
     StudentListHomeworksComponent,
     StudentInfosComponent,
     StudentDetailsComponent,
     StudentSchoolComponent,
     AddStudentComponent,
     StudentListComponent,
     StudentReinscriptionComponent,
     StudentUnregisteredListComponent,
     StudentsAbscenceListComponent,
     StudentsBehaviourListComponent,

  ]
})
export class StudentsModule { }
