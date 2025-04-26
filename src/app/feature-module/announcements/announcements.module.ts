import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AnnouncementsComponent } from './announcements.component';
import { EventsComponent } from './events/events.component';
import { SharedModule } from '../../shared/shared.module';
import { NoticeBoardComponent } from './notice-board/notice-board.component';


@NgModule({
  declarations: [
    AnnouncementsComponent,
    EventsComponent,
    NoticeBoardComponent
  ],
  imports: [
    CommonModule,
    AnnouncementsRoutingModule,
    SharedModule
  ]
})
export class AnnouncementsModule { }
