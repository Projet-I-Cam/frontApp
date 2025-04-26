import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { SportsComponent } from './sports/sports.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      {
        path: 'transport',
        loadChildren: () =>
          import('./transport/transport.module').then((m) => m.TransportModule),
      },
      {
        path: 'fees-collection',
        loadChildren: () =>
          import('./fees-collection/fees-collection.module').then(
            (m) => m.FeesCollectionModule
          ),
      },
      {
        path: 'hostel',
        loadChildren: () =>
          import('./hostel/hostel.module').then((m) => m.HostelModule),
      },
      {
        path: 'fees-collection',
        loadChildren: () =>
          import('./fees-collection/fees-collection.module').then(
            (m) => m.FeesCollectionModule
          ),
      },
      {
        path: 'sports',
        component: SportsComponent,
      },
      {
        path: 'players',
        component: PlayersComponent,
      },
      {
        path: 'library',
        loadChildren: () =>
          import('./library/library.module').then((m) => m.LibraryModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
