import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvancedUiRoutingModule } from './advanced-ui-routing.module';
import { AdvancedUiComponent } from './advanced-ui.component';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    AdvancedUiComponent
  ],
  imports: [
    CommonModule,
    AdvancedUiRoutingModule,
    SharedModule
  ]
})
export class AdvancedUiModule { }
