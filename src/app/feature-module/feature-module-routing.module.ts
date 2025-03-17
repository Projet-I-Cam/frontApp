import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureModuleComponent } from './feature-module.component';
import { AdminDashboardComponent } from './main/dashboard/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
 
  {
    path: '',
    component: FeatureModuleComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard/index',
        pathMatch: 'full',
      },
      {
        path: 'dashboard/index',
        component: AdminDashboardComponent,
      },
      {
        path: 'base-ui',
        loadChildren: () =>
          import('../feature-module/ui-interface/base-ui/base-ui.module').then(
            (m) => m.BaseUiModule
          ),
      },
      {
        path: 'advanced-ui',
        loadChildren: () =>
          import(
            '../feature-module/ui-interface/advanced-ui/advanced-ui.module'
          ).then((m) => m.AdvancedUiModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('../feature-module/ui-interface/charts/charts.module').then(
            (m) => m.ChartsModule
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('../feature-module/ui-interface/forms/forms.module').then(
            (m) => m.FormsModule
          ),
      },
      {
        path: 'table',
        loadChildren: () =>
          import('../feature-module/ui-interface/table/table.module').then(
            (m) => m.TableModule
          ),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('../feature-module/ui-interface/icons/icons.module').then(
            (m) => m.IconsModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'other-settings',
        loadChildren: () =>
          import('./settings/other-settings/other-settings.module').then(
            (m) => m.OtherSettingsModule
          ),
      },
      {
        path: 'academic',
        loadChildren: () =>
          import('./academic/academic.module').then((m) => m.AcademicModule),
      },
      {
        path: 'management',
        loadChildren: () =>
          import('./management/management.module').then(
            (m) => m.ManagementModule
          ),
      },
      {
        path: 'hrm',
        loadChildren: () => import('./hrm/hrm.module').then((m) => m.HrmModule),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./finance & accounts/accounts/accounts.module').then(
            (m) => m.AccountsModule
          ),
      },
      {
        path: 'announcements',
        loadChildren: () =>
          import('./announcements/announcements.module').then(
            (m) => m.AnnouncementsModule
          ),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('./user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'membership',
        loadChildren: () =>
          import('./membership/membership.module').then(
            (m) => m.MembershipModule
          ),
      },
      {
        path: 'support',
        loadChildren: () =>
          import('./support/support.module').then((m) => m.SupportModule),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'content',
        loadChildren: () =>
          import('./content/content.module').then((m) => m.ContentModule),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('./user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'tooltip-content',
        loadChildren: () =>
          import('./common/tooltip-content/tooltip-content.module').then(
            (m) => m.TooltipContentModule
          ),
      },
      {
        path: 'general-settings',
        loadChildren: () =>
          import('./settings/general-settings/general-settings.module').then(
            (m) => m.GeneralSettingsModule
          ),
      },
      {
        path: 'app-settings',
        loadChildren: () =>
          import('./settings/app-settings/app-settings.module').then(
            (m) => m.AppSettingsModule
          ),
      },
      {
        path: 'system-settings',
        loadChildren: () =>
          import('./settings/system-settings/system-settings.module').then(
            (m) => m.SystemSettingsModule
          ),
      },
      {
        path: 'website-settings',
        loadChildren: () =>
          import('./settings/website-settings/website-settings.module').then(
            (m) => m.WebsiteSettingsModule
          ),
      },
      {
        path: 'peoples',
        loadChildren: () =>
          import('./peoples/peoples.module').then((m) => m.PeoplesModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./main/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'financial-settings',
        loadChildren: () =>
          import(
            './settings/financial-settings/financial-settings.module'
          ).then((m) => m.FinancialSettingsModule),
      },
      {
        path: 'financial-settings',
        loadChildren: () =>
          import(
            './settings/financial-settings/financial-settings.module'
          ).then((m) => m.FinancialSettingsModule),
      },
      {
        path: 'application',
        loadChildren: () =>
          import('./main/application/application.module').then(
            (m) => m.ApplicationModule
          ),
      },
      {
        path: 'academic-settings',
        loadChildren: () =>
          import('./settings/academic-settings/academic-settings.module').then(
            (m) => m.AcademicSettingsModule
          ),
      },
     
      { path: 'layout-mini', component: AdminDashboardComponent },
      { path: 'layout-default', component: AdminDashboardComponent },
      
      { path: 'layout-box', component: AdminDashboardComponent },
      { path: 'layout-dark', component: AdminDashboardComponent },

      
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureModuleRoutingModule {}
