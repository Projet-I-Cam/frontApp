import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-social-authentication',
    templateUrl: './social-authentication.component.html',
    styleUrl: './social-authentication.component.scss',
    standalone: false
})
export class SocialAuthenticationComponent {
  public routes = routes;
}
