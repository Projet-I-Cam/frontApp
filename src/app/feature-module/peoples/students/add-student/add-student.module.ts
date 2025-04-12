import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../../../../shared/shared.module';
import { AddStudentComponent } from './add-student.component';

@NgModule({
  declarations: [
    AddStudentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ChipsModule,
    DropdownModule,
    CalendarModule
  ],
  exports: [
    AddStudentComponent
  ]
})
export class AddStudentModule { } 