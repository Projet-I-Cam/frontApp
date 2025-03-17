import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipContentComponent } from './tooltip-content.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [TooltipContentComponent],
  imports: [CommonModule,TooltipModule],
  exports: [TooltipContentComponent],
})
export class TooltipContentModule {}
