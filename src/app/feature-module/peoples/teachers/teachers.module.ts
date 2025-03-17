import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { SharedModule } from '../../../shared/shared.module';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeacherGridComponent } from './teacher-grid/teacher-grid.component';
import { TeacherLeavesComponent } from './teacher-leaves/teacher-leaves.component';
import { TeacherLibraryComponent } from './teacher-library/teacher-library.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeacherSalaryComponent } from './teacher-salary/teacher-salary.component';
import { TeachersRoutineComponent } from './teachers-routine/teachers-routine.component';


@NgModule({
  declarations: [
    TeachersComponent,
    AddTeacherComponent,
    EditTeacherComponent,
    TeacherDetailsComponent,
    TeacherGridComponent,
    TeacherLeavesComponent,
    TeacherLibraryComponent,
    TeachersListComponent,
    TeacherSalaryComponent,
    TeachersRoutineComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    SharedModule
  ]
})
export class TeachersModule { }
