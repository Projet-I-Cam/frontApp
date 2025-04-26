import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrl: './ticket.component.scss',
    standalone: false
})
export class TicketComponent { 
  public routes = routes;
}
