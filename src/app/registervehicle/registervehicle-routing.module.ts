import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistervehiclePage } from './registervehicle.page';

const routes: Routes = [
  {
    path: '',
    component: RegistervehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistervehiclePageRoutingModule {}
