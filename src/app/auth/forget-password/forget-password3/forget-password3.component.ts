import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forget-password3',
    templateUrl: './forget-password3.component.html',
    styleUrl: './forget-password3.component.scss',
    standalone: false
})
export class ForgetPassword3Component {
  public routes = routes
  constructor(private router: Router) {}

  public navigate() {
    this.router.navigate([routes.login3]);
  }
}
