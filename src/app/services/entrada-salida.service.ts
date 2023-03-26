import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Entrada_salida } from '../interfaces/entrada_salida';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntradaSalidaService {

  private MyAppUrl: string;
  private MyApiUrl: string;

  id_usuarios: any = String;
  id_vehiculo: any = String;

  // id: any = String;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute,) { 
    this.MyAppUrl = environment.endpoint
    this.MyApiUrl = 'api'
  }

  // PostEntradaSalida(entrada_salida: Entrada_salida): Observable<any> {
  //   this.id_usuarios = this.activateRoute.snapshot.paramMap.get('id_usuarios');
  //   this.id_vehiculo = this.activateRoute.snapshot.paramMap.get('id_vehiculo');
  //   return this.http.post(`${this.MyAppUrl}${this.MyApiUrl}user/usuarios/${this.id_usuarios}/vehiculos/${this.id_vehiculo}/entrada-salida`, entrada_salida)
  // }

}
