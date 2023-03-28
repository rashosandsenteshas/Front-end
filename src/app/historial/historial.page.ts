import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../services/historial.service';
import type { DateTimeFormatOptions } from 'intl';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  /* Guardamos los valores y datos en estas constantes */
  historial: any[] = []
  historiales: any[] = []
  inicial: string = ""
  final: string = ""

  /* Se declara una variable booleana inicializada en true para mostrar el historial */
  mostrarHistorial: boolean = true;

  constructor(
    private _historialService: HistorialService,
    private alertController: AlertController,
  ) { }


  ngOnInit() {
    // llamamos el array cada que se entre a la pagina 
    this.Historial()
  }

  // filtramos por fecha el historial 
  filtrar() {
    this._historialService.historialByDate(this.inicial, this.final).subscribe({
      next: (data) => {
        this.historiales = data; // Actualizamos el historial con los datos recibidos
        this.mostrarHistorial = false; // ocultar historial completo
      },
      error: (e: HttpErrorResponse) => {
        this.msjError(e)
      }
    })

    /* Se reinician las variables */
    this.inicial = ''
    this.final = ''
  }
  
  // formateamos las fechas a ISO de JS
  formatDate(date: string) {
    const options: DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  // Obtenemos el historial
  Historial() {
    this._historialService.historial().subscribe({
      next: (data) => {
        this.historial = data; // Actualizamos el historial con los datos recibidos
        this.mostrarHistorial = true; // mostrar historial completo
      },
      error: (e: HttpErrorResponse) => {
        this.msjError(e)
      }
    });
  }  

  reiniciar(){
    this.inicial = ''
    this.final = ''

    this.Historial()
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
}
