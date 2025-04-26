import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsRoutingModule } from './parents-routing.module';
import { ParentsComponent } from './parents.component';
import { ParentsListComponent } from './parents-list/parents-list.component';
import { ParentGridComponent } from './parent-grid/parent-grid.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ParentsComponent,
    ParentsListComponent,
    ParentGridComponent
  ],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    SharedModule
  ]
})
export class ParentsModule { }
