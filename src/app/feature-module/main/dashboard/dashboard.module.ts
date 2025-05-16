import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SharedModule } from '../../../shared/shared.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { ParentDashboardComponent } from './parent-dashboard/parent-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DashboardMinedubComponent } from './dashboard-minedub/dashboard-minedub.component';
import { MyStudentsComponent } from '../../peoples/students/my-students/my-students.component';
import { StudentsModule } from '../../peoples/students/students.module';
import { StudentListHomeworksComponent } from '../../peoples/students/student-list-homeworks/student-list-homeworks.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    ParentDashboardComponent,
    TeacherDashboardComponent,
    StudentDashboardComponent,
    DashboardMainComponent,
    DashboardMinedubComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StudentsModule,
      //...
      NgCircleProgressModule.forRoot({
        "radius": 60,
        "space": -10,
        "outerStrokeGradient": true,
        "outerStrokeWidth": 10,
        "outerStrokeColor": "#4882c2",
        "outerStrokeGradientStopColor": "#53a9ff",
        "innerStrokeColor": "#e7e8ea",
        "innerStrokeWidth": 10,
        "title": "UI",
        "animateTitle": false,
        "animationDuration": 1000,
        "showUnits": false,
        "showBackground": false,
        "clockwise": false,
        "startFromZero": false,
        "lazy": true})
  
  ],
  exports: [
    DashboardMainComponent,
    DashboardMinedubComponent,
  ]
})
export class DashboardModule { }
