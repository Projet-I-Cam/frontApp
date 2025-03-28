import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionStructureRoutingModule } from './gestion-structure-routing.module';
import { GestionStructureComponent } from './gestion-structure.component';
import { StructureComponent } from './structure/structure.component';
import { ParametresComponent } from './parametres/parametres.component';
import { GestionStrucuturesAdministrativeComponent } from './gestion-strucutures-administrative/gestion-strucutures-administrative.component';


@NgModule({
  declarations: [
    GestionStructureComponent,
    StructureComponent,
    ParametresComponent,
    GestionStrucuturesAdministrativeComponent
  ],
  imports: [
    CommonModule,
    GestionStructureRoutingModule
  ]
})
export class GestionStructureModule { }
