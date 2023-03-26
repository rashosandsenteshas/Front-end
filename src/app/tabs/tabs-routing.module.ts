import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'vehiculos',
        loadChildren: () =>
          import('../vehiculo/vehiculo.module').then(
            (m) => m.VehiculoPageModule
          ),
      },
      {
        path: 'ajustes',
        loadChildren: () =>
          import('../ajustes/ajustes.module').then((m) => m.AjustesPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/vehiculos',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/vehiculos',
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
