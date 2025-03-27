import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  public navigate() {
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
      const user = await this.authService.login(email, password);
      localStorage.setItem('user', JSON.stringify(user));
      this.navigate();
    } catch (error) {
      this.errorMessage = 'Login failed. Please check your credentials and try again.';
    }
  }
}
