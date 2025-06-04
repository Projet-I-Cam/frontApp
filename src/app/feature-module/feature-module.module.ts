import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureModuleRoutingModule } from './feature-module-routing.module';
import { FeatureModuleComponent } from './feature-module.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './common/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { EmailFormComponent } from './common/email-form/email-form.component';



@NgModule({
  declarations: [
    FeatureModuleComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    FeatureModuleRoutingModule,
    SharedModule, FormsModule,
  ],
  exports: [
  ],
})
export class FeatureModuleModule {}
