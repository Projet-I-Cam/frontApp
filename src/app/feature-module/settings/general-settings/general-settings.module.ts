import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralSettingsRoutingModule } from './general-settings-routing.module';
import { GeneralSettingsComponent } from './general-settings.component';
import { ConnectedAppsComponent } from './connected-apps/connected-apps.component';
import { SharedModule } from '../../../shared/shared.module';
import { NotificationsSettingsComponent } from './notifications-settings/notifications-settings.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { SecuritySettingsComponent } from './security-settings/security-settings.component';


@NgModule({
  declarations: [
    GeneralSettingsComponent,
    ConnectedAppsComponent,
    NotificationsSettingsComponent,
    ProfileSettingsComponent,
    SecuritySettingsComponent
  ],
  imports: [
    CommonModule,
    GeneralSettingsRoutingModule,
    SharedModule
  ]
})
export class GeneralSettingsModule { }
