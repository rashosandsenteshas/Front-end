import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

/* se importan los servicios u las interfaces */
import { Usuarios } from '../interfaces/usuarios';
import { UsuarioService } from '../services/usuario.service';

/* Se importan los componentes de ionic */
import { IonIcon, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  /* Se guardan los datos en las variables */
  correo: string = '';
  contrasena: string = '';

  /* Se asigna un tipo de dato para ver o no la contraseña */
  showPassword: boolean = false;
  @ViewChild('eyeIcon') eyeIcon?: IonIcon;

  constructor(
    private _location: Location,
    private router: Router,
    private _usuarioService: UsuarioService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
    ) { }
  ngOnInit() {
  }

  /* Se Hace el manejo de ver o no la contrasena y se cambia el icono */
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

  /* Funcion (POST) para hacer funcional al inicio de sesion */
  async login() {
    /* Validamos que el usuario ingrese datos */
    if(this.correo == ''|| this.contrasena == ''){
      const alert = await this.alertController.create({
        header: 'Lo sentimos!!',
        message: 'Debe diligenciar todos los campos',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }


    /* Creamos el body */
    const usuarios: Usuarios ={
      correo: this.correo,
      contrasena: this.contrasena,
      nombre: '',
      apellido: ''
    }

    const loading = await this.loadingCtrl.create({
      message: 'Porfavor espere...',
      duration: 500,
      spinner: 'circles',
    });

    loading.present();

    /* Se hace uso de la funcion del servicio */
    this._usuarioService.login(usuarios).subscribe({
      next: async (token) => {
        
        /* Guardamos el token en el localstorage */
        localStorage.setItem('token', token)

        /* se obtienen los roles y se valida en caso de que sea administrador o cliente */
        const role: any = localStorage.getItem('token') 
        const decodedToken: any = jwt_decode(role);
        const idRoles = decodedToken.id_roles;

        if(idRoles === 2){
          this.router.navigate(['/tabs/vehiculos'])
        } else if(idRoles === 1) {this.router.navigate(['/usersadmin'])} else {this.router.navigate(['/home'])}

        const toast = await this.toastController.create({
          message: 'Inicio de sesion exitoso!',
          duration: 1000,
          position: 'top',
        });
        await toast.present();

        this.correo = '';
        this.contrasena = '';
      },
      error: (e: HttpErrorResponse) => {
        this.msjError(e)
      }
    })
    this.contrasena = '';
  }

  /* Se hace manejo de errores y se muestran por pantalla */
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
