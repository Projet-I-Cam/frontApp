import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-sms-settings',
    templateUrl: './sms-settings.component.html',
    styleUrl: './sms-settings.component.scss',
    standalone: false
})
export class SmsSettingsComponent {
  public routes = routes;
}
