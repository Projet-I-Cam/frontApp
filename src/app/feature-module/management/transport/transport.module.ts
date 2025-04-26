import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { TransportComponent } from './transport.component';
import { TransportVehicleComponent } from './transport-vehicle/transport-vehicle.component';
import { TransportVehicleDriversComponent } from './transport-vehicle-drivers/transport-vehicle-drivers.component';
import { SharedModule } from '../../../shared/shared.module';
import { TransportAssignVehicleComponent } from './transport-assign-vehicle/transport-assign-vehicle.component';
import { TransportRoutesComponent } from './transport-routes/transport-routes.component';
import { TransportPickupPointsComponent } from './transport-pickup-points/transport-pickup-points.component';


@NgModule({
  declarations: [
    TransportComponent,
    TransportVehicleComponent,
    TransportVehicleDriversComponent,
    TransportAssignVehicleComponent,
   
    TransportRoutesComponent,
         TransportPickupPointsComponent
  ],
  imports: [
    CommonModule,
    TransportRoutingModule,
    SharedModule
  ]
})
export class TransportModule { }
