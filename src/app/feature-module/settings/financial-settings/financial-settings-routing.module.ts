import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialSettingsComponent } from './financial-settings.component';
import { PaymentGatewaysComponent } from './payment-gateways/payment-gateways.component';
import { TaxRatesComponent } from './tax-rates/tax-rates.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialSettingsComponent,
    children: [
      {
        path: 'payment-gateways',
        component: PaymentGatewaysComponent,
      },
      {
        path: 'tax-rates',
        component: TaxRatesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancialSettingsRoutingModule {}
