import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-invoice-settings',
    templateUrl: './invoice-settings.component.html',
    styleUrl: './invoice-settings.component.scss',
    standalone: false
})
export class InvoiceSettingsComponent {
  public routes = routes;
}
