import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { RecuperacionService } from '../services/recuperacion.service';
import { VerifyCode } from '../interfaces/recuperacion';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.page.html',
  styleUrls: ['./codigo.page.scss'],
})
export class CodigoPage implements OnInit {

  /* Se guarda el codigo en una variable */
  codigo: string = ''

  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private _recuperacionService: RecuperacionService,
    private http: HttpClient, 
    private router: Router

    ) { }

  ngOnInit() {
  }

  /* funcion que envia el codigo digitado al API REST */
  async sendCodigo() {
    if(!this.codigo) {
      const alert = await this.alertController.create({
        header: 'Lo sentimos!!',
        message: 'Porfavor digite el código que se le fue enviado a su numero de celular.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    } 

    /* Validacion para el codigo */
    if(this.codigo.length > 6) {
      const alert = await this.alertController.create({
        header: 'Opss!!',
        message: 'El codigo es de maximo 6 digitos.',
        buttons: ['OK'],
      });

      await alert.present();
      return; 
    } 

    /* Se hace uso de la Interface */
    const codigo: VerifyCode = {
      codigo: this.codigo
    }

    const loading = await this.loadingCtrl.create({
      message: 'Verificando...',
      spinner: 'circles'
    });

    // loading.present();

    // Funcion que llama al API REST y verifica el codigo 
    this._recuperacionService.verifyCode(codigo).subscribe({
      next: async () => {

        await loading.dismiss();

        const toast = await this.toastController.create({
          message: 'Codigo correcto!',
          duration: 1000,
          position: 'top',
        });

        await toast.present();
        this.router.navigate(['/recuperacion'])

      }, 
      error: async (e: HttpErrorResponse) => {
        await loading.dismiss();
        this.msjError(e)
      }
    })
    
    await loading.present();
  }

  /* Se hacen manejo de errores y se muestran por pantalla */
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

}
