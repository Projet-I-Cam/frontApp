import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentPromotionComponent } from './student-promotion/student-promotion.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentTransferComponent } from './student-transfer/student-transfer.component';
import { StudentReportCardComponent } from './student-report-card/student-report-card.component';
import { StudentTimeTableComponent } from './student-time-table/student-time-table.component';
import { StudentLeavesComponent } from './student-leaves/student-leaves.component';
import { StudentFeesComponent } from './student-fees/student-fees.component';
import { StudentLibraryComponent } from './student-library/student-library.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    children: [
      {
        path: 'edit-student',
        component: EditStudentComponent,
      },
      {
        path: 'add-student',
        component: AddStudentComponent,
      },
      {
        path: 'students-list',
        component: StudentsListComponent,
      },
      {
        path: 'student-promotion',
        component: StudentPromotionComponent,
      },
      {
        path: 'student-details',
        component: StudentDetailsComponent,
      },
      {
        path: 'student-transfer',
        component: StudentTransferComponent,
      },
      {
        path: 'student-report-card',
        component: StudentReportCardComponent,
      },
      {
        path: 'student-time-table',
        component: StudentTimeTableComponent,
      },
      {
        path: 'student-leaves',
        component: StudentLeavesComponent,
      },
      {
        path: 'student-fees',
        component: StudentFeesComponent,
      },
      {
        path: 'student-library',
        component: StudentLibraryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
