import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipRoutingModule } from './membership-routing.module';
import { MembershipComponent } from './membership.component';
import { MembershipAddonsComponent } from './membership-addons/membership-addons.component';
import { MembershipPlansComponent } from './membership-plans/membership-plans.component';
import { MembershipTransactionsComponent } from './membership-transactions/membership-transactions.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MembershipComponent,
    MembershipAddonsComponent,
    MembershipPlansComponent,
    MembershipTransactionsComponent
  ],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    SharedModule
  ]
})
export class MembershipModule { }
