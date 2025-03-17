import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeoplesComponent } from './peoples.component';

const routes: Routes = [
  {
    path: '',
    component: PeoplesComponent,
    children: [
      {
        path: 'teachers',
        loadChildren: () =>
          import('../peoples/teachers/teachers.module').then(
            (m) => m.TeachersModule
          ),
      },
      {
        path: 'students',
        loadChildren: () =>
          import('../peoples/students/students.module').then(
            (m) => m.StudentsModule
          ),
      },
      {
        path: 'guardians',
        loadChildren: () =>
          import('../peoples/guardians/guardians.module').then(
            (m) => m.GuardiansModule
          ),
      },
      {
        path: 'parents',
        loadChildren: () =>
          import('./parents/parents.module').then((m) => m.ParentsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeoplesRoutingModule {}
