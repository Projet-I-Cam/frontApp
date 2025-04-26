import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteSettingsRoutingModule } from './website-settings-routing.module';
import { WebsiteSettingsComponent } from './website-settings.component';
import { LocalizationComponent } from './localization/localization.component';
import { SharedModule } from '../../../shared/shared.module';
import { SocialAuthenticationComponent } from './social-authentication/social-authentication.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { PrefixesComponent } from './prefixes/prefixes.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { LanguageSettingsComponent } from './language-settings/language-settings.component';


@NgModule({
  declarations: [
    WebsiteSettingsComponent,
    LocalizationComponent,
    SocialAuthenticationComponent,
    CompanySettingsComponent,
    PrefixesComponent,
    PreferencesComponent,
    LanguageSettingsComponent
  ],
  imports: [
    CommonModule,
    WebsiteSettingsRoutingModule,
    SharedModule
  ]
})
export class WebsiteSettingsModule { }
