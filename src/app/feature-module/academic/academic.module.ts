import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicRoutingModule } from './academic-routing.module';
import { AcademicComponent } from './academic.component';
import { ClassHomeWorkComponent } from './class-home-work/class-home-work.component';
import { AcademicReasonsComponent } from './academic-reasons/academic-reasons.component';
import { SharedModule } from '../../shared/shared.module';
import { ClassroomComponent } from './classroom/classroom.component';
import { ClassRoutineComponent } from './class-routine/class-routine.component';
import { ClassSectionComponent } from './class-section/class-section.component';
import { ClassSubjectComponent } from './class-subject/class-subject.component';
import { ClassSyllabusComponent } from './class-syllabus/class-syllabus.component';
import { ClassTimeTableComponent } from './class-time-table/class-time-table.component';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { SkeletonModule } from 'primeng/skeleton';
import { EducationTypeComponent } from './education-type/education-type.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { StudentsModule } from "../peoples/students/students.module";


@NgModule({
  declarations: [
    AcademicComponent,
    ClassHomeWorkComponent,
    AcademicReasonsComponent,
    ClassroomComponent,
    ClassRoutineComponent,
    ClassSectionComponent,
    ClassSubjectComponent,
    ClassSyllabusComponent, 
    ClassTimeTableComponent, AcademicYearComponent, EducationTypeComponent
  ],
  imports: [
    CommonModule,
    AcademicRoutingModule,
    SharedModule, SkeletonModule, NgSelectModule,
    StudentsModule
]
})
export class AcademicModule { }
