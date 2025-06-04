import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import Parse from 'parse';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SiteModule } from './site/site.module';
import { ParseService } from './parse.service';


import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from '@angular/cdk/dialog';
import { EmailService } from './services/EmailService';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, SiteModule, HttpClientModule,
    FormsModule, ToastModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    MessageService, ConfirmationService, EmailService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private parseService: ParseService) {
    Parse.initialize('hC9Y8NG2uLLTUVaZsoa30CW0S', '2cQBXh9nDkQDZC7J8Mu9');
    // Parse.serverURL = 'http://5.196.68.13:1337/parse';
    Parse.serverURL = 'http://85.214.29.254:1337/parse';

  }
}
