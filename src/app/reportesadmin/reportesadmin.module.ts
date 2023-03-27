import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportesadminPageRoutingModule } from './reportesadmin-routing.module';

import { ReportesadminPage } from './reportesadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportesadminPageRoutingModule
  ],
  declarations: [ReportesadminPage]
})
export class ReportesadminPageModule {}
