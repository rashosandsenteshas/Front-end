import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';

/* Componentes de Ionic importados */
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

/* Interfaces importadas */
import { Datos, Password } from '../interfaces/usuarios';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  /* Se guardan las peticione y los datos en variables */
  infoUsuario: any = [];

  correo: any;
  contrasena: string = '';
  confirContrasena: string = '';

  showPassword: boolean = false;

  /* Servicios y componentes importados */
  constructor(
    private router: Router,
    private _usuarioService: UsuarioService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  /* Se llama la funcion a penas se cargue la pagina */
  ngOnInit() {
    this.getInfoUser();
  }
  /* Se muestra o no la contraseña */
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  getPasswordType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  /* Se obtiene los datos del usuario logueado */
  getInfoUser() {
    this._usuarioService.getUsuarioById().subscribe((data) => {
      this.infoUsuario = data;
    });
  }

  /* Funcion que guarda los datos que el usuario quiera actualizar */
  async save() {
    if (this.contrasena.length < 8)
      if (this.contrasena != this.confirContrasena) {
        const alert = await this.alertController.create({
          header: 'Lo sentimos!!',
          message: 'Las contraseñas deben de ser iguales.',
          buttons: ['OK'],
        });

        await alert.present();
        return;
      }

    /* Se crea el body del correo a actualizar */
    const datos: Datos = {
      nombre: this.infoUsuario.nombre,
      correo: this.correo,
    };

    /* Se crea el body del correo a actualizar */
    const password: Password = {
      contrasena: this.contrasena,
    };

    /* Validacion por si en la informacion obtenida hay correo */
    if (!this.infoUsuario.correo) return;

    const loading = await this.loadingCtrl.create({
      message: 'Porfavor espere...',
      duration: 1000,
      spinner: 'circles',
    });

    loading.present();

    /* Funcion que actualia los datos */
    this._usuarioService.updateUser(datos).subscribe({
      next: async (e) => {
        this.router.navigate(['/tabs/ajustes']);
      },
      /* Se presentan los errores en caso de que los haya */
      error: (e: HttpErrorResponse) => {
        this.msjError(e);
      },
    });

    /* Validacion en caso que no exista una contraseña */
    if (!this.contrasena) return;

    /* Funcion para actualizar la contraseña */
    this._usuarioService.updatePassword(password).subscribe({
      next: async (e) => {
        this.router.navigate(['/tabs/ajustes']);
        const toast = await this.toastController.create({
          message: 'Contraseña actualizada correctamente!',
          duration: 1000,
          position: 'top',
        });
        await toast.present();
      },
      error: (e: HttpErrorResponse) => {
        this.msjError(e);
      },
    });
  }

  /* Se manejan los errores desde el API REST y se muestran por pantalla */
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

  /* Se remueven los token almacenados en el LocalStorage */
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenVehiculo');
    localStorage.removeItem('tokenAseguradora');

    this.router.navigate(['/login']);
  }
}
