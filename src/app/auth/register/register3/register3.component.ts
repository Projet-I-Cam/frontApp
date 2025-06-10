import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { routes } from '../../../shared/routes/routes';

@Component({
    selector: 'app-register3',
    templateUrl: './register3.component.html',
    styleUrl: './register3.component.scss',
    standalone: false
})
export class Register3Component {
  public routes = routes
  registerForm!: FormGroup;
  errorMessage: string = '';
  passwordVisible = false;
  confirmPasswordVisible = false;
  min2kr = 'veuillez saisir minimum 2 caractères';

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.registerForm = this.fb.group({
        fullname: ['', [Validators.required, Validators.minLength(2)]],
        username: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue]
      }, { validators: this.passwordMatchValidator });
  }

  public navigate() {
    this.router.navigate([routes.login]);
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;

    const { fullname, username, email, password } = this.registerForm.value;

    try {
      await this.authService.registerUser(fullname, username, password, email);
      this.navigate();
    } catch (error: any) {
      this.errorMessage = error.message || "Registration failed. Please try again.";
    }
  }
  public password : boolean[] = [false];

  public togglePassword(index: any){
    this.password[index] = !this.password[index]
  }
}
