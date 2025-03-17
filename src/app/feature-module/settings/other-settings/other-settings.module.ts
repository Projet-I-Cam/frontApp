import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherSettingsRoutingModule } from './other-settings-routing.module';
import { OtherSettingsComponent } from './other-settings.component';
import { BanIpAddressComponent } from './ban-ip-address/ban-ip-address.component';
import { SharedModule } from '../../../shared/shared.module';
import { StorageComponent } from './storage/storage.component';


@NgModule({
  declarations: [
    OtherSettingsComponent,
    BanIpAddressComponent,
    StorageComponent
  ],
  imports: [
    CommonModule,
    OtherSettingsRoutingModule,
    SharedModule
  ]
})
export class OtherSettingsModule { }
