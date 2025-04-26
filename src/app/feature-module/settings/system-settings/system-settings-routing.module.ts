import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemSettingsComponent } from './system-settings.component';
import { EmailSettingsComponent } from './email-settings/email-settings.component';
import { EmailTemplatesComponent } from './email-templates/email-templates.component';
import { GdprCookiesComponent } from './gdpr-cookies/gdpr-cookies.component';
import { OtpSettingsComponent } from './otp-settings/otp-settings.component';
import { SmsSettingsComponent } from './sms-settings/sms-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SystemSettingsComponent,
    children: [
      { path: 'email-settings', component: EmailSettingsComponent },
      { path: 'email-templates', component: EmailTemplatesComponent },
      { path: 'gdpr-cookies', component: GdprCookiesComponent },
      { path: 'otp-settings', component: OtpSettingsComponent },
      { path: 'sms-settings', component: SmsSettingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemSettingsRoutingModule {}
