import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeEntryComponent } from './grade-entry/grade-entry.component';
import { GradeCalculationComponent } from './grade-calculation/grade-calculation.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { GradesComponent } from './grades.component';

const routes: Routes = [
  {
    path: '',
    component: GradesComponent,
    children: [
      {
        path: 'entry',
        component: GradeEntryComponent
      },
      {
        path: 'calculation',
        component: GradeCalculationComponent
      },
      {
        path: 'report-card',
        component: ReportCardComponent
      },
      {
        path: '',
        redirectTo: 'entry',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradesRoutingModule { } 