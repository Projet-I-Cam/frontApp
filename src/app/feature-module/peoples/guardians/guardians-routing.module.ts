import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardiansComponent } from './guardians.component';
import { GuardianGridComponent } from './guardian-grid/guardian-grid.component';
import { GuardianListComponent } from './guardian-list/guardian-list.component';

const routes: Routes = [
  {
    path: '',
    component: GuardiansComponent,
    children: [
      {
        path: 'guardian-grid',
        component: GuardianGridComponent,
      },
      {
        path: 'guardian-list',
        component: GuardianListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuardiansRoutingModule {}
