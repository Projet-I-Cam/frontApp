import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuardiansRoutingModule } from './guardians-routing.module';
import { GuardiansComponent } from './guardians.component';
import { GuardianGridComponent } from './guardian-grid/guardian-grid.component';
import { SharedModule } from '../../../shared/shared.module';
import { GuardianListComponent } from './guardian-list/guardian-list.component';


@NgModule({
  declarations: [
    GuardiansComponent,
    GuardianGridComponent,
    GuardianListComponent
  ],
  imports: [
    CommonModule,
    GuardiansRoutingModule,
    SharedModule
  ]
})
export class GuardiansModule { }
