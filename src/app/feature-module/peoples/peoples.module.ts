import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeoplesRoutingModule } from './peoples-routing.module';
import { PeoplesComponent } from './peoples.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    PeoplesComponent
  ],
  imports: [
    CommonModule,
    PeoplesRoutingModule,
    SharedModule
  ]
})
export class PeoplesModule { }
