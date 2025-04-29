import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsRoutingModule } from './parents-routing.module';
import { ParentsComponent } from './parents.component';
import { ParentsListComponent } from './parents-list/parents-list.component';
import { ParentGridComponent } from './parent-grid/parent-grid.component';
import { SharedModule } from '../../../shared/shared.module';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { ParentsModalComponent } from './Modals/Parents-modal.component';

@NgModule({
  declarations: [
    ParentsComponent,
    ParentsListComponent,
    ParentGridComponent,
    ParentsModalComponent
  ],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    SharedModule,
    SkeletonModule,
    FormsModule,
    AutoCompleteModule, 
    DialogModule,
    DropdownModule,
    SelectModule
  ]
})
export class ParentsModule { }
