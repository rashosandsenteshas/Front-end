import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entrada_salida } from '../interfaces/entrada_salida';
import { EntradaSalidaService } from '../services/entrada-salida.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adminvehicleprofile',
  templateUrl: './adminvehicleprofile.page.html',
  styleUrls: ['./adminvehicleprofile.page.scss'],
})
export class AdminvehicleprofilePage implements OnInit {
  
  /* Guardamos los datos en las variables */
  infoVehiculo: any[] = [];

  id_usuarios: any = String;
  id_vehiculo: any = String;
  message = '';

  fecha_ingreso: string = '';
  fecha_salida: string = '';
  hora_ingreso: string = '';
  hora_salida: string = '';

  /* injectamos los modulos necesarios */
  constructor(
    private router: Router,
    private http: HttpClient,
    private activateRoute: ActivatedRoute,
    private _entradasalidaService: EntradaSalidaService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private _location: Location,
  ) {}

  
  ngOnInit() {
    /* obtener los valores de la url */
    this.id_usuarios = this.activateRoute.snapshot.paramMap.get('id_usuarios');
    this.id_vehiculo = this.activateRoute.snapshot.paramMap.get('id_vehiculo');

    /* peticion para obtener los datos del vehiculo de un usuario en especifico */
    this.http
      .get<any>(
        `http://localhost:3000/api/user/usuarios/${this.id_usuarios}/vehiculos/${this.id_vehiculo}`
      )
      .subscribe(
        (data) => {
          /* datos guardados obtenidos de la API RETS en la variable*/
          this.infoVehiculo = data;
        },
        (e: HttpErrorResponse) => {
          this.msjError(e);
        }
      );
  }


  // funcion que guarda los datos de entrada y salida del vehiculos de los usuarios 
  async SaveEntradaSalida() {

    // se crea el body de la interfaz importada
    const entrada_salida: Entrada_salida = {
      fecha_ingreso: this.fecha_ingreso,
      fecha_salida: this.fecha_salida,
      hora_ingreso: this.hora_ingreso,
      hora_salida: this.hora_salida
    }

    // se obtiene los IDs de la URL 
    this.id_usuarios = this.activateRoute.snapshot.paramMap.get('id_usuarios');
    this.id_vehiculo = this.activateRoute.snapshot.paramMap.get('id_vehiculo');

    /* Spinner de carga */
    const loading = await this.loadingCtrl.create({
      message: 'Porfavor espere...',
      duration: 500,
      spinner: 'circles',
    });

    loading.present();

    /* Peticion a la API REST (POST) y se envian los datos a la base de datos */
    this.http.post<any>(`http://localhost:3000/api/user/usuarios/${this.id_usuarios}/vehiculos/${this.id_vehiculo}/entrada-salida`, entrada_salida)
    .subscribe({
      next: async (tokenEntrada_salida) => {

        localStorage.setItem('tokenEntradaSalida', tokenEntrada_salida)

        /* notificacion en caso de exito */
        const toast = await this.toastController.create({
          message: 'Datos guardados correctamente!',
          duration: 1000,
          position: 'top',
        });
        await toast.present();
      },
      error: (e: HttpErrorResponse) => {
        this.msjError(e)
      },
    })

    /* variables vacias despues de enviar correctamente los datos de entrada y salida */
    this.fecha_ingreso = '';
    this.fecha_salida = '';
    this.hora_ingreso = '';
    this.hora_salida = '';
  }

  /* errores capturados de la API REST y se hacen visibles en la vista */
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

  goBack() {
    this._location.back();
  }
}
