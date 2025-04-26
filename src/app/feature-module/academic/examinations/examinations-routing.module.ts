import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationsComponent } from './examinations.component';
import { GradeComponent } from './grade/grade.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { ExamAttendanceComponent } from './exam-attendance/exam-attendance.component';
import { ExamResultsComponent } from './exam-results/exam-results.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationsComponent,
    children: [
      {
        path: 'grade',
        component: GradeComponent,
      },
      {
        path: 'exam-list',
        component: ExamListComponent,
      },
      {
        path: 'exam-schedule',
        component: ExamScheduleComponent,
      },
      {
        path: 'exam-attendance',
        component: ExamAttendanceComponent,
      },
      {
        path: 'exam-results',
        component: ExamResultsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExaminationsRoutingModule {}
