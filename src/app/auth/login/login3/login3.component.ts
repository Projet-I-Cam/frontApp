import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../../shared/routes/routes';

@Component({
    selector: 'app-login3',
    templateUrl: './login3.component.html',
    styleUrl: './login3.component.scss',
    standalone: false
})
export class Login3Component {
  public routes = routes;
  constructor(private router: Router) {}

  public navigate() {
    this.router.navigate([routes.adminDashboard]);
  }
  public password : boolean[] = [false];

  public togglePassword(index: any){
    this.password[index] = !this.password[index]
  }
}
