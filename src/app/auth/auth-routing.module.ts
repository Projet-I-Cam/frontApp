import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login/login.component';
import { Login2Component } from './login/login2/login2.component';
import { Login3Component } from './login/login3/login3.component';
import { RegisterComponent } from './register/register/register.component';
import { Register2Component } from './register/register2/register2.component';
import { Register3Component } from './register/register3/register3.component';
import { ForgetPassword3Component } from './forget-password/forget-password3/forget-password3.component';
import { ForgetPassword2Component } from './forget-password/forget-password2/forget-password2.component';
import { ForgetPasswordComponent } from './forget-password/forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password/reset-password.component';
import { ResetPassword2Component } from './reset-password/reset-password-2/reset-password-2.component';
import { ResetPassword3Component } from './reset-password/reset-password-3/reset-password-3.component';
import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success/reset-password-success.component';
import { ResetPasswordSuccess2Component } from './reset-password-success/reset-password-success-2/reset-password-success-2.component';
import { ResetPasswordSuccess3Component } from './reset-password-success/reset-password-success-3/reset-password-success-3.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification/two-step-verification.component';
import { TwoStepVerification2Component } from './two-step-verification/two-step-verification-2/two-step-verification-2.component';
import { TwoStepVerification3Component } from './two-step-verification/two-step-verification-3/two-step-verification-3.component';
import { EmailVerificationComponent } from './email-verification/email-verification/email-verification.component';
import { EmailVerification2Component } from './email-verification/email-verification-2/email-verification-2.component';
import { EmailVerification3Component } from './email-verification/email-verification-3/email-verification-3.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';

const routes: Routes = [{ path: '', component: AuthComponent,children:[
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login-2',
    component: Login2Component
  },
  {
    path: 'login-3',
    component: Login3Component
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'register-2',
    component: Register2Component,
  },
  {
    path: 'register-3',
    component: Register3Component,
  },
  {
    path: 'forgot-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'forgot-password-2',
    component: ForgetPassword2Component,
  },
  {
    path: 'forgot-password-3',
    component: ForgetPassword3Component,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'reset-password-2',
    component: ResetPassword2Component,
  },
  {
    path: 'reset-password-3',
    component: ResetPassword3Component,
  },
  {
    path: 'reset-password-success',
    component: ResetPasswordSuccessComponent,
  },
  {
    path: 'reset-password-success-2',
    component: ResetPasswordSuccess2Component,
  },
  {
    path: 'reset-password-success-3',
    component: ResetPasswordSuccess3Component,
  },
  {
    path: 'two-step-verification',
    component: TwoStepVerificationComponent,
  },
  {
    path: 'two-step-verification-2',
    component: TwoStepVerification2Component,
  },
  {
    path: 'two-step-verification-3',
    component: TwoStepVerification3Component,
  },
  {
    path: 'email-verification',
    component: EmailVerificationComponent,
  },
  {
    path: 'email-verification-2',
    component: EmailVerification2Component,
  },
  {
    path: 'email-verification-3',
    component: EmailVerification3Component,
  },
  {
    path: 'lock-screen',
    component: LockScreenComponent,
  },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
