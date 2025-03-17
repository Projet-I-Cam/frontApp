import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { ClassListComponent } from './class-list/class-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { ScheduleClassesComponent } from './schedule-classes/schedule-classes.component';



@NgModule({
  declarations: [
    ClassesComponent,
    ClassListComponent,
    ScheduleClassesComponent,
    
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    SharedModule
  ]
})
export class ClassesModule { }
