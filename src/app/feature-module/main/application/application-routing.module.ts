import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallHistoryComponent } from './call/call-history/call-history.component';
import { ApplicationComponent } from './application.component';
import { FileManagerComponent } from './file/file-manager/file-manager.component';
import { AudioCallComponent } from './call/audio-call/audio-call.component';
import { VideoCallComponent } from './call/video-call/video-call.component';
import { ChatComponent } from './chat/chat.component';
import { TodoComponent } from './todo/todo.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    children: [
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./calendar/calendar.module').then((m) => m.CalendarModule),
      },
      {
        path: 'email',
        loadChildren: () =>
          import('./email/email.module').then((m) => m.EmailModule),
      },
      {
        path: 'call-history',
        component: CallHistoryComponent,
      },
      {
        path: 'file-manager',
        component: FileManagerComponent,
      },
      {
        path: 'audio-call',
        component: AudioCallComponent,
      },
      {
        path: 'video-call',
        component: VideoCallComponent,
      },
      {
        path: 'todo',
        component: TodoComponent,
      },
      {
        path: 'notes',
        component: NotesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
