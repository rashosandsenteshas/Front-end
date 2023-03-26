import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
  infoCliente: any[] = [];
  vehiculo: any 

  message: string = ''

  profileId = String;
  id: any = String;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private _usuariosServices: UsuarioService
  ) {}

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id_usuarios');

    this.http
      .get(`http://localhost:3000/api/user/usuarios/${this.id}/`)
      .subscribe(({ id_usuarios, apellido, nombre, correo }: any) : Array<any> => {
        const nombreCompleto: String = `${nombre.charAt(0).toUpperCase() + nombre.slice(1)} ${apellido.charAt(0).toUpperCase() + apellido.slice(1)}`
        return (this.infoCliente = [{id_usuarios, nombreCompleto, correo, nombre, apellido}]);
      });

    this.http.get<any>(`http://localhost:3000/api/user/usuarios/${this.id}/vehiculos`)
    .subscribe(data => {
      this.vehiculo = data;
    
      // console.log(this.vehiculo);
    
    }, (e: HttpErrorResponse) => {
      this.msjError(e)
    });

    
  }

  async deleteUser() {

    const loading = await this.loadingCtrl.create({
      message: 'Porfavor espere...',
      duration: 500,
      spinner: 'circles',
    });

    loading.present();

    this.id = this.activateRoute.snapshot.paramMap.get('id_usuarios');

    this.http
      .delete(`http://localhost:3000/api/user/usuarios/${this.id}`)
      .subscribe(async (res) => {
        this.router.navigate(['/usersadmin']);
        this._usuariosServices.getUsuarios()
        const toast = await this.toastController.create({
          message: 'Usuario eliminado exitosamente!',
          duration: 1000,
          position: 'top',
        });
        await toast.present();
      });
  }
  
  async msjError(e: HttpErrorResponse) {
    if (e.error.message) this.message = e.error.message
  
  }

}
