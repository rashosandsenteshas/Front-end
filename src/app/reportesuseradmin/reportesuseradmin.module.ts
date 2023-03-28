import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportesuseradminPageRoutingModule } from './reportesuseradmin-routing.module';

import { ReportesuseradminPage } from './reportesuseradmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportesuseradminPageRoutingModule
  ],
  declarations: [ReportesuseradminPage]
})
export class ReportesuseradminPageModule {}
