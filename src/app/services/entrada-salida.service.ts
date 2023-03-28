import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EntradaSalidaService {

  id_usuarios: any = String;
  id_vehiculo: any = String;

  // id: any = String;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute,) { 

  }

}
