import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { CitiesComponent } from './cities/cities.component';
import { CountriesComponent } from './countries/countries.component';
import { SharedModule } from '../../../shared/shared.module';
import { StatesComponent } from './states/states.component';


@NgModule({
  declarations: [
    LocationComponent,
    CitiesComponent,
    CountriesComponent,
    StatesComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    SharedModule
  ]
})
export class LocationModule { }
