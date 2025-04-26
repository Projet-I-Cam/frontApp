import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsComponent } from './announcements.component';
import { EventsComponent } from './events/events.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementsComponent,
    children: [
      { path: 'event', component: EventsComponent },
      { path: 'notice-board', component: NoticeBoardComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncementsRoutingModule {}
