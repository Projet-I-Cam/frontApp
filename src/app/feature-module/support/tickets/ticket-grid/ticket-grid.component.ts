import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-ticket-grid',
    templateUrl: './ticket-grid.component.html',
    styleUrl: './ticket-grid.component.scss',
    standalone: false
})
export class TicketGridComponent {
  public routes = routes;
}
