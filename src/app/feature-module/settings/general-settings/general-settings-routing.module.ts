import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralSettingsComponent } from './general-settings.component';
import { ConnectedAppsComponent } from './connected-apps/connected-apps.component';
import { NotificationsSettingsComponent } from './notifications-settings/notifications-settings.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { SecuritySettingsComponent } from './security-settings/security-settings.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralSettingsComponent,
    children: [
      {
        path: 'connected-apps',
        component: ConnectedAppsComponent,
      },
      {
        path: 'notification-settings',
        component: NotificationsSettingsComponent,
      },
      {
        path: 'profile-settings',
        component: ProfileSettingsComponent,
      },
      {
        path: 'security-settings',
        component: SecuritySettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralSettingsRoutingModule {}
