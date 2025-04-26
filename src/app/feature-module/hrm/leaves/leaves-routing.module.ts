import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavesComponent } from './leaves.component';
import { ApproveRequestComponent } from './approve-request/approve-request.component';
import { ListLeavesComponent } from './list-leaves/list-leaves.component';

const routes: Routes = [
  {
    path: '',
    component: LeavesComponent,
    children: [
      {
        path: 'approve-request',
        component: ApproveRequestComponent,
      },
      {
        path: 'list-leaves',
        component: ListLeavesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavesRoutingModule {}
