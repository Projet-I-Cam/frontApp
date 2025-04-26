import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-gdpr-cookies',
    templateUrl: './gdpr-cookies.component.html',
    styleUrl: './gdpr-cookies.component.scss',
    standalone: false
})
export class GdprCookiesComponent {
  public routes = routes;
}
