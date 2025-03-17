import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentsComponent } from './parents.component';
import { ParentGridComponent } from './parent-grid/parent-grid.component';
import { ParentsListComponent } from './parents-list/parents-list.component';

const routes: Routes = [
  {
    path: '',
    component: ParentsComponent,
    children: [
      { path: 'parent-grid', component: ParentGridComponent },
      { path: 'parents-list', component: ParentsListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentsRoutingModule {}
