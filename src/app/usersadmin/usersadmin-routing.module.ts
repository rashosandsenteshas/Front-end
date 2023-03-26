import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersadminPage } from './usersadmin.page';

const routes: Routes = [
  {
    path: '',
    component: UsersadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersadminPageRoutingModule {}
