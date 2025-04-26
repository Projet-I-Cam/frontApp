import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-ban-ip-address',
    templateUrl: './ban-ip-address.component.html',
    styleUrl: './ban-ip-address.component.scss',
    standalone: false
})
export class BanIpAddressComponent {
  public routes = routes;
}
