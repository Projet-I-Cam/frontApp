import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemSettingsRoutingModule } from './system-settings-routing.module';
import { SystemSettingsComponent } from './system-settings.component';
import { EmailSettingsComponent } from './email-settings/email-settings.component';
import { EmailTemplatesComponent } from './email-templates/email-templates.component';
import { SharedModule } from '../../../shared/shared.module';
import { GdprCookiesComponent } from './gdpr-cookies/gdpr-cookies.component';
import { OtpSettingsComponent } from './otp-settings/otp-settings.component';
import { SmsSettingsComponent } from './sms-settings/sms-settings.component';


@NgModule({
  declarations: [
    SystemSettingsComponent,
    EmailSettingsComponent,
    EmailTemplatesComponent,
    GdprCookiesComponent,
    OtpSettingsComponent,
    SmsSettingsComponent
  ],
  imports: [
    CommonModule,
    SystemSettingsRoutingModule,
    SharedModule
  ]
})
export class SystemSettingsModule { }
