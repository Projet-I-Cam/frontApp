import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostelComponent } from './hostel.component';
import { HostelRoomsComponent } from './hostel-rooms/hostel-rooms.component';
import { HostelRoomTypeComponent } from './hostel-room-type/hostel-room-type.component';
import { HostelListComponent } from './hostel-list/hostel-list.component';

const routes: Routes = [
  {
    path: '',
    component: HostelComponent,
    children: [
      { path: 'hostel-rooms', component: HostelRoomsComponent },
      { path: 'hostel-room-type', component: HostelRoomTypeComponent },
      { path: 'hostel-list', component: HostelListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostelRoutingModule {}
