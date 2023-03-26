import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../services/historial.service';
import type { DateTimeFormatOptions } from 'intl';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  /* Guardamos los valores y datos en estas constantes */
  historial: any[] = []
  inicial: string = ""
  final: string = ""

  constructor(
    private _historialService: HistorialService
  ) { }


  ngOnInit() {
    // llamamos el array cada que se entre a la pagina 
    this.Historial()
  }

  // filtramos por fecha el historial 
  filtrar(){
  }
  // formateamos las fechas a ISO
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
      },
      error: () => {}
    });
  }
  
}
