import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';

@Component({
    selector: 'app-membership-plans',
    templateUrl: './membership-plans.component.html',
    styleUrl: './membership-plans.component.scss',
    standalone: false
})
export class MembershipPlansComponent {
  public routes = routes;
}
