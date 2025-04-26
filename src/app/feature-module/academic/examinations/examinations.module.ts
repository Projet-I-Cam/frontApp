import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExaminationsRoutingModule } from './examinations-routing.module';
import { ExaminationsComponent } from './examinations.component';
import { GradeComponent } from './grade/grade.component';
import { SharedModule } from '../../../shared/shared.module';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { ExamAttendanceComponent } from './exam-attendance/exam-attendance.component';
import { ExamResultsComponent } from './exam-results/exam-results.component';

@NgModule({
  declarations: [ExaminationsComponent, GradeComponent, ExamListComponent, ExamScheduleComponent, ExamAttendanceComponent, ExamResultsComponent],
  imports: [CommonModule, ExaminationsRoutingModule, SharedModule],
})
export class ExaminationsModule {}
