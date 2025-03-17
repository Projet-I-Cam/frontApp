import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-tax-rates',
    templateUrl: './tax-rates.component.html',
    styleUrl: './tax-rates.component.scss',
    standalone: false
})
export class TaxRatesComponent {
  public routes = routes;
}
