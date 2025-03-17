import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteSettingsComponent } from './website-settings.component';
import { LocalizationComponent } from './localization/localization.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { SocialAuthenticationComponent } from './social-authentication/social-authentication.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { PrefixesComponent } from './prefixes/prefixes.component';
import { LanguageSettingsComponent } from './language-settings/language-settings.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteSettingsComponent,
    children: [
      { path: 'localization', component: LocalizationComponent },
      { path: 'company-settings', component: CompanySettingsComponent },
      {
        path: 'social-authentication',
        component: SocialAuthenticationComponent,
      },
      {
        path: 'preferences',
        component: PreferencesComponent,
      },
      {
        path: 'prefixes',
        component: PrefixesComponent,
      },
      {
        path: 'language-settings',
        component: LanguageSettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteSettingsRoutingModule {}
