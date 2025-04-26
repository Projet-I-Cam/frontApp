import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeacherLeavesComponent } from './teacher-leaves/teacher-leaves.component';
import { TeacherLibraryComponent } from './teacher-library/teacher-library.component';
import { TeacherSalaryComponent } from './teacher-salary/teacher-salary.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeachersRoutineComponent } from './teachers-routine/teachers-routine.component';
import { TeacherAssignmentsComponent } from './teacher-assignments/teacher-assignments.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersComponent,
    children: [
      {
        path: '',
        redirectTo: 'teachers-list',
        pathMatch: 'full'
      },
      {
        path: 'teachers-list',
        component: TeachersListComponent,
      },
      {
        path: 'add-teacher',
        component: AddTeacherComponent,
      },
      {
        path: 'edit-teacher/:id',
        component: EditTeacherComponent,
      },
      {
        path: 'teacher-details/:id',
        component: TeacherDetailsComponent,
      },
      {
        path: 'teacher-leaves/:id',
        component: TeacherLeavesComponent,
      },
      {
        path: 'teacher-salary/:id',
        component: TeacherSalaryComponent,
      },
      {
        path: 'teacher-library/:id',
        component: TeacherLibraryComponent,
      },
      {
        path: 'teachers-routine/:id',
        component: TeachersRoutineComponent,
      },
      {
        path: 'teacher-assignments',
        component: TeacherAssignmentsComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
