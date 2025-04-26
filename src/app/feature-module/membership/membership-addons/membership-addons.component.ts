import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';

@Component({
    selector: 'app-membership-addons',
    templateUrl: './membership-addons.component.html',
    styleUrl: './membership-addons.component.scss',
    standalone: false
})
export class MembershipAddonsComponent {
  public routes = routes;
}
