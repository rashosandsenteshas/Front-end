import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersadminPageRoutingModule } from './usersadmin-routing.module';

import { UsersadminPage } from './usersadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersadminPageRoutingModule
  ],
  declarations: [UsersadminPage]
})
export class UsersadminPageModule {}
