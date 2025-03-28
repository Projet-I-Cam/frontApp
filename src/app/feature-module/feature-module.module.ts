import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureModuleRoutingModule } from './feature-module-routing.module';
import { FeatureModuleComponent } from './feature-module.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './common/layout/layout.component';
import { StudentSidebarComponent } from './common/sidebar/student-sidebar/student-sidebar.component';
import { ParentSidebarComponent } from './common/sidebar/parent-sidebar/parent-sidebar.component';
import { TeacherSidebarComponent } from './common/sidebar/teacher-sidebar/teacher-sidebar.component';
import { AdminStaffSidebarComponent } from './common/sidebar/admin-staff-sidebar/admin-staff-sidebar.component';
import { AdminSidebarComponent } from './common/sidebar/admin-sidebar/admin-sidebar.component';



@NgModule({
  declarations: [
    FeatureModuleComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    StudentSidebarComponent,
    ParentSidebarComponent,
    TeacherSidebarComponent,
    AdminStaffSidebarComponent,
    AdminSidebarComponent,
    
    
  ],
  imports: [
    CommonModule,
    FeatureModuleRoutingModule,
    SharedModule,
  ],
  exports: [
    StudentSidebarComponent,
    ParentSidebarComponent,
    TeacherSidebarComponent,
    AdminStaffSidebarComponent,
    AdminSidebarComponent
  ],
})
export class FeatureModuleModule {} 
