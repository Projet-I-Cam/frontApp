import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';

@Component({
    selector: 'app-reset-password-success',
    templateUrl: './reset-password-success.component.html',
    styleUrl: './reset-password-success.component.scss',
    standalone: false
})
export class ResetPasswordSuccessComponent {
  public routes = routes
}
