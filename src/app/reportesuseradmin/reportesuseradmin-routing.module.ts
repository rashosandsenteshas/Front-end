import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesuseradminPage } from './reportesuseradmin.page';

const routes: Routes = [
  {
    path: '',
    component: ReportesuseradminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesuseradminPageRoutingModule {}
