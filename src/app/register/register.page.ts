/* importaciones propias de angular */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

/* importaciones propias para el funcionamiento del proyecto */
import { Usuarios } from '../interfaces/usuarios';
import { UsuarioService } from '../services/usuario.service';

/* importaciones de ionic */
import { IonIcon, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  /* Variables para atrapar los value que el usuario digite (se utiliza asi ya que NO se estan utilizando formulario reactivos) */
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';

  checkbox: boolean = false;

  showPassword: boolean = false;
  @ViewChild('eyeIcon') eyeIcon?: IonIcon;

  constructor(
    private router: Router,
    private _location: Location,
    private _usuarioService: UsuarioService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  /* Se muestra o no la contrasena  */
  togglePassword() {
    this.showPassword = !this.showPassword;    
    if (this.eyeIcon) { // Comprueba si eyeIcon es nulo antes de acceder a su propiedad "name"
      if (this.showPassword) {
        this.eyeIcon.name = 'eye-off-outline';
      } else {
        this.eyeIcon.name = 'eye-outline';
      }
    }
  }
  
  getPasswordType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  /* funcion para registrar un usuarios */
  async addUsuario() {
    //validamos que el usuario ingrese los valores
    if (
      this.nombre == '' ||
      this.apellido == '' ||
      this.correo == '' ||
      this.contrasena == '' ||
      this.confirmarContrasena == '' 
    ) {
      const alert = await this.alertController.create({
        header: 'Error!!',
        message: 'Debe diligenciar todos los campos',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    /* Validamos que las contrasenas sean iguales */
    if (this.contrasena != this.confirmarContrasena) {
      const alert = await this.alertController.create({
        header: 'Error!!',
        message: 'Las contraseñas deben de ser iguales',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    /* Validar que la contrasena sean de minimo 8 digitos */

    if (this.contrasena.length < 8 || this.contrasena.length > 22) {
      const alert = await this.alertController.create({
        header: 'Error!!',
        message: 'La contraseña debe contener minimo 8 digitos y maximo 22 ',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    /* Creamos el objeto */
    const usuario: Usuarios = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      contrasena: this.contrasena,
    };

    /* Loading al registrar un usuario */
    const loading = await this.loadingCtrl.create({
      message: 'Porfavor espere...',
      duration: 1000,
      spinner: 'circles',
    });

    loading.present();
    
    if(!this.checkbox) {
      const alert = await this.alertController.create({
        header: 'Error!!',
        message: 'Debe de aceptar las politicas de uso para continuar ',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    /* uso del servicio importado para hacer la peticion */
    this._usuarioService.register(usuario).subscribe({
      next: async (v) => {
        /* Mensaje de usuario al registrarse */
        console.log('el usuario fue registrado con exito');
        const toast = await this.toastController.create({
          message: 'Usuario registrado con exito!',
          duration: 4000,
          position: 'top',
        });
        await toast.present();

        this.router.navigate(['/login']);
      },
      error: async (e: HttpErrorResponse) => {
        this.msjError(e)
      },
      complete: () => {}
    });



    this.nombre = '';
    this.apellido = '';
    this.correo = '';
    this.contrasena = '';
    this.confirmarContrasena = '';
    this.checkbox = false;
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

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  goBack() {
    this._location.back();
  }
}
