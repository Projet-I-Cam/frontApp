import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { routes } from '../../../shared/routes/routes';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-login3',
    templateUrl: './login3.component.html',
    styleUrl: './login3.component.scss',
    standalone: false
})
export class Login3Component {
  public routes = routes;
  loginForm!: FormGroup;
  passwordVisible = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  public navigate(role: string): void {
     this.router.navigate([routes.adminDashboard]);
  }
  public password : boolean[] = [false];

  public togglePassword(index: any){
    this.password[index] = !this.password[index]
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const { email, password } = this.loginForm.value;
    try {
      console.log('Before user loged')
      const user: any = await this.authService.login(email, password);
      console.log('After user loged')
      if(user?.error){
        throw user.error
      }
      this.loginService.setUser(user);
      return this.navigate(user?.role?.task_name || 'admin');
    } catch (error: any) {
      console.error('Error Form login submited ', error?.message)
      this.errorMessage = error?.message || 'Login failed. Please check your credentials and try again.';
    }
  }
}
