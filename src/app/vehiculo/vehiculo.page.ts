import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { VehiculosService } from '../services/vehiculos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {

  loading = true;

  listVehiculosForId: any
  message: string = ""

  constructor(
    private _vehiculoService: VehiculosService,
    private http: HttpClient,
    private alertController: AlertController,

  ) { }

  
  ngOnInit() {
    this.getVehiculo()  
  }
  

  ionViewDidEnter() {
    // Simular una carga de datos
    setTimeout(() => {
      this.loading = false;
    }, 10000);
  }


  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getVehiculo()
      event.target.complete();
    }, 2000);
  }
  
  
  getVehiculo() {this._vehiculoService.Getvehiculo().subscribe(data => {
    this.listVehiculosForId = data; 
    // console.log(this.listVehiculosForId); 
   }, (e: HttpErrorResponse) => {
    this.msjError(e)
   })} 

   async msjError(e: HttpErrorResponse) {
    if (e.error.message) this.message = e.error.message
  
  }

}
