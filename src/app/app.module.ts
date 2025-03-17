import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Parse from 'parse';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [provideAnimationsAsync()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    
    Parse.initialize('hC9Y8NG2uLLTUVaZsoa30CW0S', '2cQBXh9nDkQDZC7J8Mu9');
    Parse.serverURL = 'http://5.196.68.13:1337/parse';

    console.log('Parse current user => ',  Parse.User.current())
  }
}
