import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentPromotionComponent } from './student-promotion/student-promotion.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentTransferComponent } from './student-transfer/student-transfer.component';
import { StudentReportCardComponent } from './student-report-card/student-report-card.component';
import { StudentTimeTableComponent } from './student-time-table/student-time-table.component';
import { StudentLeavesComponent } from './student-leaves/student-leaves.component';
import { StudentFeesComponent } from './student-fees/student-fees.component';
import { StudentLibraryComponent } from './student-library/student-library.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { StudentGridComponent } from './student-grid/student-grid.component';
import { MyStudentsComponent } from './my-students/my-students.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentReinscriptionComponent } from './student-reinscription/student-reinscription.component';
import { StudentUnregisteredListComponent } from './student-unregistered-list/student-unregistered-list.component';
import { StudentsAbscenceListComponent } from './students-abscence-list/students-abscence-list.component';
import { StudentsBehaviourListComponent } from './students-behaviour-list/students-behaviour-list.component';

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
        path: 'reinscription',
        component: StudentReinscriptionComponent,
      },
      {
        path: 'student-grid',
        component: StudentGridComponent,
      },
      {
        path: 'student-list',
        component: StudentListComponent,
      },
      {
        path: 'student-promotion',
        component: StudentPromotionComponent,
      },
      {
        path: 'student-details/:id',
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
      {
        path: 'my-students',
        component: MyStudentsComponent,
      },
      {
        path: 'list-unregistered-students',
        component: StudentUnregisteredListComponent,
      },
      {
        path: 'absence-list',
        component: StudentsAbscenceListComponent,
      },
      {
        path: 'discipline-list',
        component: StudentsBehaviourListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule { }
