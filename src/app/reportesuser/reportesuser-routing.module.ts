import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesuserPage } from './reportesuser.page';

const routes: Routes = [
  {
    path: '',
    component: ReportesuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesuserPageRoutingModule {}
