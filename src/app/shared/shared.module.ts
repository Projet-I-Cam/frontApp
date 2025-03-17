import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CalendarModule } from 'primeng/calendar';
import { materialModule } from './material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CustomPaginationModule } from './custom-pagination/custom-pagination.module';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LightgalleryModule } from 'lightgallery/angular';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEditorModule } from 'ngx-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastModule } from 'primeng/toast';
import { LightboxModule } from 'ngx-lightbox';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TooltipContentModule } from '../feature-module/common/tooltip-content/tooltip-content.module';
import { BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { DateRangePickerModule } from '../feature-module/common/date-range-picker/date-range-picker.module';
import { PagechangeModule } from './pagechange/pagechange.module';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CountUpModule } from 'ngx-countup';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgCircleProgressModule } from 'ng-circle-progress';

import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    CalendarModule,
    NgApexchartsModule,
    materialModule,
    CustomPaginationModule,
    HttpClientModule,
    LightgalleryModule,
    NgScrollbarModule,
    NgxDropzoneModule,
    NgxEditorModule,
    TooltipModule,
    ToastModule,
    LightboxModule,
    NgScrollbarModule,
    PopoverModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TooltipContentModule,
    DateRangePickerModule,
    PagechangeModule,
    ChipsModule,
    DropdownModule,
    BsDatepickerModule,
    TimepickerModule.forRoot(),
    FullCalendarModule,
    NgApexchartsModule,
    CountUpModule,
    MultiSelectModule,
    NgCircleProgressModule,
   
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    CalendarModule,
    NgApexchartsModule,
    materialModule,
    CustomPaginationModule,
    HttpClientModule,
    LightgalleryModule,
    NgScrollbarModule,
    NgxDropzoneModule,
    NgxEditorModule,
    TooltipModule,
    ToastModule,
    LightboxModule,
    NgScrollbarModule,
    PopoverModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TooltipContentModule,
    DateRangePickerModule,
    PagechangeModule,
    ChipsModule,
    DropdownModule,
    BsDatepickerModule,
    TimepickerModule,
    FullCalendarModule,
    NgApexchartsModule,
    CountUpModule,
    MultiSelectModule,
    NgCircleProgressModule
  ],
  providers: [
    provideNgxMask(),
    BsDatepickerConfig,
    DatePipe,
    BsDaterangepickerConfig,
  ],
})
export class SharedModule {}
