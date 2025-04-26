import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { SharedModule } from '../../../shared/shared.module';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeacherLeavesComponent } from './teacher-leaves/teacher-leaves.component';
import { TeacherLibraryComponent } from './teacher-library/teacher-library.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeacherSalaryComponent } from './teacher-salary/teacher-salary.component';
import { TeachersRoutineComponent } from './teachers-routine/teachers-routine.component';
import { TeacherAssignmentsComponent } from './teacher-assignments/teacher-assignments.component';


@NgModule({
  declarations: [
    TeachersComponent,
    AddTeacherComponent,
    TeacherLeavesComponent,
    TeacherLibraryComponent,
    TeacherSalaryComponent,
    TeachersRoutineComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeachersRoutingModule,
    SharedModule,
    TeacherAssignmentsComponent,
    TeachersListComponent,
    EditTeacherComponent,
    TeacherDetailsComponent
  ]
})
export class TeachersModule { }
