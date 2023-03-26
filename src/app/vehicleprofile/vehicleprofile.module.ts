import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleprofilePageRoutingModule } from './vehicleprofile-routing.module';

import { VehicleprofilePage } from './vehicleprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleprofilePageRoutingModule
  ],
  declarations: [VehicleprofilePage]
})
export class VehicleprofilePageModule {}
