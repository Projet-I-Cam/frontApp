import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent,
    children: [
      {
        path: 'tables-basic',
        loadChildren: () =>
          import('./tables-basic/tables-basic.module').then(
            (m) => m.TablesBasicModule
          ),
      },
      {
        path: 'data-basic',
        loadChildren: () =>
          import('./data-tables/data-tables.module').then(
            (m) => m.DataTableSModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
