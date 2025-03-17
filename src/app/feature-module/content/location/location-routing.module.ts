import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location.component';
import { CitiesComponent } from './cities/cities.component';
import { CountriesComponent } from './countries/countries.component';
import { StatesComponent } from './states/states.component';

const routes: Routes = [
  {
    path: '',
    component: LocationComponent,
    children: [
      {
        path: 'cities',
        component: CitiesComponent,
      },
      {
        path: 'countries',
        component: CountriesComponent,
      },
      {
        path: 'states',
        component: StatesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
