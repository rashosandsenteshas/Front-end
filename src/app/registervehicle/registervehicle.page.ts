import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { VehiculosService } from '../services/vehiculos.service';
import { AseguradoraService } from '../services/aseguradora.service';

import { Vehiculos } from '../interfaces/vehiculos';
import { Aseguradora } from '../interfaces/aseguradora';

import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';



// import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registervehicle',
  templateUrl: './registervehicle.page.html',
  styleUrls: ['./registervehicle.page.scss'],
})
export class RegistervehiclePage implements OnInit {

  /* se guardan los datos en las variables  */
  marca: string = ""
  modelo: string = ""
  placa: string = ""
  color: string = ""

  vehiculoSelect: string = ''
  vehiculoseleccionado: string = ''
  tipo_vehiculo: any;
  
  nombre_aseguradora: string = ""
  fecha_expedicion: string = ""
  fecha_vencimiento: string = ""

  constructor(
    private router: Router,
    private _location: Location,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private _vehiculoService: VehiculosService,
    private _aseguradoraService: AseguradoraService
    ) {
    this.tipo_vehiculo = ['Carro', "Moto", "Bicicleta"]
    
  }
  
  ngOnInit() {
  }
  
  /* Se convierten las variables declaradas arriba al formato UpperCase */
  convertirLetras() {
    this.placa = this.placa.toUpperCase();
    this.nombre_aseguradora = this.nombre_aseguradora.toUpperCase();
    this.modelo = this.modelo.toUpperCase();
    this.marca = this.marca.charAt(0).toUpperCase() + this.marca.slice(1);
    this.color = this.color.charAt(0).toUpperCase() + this.color.slice(1);

    if (this.placa.length === 3) {
      this.placa = this.placa + '-';
    }
  }

  calcularFechaVencimiento() {
    const expedicion = new Date(this.fecha_expedicion);
    const vencimiento = new Date(expedicion);
    vencimiento.setDate(vencimiento.getDate() + 365);
    this.fecha_vencimiento = vencimiento.toISOString().substring(0, 10);
  }



  setValueVehiculo() {
    this.vehiculoseleccionado = this.vehiculoSelect 
    // console.log(this.vehiculoseleccionado); 
  }

  
  async postVehiculo(){

    if(!this.marca || !this.modelo || !this.color || !this.vehiculoseleccionado || !this.nombre_aseguradora || !this.fecha_expedicion || !this.fecha_vencimiento){
      const alert = await this.alertController.create({
        header: 'Lo sentimos!!',
        message: 'Debe diligenciar todos los campos',
        buttons: ['OK'],
      });
  
      await alert.present();
      return;
    }
    
    /* creamos el cuerpo */

    const vehiculo: Vehiculos = {
      tipo_vehiculo: this.vehiculoseleccionado,
      placa: this.placa,
      marca: this.marca,
      modelo: this.modelo,
      color: this.color
      
    }

    const aseguradora: Aseguradora = {
      nombre_aseguradora: this.nombre_aseguradora,
      fecha_expedicion: this.fecha_expedicion,
      fecha_vencimiento: this.fecha_vencimiento
    }

    // console.log(vehiculo);
    // console.log(aseguradora);

    const loading = await this.loadingCtrl.create({
      message: 'Porfavor espere...',
      duration: 500,
      spinner: 'circles',
    });

    loading.present();

    this._vehiculoService.Postvehiculo(vehiculo).subscribe({
      next: async (tokenVehiculo) => {

        this.router.navigate(['/tabs/vehiculos'])
        localStorage.setItem('tokenVehiculo', tokenVehiculo)

        const toast = await this.toastController.create({
          message: 'vehiculo Creado exitosamente!',
          duration: 1000,
          position: 'top',
        });
        await toast.present();
      },
      error: (e: HttpErrorResponse) => {
        this.msjError(e)
      },
    })

    setTimeout(() => {
      this._aseguradoraService.PostAseguradora(aseguradora).subscribe({
        next: async (tokenAseguradora) => {
          localStorage.setItem('tokenAseguradora', tokenAseguradora)
        }
      })  
    }, 800);
  
    this.nombre_aseguradora = "";
    this.fecha_expedicion = "";
    this.fecha_vencimiento = "";  
    this.marca = "";
    this.modelo = "";
    this.placa = "";  
    this.color = "";

    this._vehiculoService.Getvehiculo()
  }


  async msjError(e: HttpErrorResponse) {
    if (e.error.message) {
      const alert = await this.alertController.create({
        header: 'Error!!',
        message: e.error.message,
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error!!',
        message:
          'ha ocurrido un error inesperado, por favor, comuniquese con el administrador',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

  
  goBack(){
    this._location.back();
  }
}
