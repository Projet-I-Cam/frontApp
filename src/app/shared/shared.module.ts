import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CalendarModule } from 'primeng/calendar';
import { materialModule } from './material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CustomPaginationModule } from './custom-pagination/custom-pagination.module';
import {
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
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { StepsModule } from 'primeng/steps';
import { Tag } from 'primeng/tag';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { Slider } from 'primeng/slider';
import { ProgressBar } from 'primeng/progressbar';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';


import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GenericTableComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    CalendarModule,
    NgApexchartsModule,
    materialModule,
    CustomPaginationModule,
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
    TableModule,
    ButtonModule,
    StepsModule,
    TabViewModule,
    TabMenuModule

  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    CalendarModule,
    NgApexchartsModule,
    materialModule,
    CustomPaginationModule,
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
    NgCircleProgressModule,
    GenericTableComponent,
    TableModule,
    ButtonModule,
    StepsModule,
    TabViewModule,
    TabMenuModule
  ],
  providers: [
    provideNgxMask(),
    BsDatepickerConfig,
    DatePipe,
    BsDaterangepickerConfig,
  ],
})
export class SharedModule { }
