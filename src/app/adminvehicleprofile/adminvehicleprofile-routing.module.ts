import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminvehicleprofilePage } from './adminvehicleprofile.page';

const routes: Routes = [
  {
    path: '',
    component: AdminvehicleprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminvehicleprofilePageRoutingModule {}
