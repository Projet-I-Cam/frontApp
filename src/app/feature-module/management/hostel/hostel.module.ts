import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostelRoutingModule } from './hostel-routing.module';
import { HostelComponent } from './hostel.component';
import { HostelRoomsComponent } from './hostel-rooms/hostel-rooms.component';
import { HostelRoomTypeComponent } from './hostel-room-type/hostel-room-type.component';
import { HostelListComponent } from './hostel-list/hostel-list.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    HostelComponent,
    HostelRoomsComponent,
    HostelRoomTypeComponent,
    HostelListComponent
  ],
  imports: [
    CommonModule,
    HostelRoutingModule,
    SharedModule
  ]
})
export class HostelModule { }
