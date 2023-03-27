import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportesuserPageRoutingModule } from './reportesuser-routing.module';

import { ReportesuserPage } from './reportesuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportesuserPageRoutingModule
  ],
  declarations: [ReportesuserPage]
})
export class ReportesuserPageModule {}
