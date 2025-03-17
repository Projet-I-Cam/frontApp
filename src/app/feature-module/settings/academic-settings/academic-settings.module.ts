import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicSettingsRoutingModule } from './academic-settings-routing.module';
import { AcademicSettingsComponent } from './academic-settings.component';
import { SchoolSettingsComponent } from './school-settings/school-settings.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReligionComponent } from './religion/religion.component';


@NgModule({
  declarations: [
    AcademicSettingsComponent,
    SchoolSettingsComponent,
    ReligionComponent
  ],
  imports: [
    CommonModule,
    AcademicSettingsRoutingModule,
    SharedModule
  ]
})
export class AcademicSettingsModule { }
