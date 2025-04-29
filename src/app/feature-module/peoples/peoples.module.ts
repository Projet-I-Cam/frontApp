import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PeoplesRoutingModule } from './peoples-routing.module';
import { PeoplesComponent } from './peoples.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstitutionsModule } from './institutions/institutions.module';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    PeoplesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InstitutionsModule,
    PeoplesComponent,
    SkeletonModule,
    FormsModule,
  ],
})
export class PeoplesModule {}
