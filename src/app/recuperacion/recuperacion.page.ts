import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { RecuperacionService } from '../services/recuperacion.service';
import { PasswordReset } from '../interfaces/recuperacion';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {

  /* Se guardan los datos en variables */
  correo: string = ''
  contrasena: string = ''
  confirpassword: string = ''

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private _recuperacionService: RecuperacionService,
    private http: HttpClient,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  /* funcion para Actualizar la contrasena */
  async sendPassword() {
    if(!this.correo || !this.contrasena || !this.confirpassword){
      const alert = await this.alertController.create({
        header: 'Lo sentimos!!',
        message: 'Porfavor digite todos los campos.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }     

    if(this.contrasena != this.confirpassword) {
      const alert = await this.alertController.create({
        header: 'Lo sentimos!!',
        message: 'Las contraseñas deben de ser iguales.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    const password: PasswordReset = {
      correo: this.correo,
      contrasena: this.contrasena
    }

    this._recuperacionService.putPassword(password).subscribe({
      next: async () => {
        this.router.navigate(['/login'])
        
        const toast = await this.toastController.create({
          message: 'Contraseña actualizada correctamente!',
          duration: 1000,
          position: 'top',
        });

        await toast.present();
      },
      error: async (e: HttpErrorResponse) => {
        this.msjError(e)
      }
    })

    
  }


  /* Se hace el manejo de errores y se muestran por pantalla */
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
