import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';
import { ContactMessagesComponent } from './contact-messages/contact-messages.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    SupportComponent,
    ContactMessagesComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    SharedModule
  ]
})
export class SupportModule { }
