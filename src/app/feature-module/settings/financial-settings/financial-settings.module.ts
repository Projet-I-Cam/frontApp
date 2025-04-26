import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialSettingsRoutingModule } from './financial-settings-routing.module';
import { FinancialSettingsComponent } from './financial-settings.component';
import { PaymentGatewaysComponent } from './payment-gateways/payment-gateways.component';
import { SharedModule } from '../../../shared/shared.module';
import { TaxRatesComponent } from './tax-rates/tax-rates.component';


@NgModule({
  declarations: [
    FinancialSettingsComponent,
    PaymentGatewaysComponent,
    TaxRatesComponent
  ],
  imports: [
    CommonModule,
    FinancialSettingsRoutingModule,
    SharedModule
  ]
})
export class FinancialSettingsModule {}
