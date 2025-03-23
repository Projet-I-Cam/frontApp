import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SiteRoutingModule } from './site-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    HomePageComponent,
    LayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule
  ],
  exports: [
    LayoutComponent,
    HeaderComponent
  ]
})
export class SiteModule { }
