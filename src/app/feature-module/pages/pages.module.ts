import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../../shared/shared.module';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { UnderMaintenanceComponent } from './under-maintenance/under-maintenance.component';


@NgModule({
  declarations: [
    PagesComponent,
    ProfileComponent,
    BlankPageComponent,
    ComingSoonComponent,
    UnderMaintenanceComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
