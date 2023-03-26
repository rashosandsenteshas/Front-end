import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../services/vehiculos.service';
import { AlertController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ReportesService } from '../services/reportes.service';
import { Reportes } from '../interfaces/reportes';

@Component({
  selector: 'app-vehicleprofile',
  templateUrl: './vehicleprofile.page.html',
  styleUrls: ['./vehicleprofile.page.scss'],
})
export class VehicleprofilePage implements OnInit {
  infoVehiculo: any = [];
  id: any = String;

  descripcion: string = '';
  fecha_suceso: string = '';
  letterCount = 0;

  isDisabled: boolean = true;

  constructor(
    private _reporteService: ReportesService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
    private _vehiculoService: VehiculosService
  ) {}

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');

    this.http
      .get(`http://localhost:3000/api/user/vehiculos/${this.id}`)
      .subscribe((res) => {
        this.infoVehiculo.push(res);
        // console.log(this.infoVehiculo.modelo);
      });

    // this.http
    //   .get(`http://localhost:3000/api/user/vehiculos/${this.id}`)
    //   .subscribe(({ id_vehiculo, apellido, nombre, correo }: any) : Array<any> => {
    //     const nombreCompleto: String = `${nombre.charAt(0).toUpperCase() + nombre.slice(1)} ${apellido.charAt(0).toUpperCase() + apellido.slice(1)}`
    //     return (this.infoVehiculo = [{id_usuarios, nombreCompleto, correo}]);
    //   });
  }

  async deleteVehiculo() {
    localStorage.removeItem('tokenVehiculo');

    const loading = await this.loadingCtrl.create({
      message: 'Porfavor espere...',
      duration: 500,
      spinner: 'circles',
    });

    loading.present();

    this.id = this.activateRoute.snapshot.paramMap.get('id');

    this.http
      .delete(`http://localhost:3000/api/user/vehiculos/${this.id}`)
      .subscribe(async (res) => {
        this.router.navigate(['/tabs/vehiculos']);
        const toast = await this.toastController.create({
          message: 'vehiculo eliminado exitosamente!',
          duration: 1000,
          position: 'top',
        });
        await toast.present();
      });

      this._vehiculoService.Getvehiculo()

  }

  onInput(event: Event) {
    const textArea = event.target as HTMLTextAreaElement;
    this.letterCount = textArea.value.length;
    if (this.letterCount >= 100) {
      textArea.value = textArea.value.substring(0, 100);
      this.letterCount = 100;
    }

    this.isDisabled = this.letterCount === 0;
  }

  async postReporte() {
    if (!this.descripcion) {
      const alert = await this.alertController.create({
        header: 'Lo sentimos!!',
        message: 'Porfavor digite el reporte',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    if (this.descripcion.length < 10 || this.descripcion.length > 100) {
      const alert = await this.alertController.create({
        header: 'Opss!!',
        message: 'El reporte debe de tener minimo 10 palabras, maximo 100',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    const reporte: Reportes = {
      descripcion: this.descripcion,
      fecha_suceso: this.fecha_suceso,
    };

    this._reporteService.PostReporte(reporte).subscribe({
      next: async (tokenVehiculo) => {
        this.router.navigate(['/tabs/vehiculos']);
        localStorage.setItem('tokenVehiculo', tokenVehiculo);

        const toast = await this.toastController.create({
          message: 'Reporte guardado exitosamente!',
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
