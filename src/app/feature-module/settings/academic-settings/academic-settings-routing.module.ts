import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicSettingsComponent } from './academic-settings.component';
import { SchoolSettingsComponent } from './school-settings/school-settings.component';
import { ReligionComponent } from './religion/religion.component';

const routes: Routes = [
  {
    path: '',
    component: AcademicSettingsComponent,
    children: [
      {
        path: 'school-settings',
        component: SchoolSettingsComponent,
      },
      {
        path: 'religion',
        component: ReligionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicSettingsRoutingModule {}
