import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../../shared/routes/routes';

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.scss',
    standalone: false
})
export class ForgetPasswordComponent {
  public routes = routes
  constructor(private router: Router) {}

  public navigate() {
    this.router.navigate([routes.login]);
  }
}
