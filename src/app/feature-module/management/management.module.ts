import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { SharedModule } from '../../shared/shared.module';
import { SportsComponent } from './sports/sports.component';
import { PlayersComponent } from './players/players.component';


@NgModule({
  declarations: [
    ManagementComponent,
    SportsComponent,
    PlayersComponent,
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule
  ]
})
export class ManagementModule { }
