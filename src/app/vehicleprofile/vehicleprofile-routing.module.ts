import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleprofilePage } from './vehicleprofile.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleprofilePageRoutingModule {}
