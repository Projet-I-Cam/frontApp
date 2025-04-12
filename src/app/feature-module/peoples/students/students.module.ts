import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { SharedModule } from '../../../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';

import { StudentService } from '../../../services/student.service';
import { PersonService } from '../../../services/person.service';
import { ClassService } from '../../../services/class.service';
import { EditStudentModule } from './edit-student/edit-student.module';
import { AddStudentModule } from './add-student/add-student.module';

@NgModule({
  declarations: [
    StudentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StudentsRoutingModule,
    SharedModule,
    DropdownModule,
    CalendarModule,
    ChipsModule,
    HttpClientModule,
    EditStudentModule,
    AddStudentModule
  ],
  providers: [
    StudentService,
    PersonService,
    ClassService
  ]
})
export class StudentsModule { }
