import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reset-password-3',
    templateUrl: './reset-password-3.component.html',
    styleUrl: './reset-password-3.component.scss',
    standalone: false
})
export class ResetPassword3Component {
  public routes = routes;
  public password : boolean[] = [false];

  public togglePassword(index: any){
    this.password[index] = !this.password[index]
  }
  constructor(private router: Router) {}

  navigation() {
    this.router.navigate([routes.success3])
  }
}
