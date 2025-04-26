import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { FileManagerComponent } from './file/file-manager/file-manager.component';
import { ChatComponent } from './chat/chat.component';
import { CallHistoryComponent } from './call/call-history/call-history.component';
import { AudioCallComponent } from './call/audio-call/audio-call.component';
import { TodoComponent } from './todo/todo.component';
import { NotesComponent } from './notes/notes.component';
import { VideoCallComponent } from './call/video-call/video-call.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    ApplicationComponent,
    FileManagerComponent,
    ChatComponent,
    CallHistoryComponent,
    AudioCallComponent,
    TodoComponent,
    NotesComponent,
    VideoCallComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    SharedModule,

  ]
})
export class ApplicationModule { }
