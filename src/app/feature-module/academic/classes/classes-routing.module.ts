import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ScheduleClassesComponent } from './schedule-classes/schedule-classes.component';

const routes: Routes = [
  {
    path: '',
    component: ClassesComponent,
    children: [
      { path: 'class-list', component: ClassListComponent },
      { path: 'schedule-classes', component: ScheduleClassesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassesRoutingModule {}
