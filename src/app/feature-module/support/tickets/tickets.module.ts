import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketGridComponent } from './ticket-grid/ticket-grid.component';
import { SharedModule } from '../../../shared/shared.module';
import { TicketComponent } from './ticket/ticket.component';


@NgModule({
  declarations: [
    TicketsComponent,
    TicketDetailsComponent,
    TicketGridComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    SharedModule
  ]
})
export class TicketsModule { }
