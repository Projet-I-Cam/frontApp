import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { Login2Component } from './login/login2/login2.component';
import { Login3Component } from './login/login3/login3.component';
import { RegisterComponent } from './register/register/register.component';
import { Register2Component } from './register/register2/register2.component';
import { Register3Component } from './register/register3/register3.component';
import { ForgetPasswordComponent } from './forget-password/forget-password/forget-password.component';
import { ForgetPassword2Component } from './forget-password/forget-password2/forget-password2.component';
import { ForgetPassword3Component } from './forget-password/forget-password3/forget-password3.component';
import { ResetPasswordComponent } from './reset-password/reset-password/reset-password.component';
import { ResetPassword2Component } from './reset-password/reset-password-2/reset-password-2.component';
import { ResetPassword3Component } from './reset-password/reset-password-3/reset-password-3.component';
import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success/reset-password-success.component';
import { ResetPasswordSuccess2Component } from './reset-password-success/reset-password-success-2/reset-password-success-2.component';
import { ResetPasswordSuccess3Component } from './reset-password-success/reset-password-success-3/reset-password-success-3.component';
import { EmailVerificationComponent } from './email-verification/email-verification/email-verification.component';
import { EmailVerification2Component } from './email-verification/email-verification-2/email-verification-2.component';
import { EmailVerification3Component } from './email-verification/email-verification-3/email-verification-3.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification/two-step-verification.component';
import { TwoStepVerification2Component } from './two-step-verification/two-step-verification-2/two-step-verification-2.component';
import { TwoStepVerification3Component } from './two-step-verification/two-step-verification-3/two-step-verification-3.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    Login2Component,
    Login3Component,
    RegisterComponent,
    Register2Component,
    Register3Component,
    ForgetPasswordComponent,
    ForgetPassword2Component,
    ForgetPassword3Component,
    ResetPasswordComponent,
    ResetPassword2Component,
    ResetPassword3Component,
    ResetPasswordSuccessComponent,
    ResetPasswordSuccess2Component,
    ResetPasswordSuccess3Component,
    EmailVerificationComponent,
    EmailVerification2Component,
    EmailVerification3Component,
    TwoStepVerificationComponent,
    TwoStepVerification2Component,
    TwoStepVerification3Component,
    LockScreenComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
