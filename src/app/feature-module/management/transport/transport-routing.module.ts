import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportComponent } from './transport.component';
import { TransportVehicleComponent } from './transport-vehicle/transport-vehicle.component';
import { TransportVehicleDriversComponent } from './transport-vehicle-drivers/transport-vehicle-drivers.component';
import { TransportAssignVehicleComponent } from './transport-assign-vehicle/transport-assign-vehicle.component';
import { TransportPickupPointsComponent } from './transport-pickup-points/transport-pickup-points.component';
import { TransportRoutesComponent } from './transport-routes/transport-routes.component';

const routes: Routes = [
  {
    path: '',
    component: TransportComponent,
    children: [
      { path: 'transport-vehicle', component: TransportVehicleComponent },
      {
        path: 'transport-vehicle-drivers',
        component: TransportVehicleDriversComponent,
      },
      {
        path: 'transport-assign-vehicle',
        component: TransportAssignVehicleComponent,
      },
      {
        path: 'transport-pickup-points',
        component: TransportPickupPointsComponent,
      },
      { path: 'trasnsport-routes', component: TransportRoutesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportRoutingModule {}
