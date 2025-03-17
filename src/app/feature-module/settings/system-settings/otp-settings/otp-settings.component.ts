import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-otp-settings',
    templateUrl: './otp-settings.component.html',
    styleUrl: './otp-settings.component.scss',
    standalone: false
})
export class OtpSettingsComponent {
  public routes = routes;
}
