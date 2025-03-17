import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipComponent } from './membership.component';
import { MembershipAddonsComponent } from './membership-addons/membership-addons.component';
import { MembershipTransactionsComponent } from './membership-transactions/membership-transactions.component';
import { MembershipPlansComponent } from './membership-plans/membership-plans.component';

const routes: Routes = [
  {
    path: '',
    component: MembershipComponent,
    children: [
      {
        path: 'membership-transactions',
        component: MembershipTransactionsComponent,
      },
      {
        path: 'membership-addons',
        component: MembershipAddonsComponent,
      },
      {
        path: 'membership-plans',
        component: MembershipPlansComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembershipRoutingModule {}
