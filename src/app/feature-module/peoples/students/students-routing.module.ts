import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentResultComponent } from './student-result/student-result.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { StudentTimeTableComponent } from './student-time-table/student-time-table.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentFeesComponent } from './student-fees/student-fees.component';
import { StudentLibraryComponent } from './student-library/student-library.component';
import { StudentLeavesComponent } from './student-leaves/student-leaves.component';
import { StudentPromotionComponent } from './student-promotion/student-promotion.component';
import { StudentGridComponent } from './student-grid/student-grid.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    children: [
      {
        path: 'student-result',
        component: StudentResultComponent,
      },
      {
        path: 'edit-student',
        component: EditStudentComponent,
      },
      {
        path: 'add-student',
        component: AddStudentComponent,
      },
      {
        path: 'student-time-table',
        component: StudentTimeTableComponent,
      },
      {
        path: 'students-list',
        component: StudentsListComponent,
      },
      {
        path: 'student-fees',
        component: StudentFeesComponent,
      },
      {
        path: 'student-library',
        component: StudentLibraryComponent,
      },
      {
        path: 'student-leaves',
        component: StudentLeavesComponent,
      },
      {
        path: 'student-promotion',
        component: StudentPromotionComponent,
      },
      {
        path: 'student-grid',
        component: StudentGridComponent,
      },
      {
        path: 'student-details',
        component: StudentDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
