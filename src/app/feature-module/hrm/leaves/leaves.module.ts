import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeavesRoutingModule } from './leaves-routing.module';
import { LeavesComponent } from './leaves.component';
import { ApproveRequestComponent } from './approve-request/approve-request.component';
import { ListLeavesComponent } from './list-leaves/list-leaves.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [LeavesComponent, ApproveRequestComponent, ListLeavesComponent],
  imports: [CommonModule, LeavesRoutingModule, SharedModule],
})
export class LeavesModule {}
