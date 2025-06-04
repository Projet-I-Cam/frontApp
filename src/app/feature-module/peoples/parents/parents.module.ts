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
import { ParentsModalComponent } from './Modals/Parents-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSweetalertsRoutingModule } from '../../ui-interface/base-ui/ui-sweetalerts/ui-sweetalerts-routing.module';
import { EmailFormComponent } from '../../common/email-form/email-form.component';

@NgModule({
  declarations: [
    ParentsComponent,
    ParentsListComponent,
    ParentGridComponent,
    ParentsModalComponent,
    EmailFormComponent
  ],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    SharedModule,
    SkeletonModule,
    FormsModule,
    AutoCompleteModule,
    NgSelectModule,
    UiSweetalertsRoutingModule
  ]
})
export class ParentsModule { }
