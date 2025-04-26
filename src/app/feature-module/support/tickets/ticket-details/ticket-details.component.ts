import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-ticket-details',
    templateUrl: './ticket-details.component.html',
    styleUrl: './ticket-details.component.scss',
    standalone: false
})
export class TicketDetailsComponent {
  public routes = routes;

}
