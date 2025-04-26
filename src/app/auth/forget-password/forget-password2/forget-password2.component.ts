import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forget-password2',
    templateUrl: './forget-password2.component.html',
    styleUrl: './forget-password2.component.scss',
    standalone: false
})
export class ForgetPassword2Component {
  public routes = routes
  constructor(private router: Router) {}

  public navigate() {
    this.router.navigate([routes.login2]);
  }
}
