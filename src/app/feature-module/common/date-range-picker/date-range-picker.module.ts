import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateRangePickerComponent } from './date-range-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    DateRangePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
  ],
  exports: [
    DateRangePickerComponent,
  ]
})
export class DateRangePickerModule { }
