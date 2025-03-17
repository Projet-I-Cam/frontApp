import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSettingsComponent } from './app-settings.component';
import { CustomFieldsComponent } from './custom-fields/custom-fields.component';
import { InvoiceSettingsComponent } from './invoice-settings/invoice-settings.component';

const routes: Routes = [
  {
    path: '',
    component: AppSettingsComponent,
    children: [
      {
        path: 'custom-fields',
        component: CustomFieldsComponent,
      },
      {
        path: 'invoice-settings',
        component: InvoiceSettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSettingsRoutingModule {}
