import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { TeacherGridComponent } from './teacher-grid/teacher-grid.component';
import { TeacherLeavesComponent } from './teacher-leaves/teacher-leaves.component';
import { TeacherLibraryComponent } from './teacher-library/teacher-library.component';
import { TeacherSalaryComponent } from './teacher-salary/teacher-salary.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeachersRoutineComponent } from './teachers-routine/teachers-routine.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersComponent,
    children: [
      {
        path: 'add-teacher',
        component: AddTeacherComponent,
      },
      {
        path: 'edit-teacher',
        component: EditTeacherComponent,
      },
      {
        path: 'teacher-details',
        component: TeacherDetailsComponent,
      },
      {
        path: 'teacher-grid',
        component: TeacherGridComponent,
      },
      {
        path: 'teacher-leaves',
        component: TeacherLeavesComponent,
      },
      {
        path: 'teacher-library',
        component: TeacherLibraryComponent,
      },
      {
        path: 'teacher-salary',
        component: TeacherSalaryComponent,
      },
      {
        path: 'teachers-list',
        component: TeachersListComponent,
      },
      {
        path: 'teachers-routine',
        component: TeachersRoutineComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
