import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './support.component';
import { ContactMessagesComponent } from './contact-messages/contact-messages.component';

const routes: Routes = [
  {
    path: '',
    component: SupportComponent,
    children: [
      {
        path: 'contact-messages',
        component: ContactMessagesComponent,
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./tickets/tickets.module').then((m) => m.TicketsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportRoutingModule {}
