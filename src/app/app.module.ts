import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import Parse from 'parse';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SiteModule } from './site/site.module';
import { ParseService } from './parse.service';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SiteModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    ServicesModule
  ],
  providers: [
    provideAnimationsAsync(),
    ParseService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private parseService: ParseService) {
    Parse.initialize('hC9Y8NG2uLLTUVaZsoa30CW0S', '2cQBXh9nDkQDZC7J8Mu9');
    // Parse.serverURL = 'http://5.196.68.13:1337/parse';
    Parse.serverURL = 'http://85.214.29.254:1337/parse';

    // Check current user
    const currentUser = Parse.User.current();
    if (currentUser) {
      console.log('Logged in user:', currentUser);
    }
  }
}
