import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeesCollectionComponent } from './fees-collection.component';
import { FeesGroupComponent } from './fees-group/fees-group.component';
import { FeesMasterComponent } from './fees-master/fees-master.component';
import { FeesTypeComponent } from './fees-type/fees-type.component';
import { CollectFeesComponent } from './collect-fees/collect-fees.component';
import { FeesAssignComponent } from './fees-assign/fees-assign.component';

const routes: Routes = [
  {
    path: '',
    component: FeesCollectionComponent,
    children: [
      {
        path: 'fees-group',
        component: FeesGroupComponent,
      },
      {
        path: 'fees-master',
        component: FeesMasterComponent,
      },
      {
        path: 'fees-type',
        component: FeesTypeComponent,
      },
      {
        path: 'collect-fees',
        component: CollectFeesComponent,
      },
      {
        path: 'fees-assign',
        component: FeesAssignComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeesCollectionRoutingModule {}
