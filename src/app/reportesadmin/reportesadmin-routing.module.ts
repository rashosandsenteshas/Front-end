import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesadminPage } from './reportesadmin.page';

const routes: Routes = [
  {
    path: '',
    component: ReportesadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesadminPageRoutingModule {}
