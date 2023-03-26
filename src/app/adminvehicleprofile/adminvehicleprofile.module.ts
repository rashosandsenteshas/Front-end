import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminvehicleprofilePageRoutingModule } from './adminvehicleprofile-routing.module';

import { AdminvehicleprofilePage } from './adminvehicleprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminvehicleprofilePageRoutingModule
  ],
  declarations: [AdminvehicleprofilePage]
})
export class AdminvehicleprofilePageModule {}
