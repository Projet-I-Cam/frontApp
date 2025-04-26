import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeesCollectionRoutingModule } from './fees-collection-routing.module';
import { FeesCollectionComponent } from './fees-collection.component';
import { FeesGroupComponent } from './fees-group/fees-group.component';
import { FeesMasterComponent } from './fees-master/fees-master.component';
import { FeesTypeComponent } from './fees-type/fees-type.component';
import { SharedModule } from '../../../shared/shared.module';
import { CollectFeesComponent } from './collect-fees/collect-fees.component';
import { FeesAssignComponent } from './fees-assign/fees-assign.component';


@NgModule({
  declarations: [
    FeesCollectionComponent,
    FeesGroupComponent,
    FeesMasterComponent,
    FeesTypeComponent,
    CollectFeesComponent,
    FeesAssignComponent
  ],
  imports: [
    CommonModule,
    FeesCollectionRoutingModule,
    SharedModule
  ]
})
export class FeesCollectionModule { }
