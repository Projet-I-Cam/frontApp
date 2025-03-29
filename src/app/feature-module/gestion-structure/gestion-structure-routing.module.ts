import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionStructureComponent } from './gestion-structure.component';
import { ParametresComponent } from './parametres/parametres.component';
import { StructureComponent } from './structure/structure.component';
import { GestionStrucuturesAdministrativeComponent } from './gestion-strucutures-administrative/gestion-strucutures-administrative.component';

const routes: Routes = [
  {
    path: '',
    component: GestionStructureComponent,
    children: [
      {
        path: 'parametres',
        component: ParametresComponent,
      },
      {
        path: 'structures',
        component: StructureComponent,
      },
      {
        path: 'structure-administrative',
        component: GestionStrucuturesAdministrativeComponent,
      }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionStructureRoutingModule { }
