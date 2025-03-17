import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets.component';
import { TicketGridComponent } from './ticket-grid/ticket-grid.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  {
    path: '',
    component: TicketsComponent,
    children: [
      { path: 'ticket-grid', component: TicketGridComponent },
      { path: 'ticket-details', component: TicketDetailsComponent },
      {path:'ticket',component:TicketComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
