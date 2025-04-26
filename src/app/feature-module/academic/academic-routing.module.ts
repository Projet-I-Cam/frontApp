import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicComponent } from './academic.component';
import { AcademicReasonsComponent } from './academic-reasons/academic-reasons.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { ClassSectionComponent } from './class-section/class-section.component';
import { ClassRoutineComponent } from './class-routine/class-routine.component';
import { ClassTimeTableComponent } from './class-time-table/class-time-table.component';
import { ClassSyllabusComponent } from './class-syllabus/class-syllabus.component';
import { ClassSubjectComponent } from './class-subject/class-subject.component';
import { ClassHomeWorkComponent } from './class-home-work/class-home-work.component';
import { ExamScheduleComponent } from './examinations/exam-schedule/exam-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: AcademicComponent,
    children: [
      {
        path: 'classes',
        loadChildren: () =>
          import('./classes/classes.module').then((m) => m.ClassesModule),
      },
      {
        path: 'academic-reasons',
        component: AcademicReasonsComponent,
      },
      {
        path: 'class-room',
        component: ClassroomComponent,
      },
      {
        path: 'class-section',
        component: ClassSectionComponent,
      },
      {
        path: 'class-routine',
        component: ClassRoutineComponent,
      },
      {
        path: 'class-time-table',
        component: ClassTimeTableComponent,
      },
      {
        path: 'class-syllabus',
        component: ClassSyllabusComponent,
      },
      {
        path: 'class-subject',
        component: ClassSubjectComponent,
      },
      {
        path: 'class-home-work',
        component: ClassHomeWorkComponent,
      },
      {
        path: 'examinations',
        loadChildren: () =>
          import('./examinations/examinations.module').then(
            (m) => m.ExaminationsModule
          ),
      },
      {
        path: 'exam-schedule',
        component: ExamScheduleComponent
      },
      {
        path: 'grades',
        loadChildren: () =>
          import('./grades/grades.module').then((m) => m.GradesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicRoutingModule {}
