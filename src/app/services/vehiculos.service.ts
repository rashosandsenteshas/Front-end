import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vehiculos } from '../interfaces/vehiculos';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private MyAppUrl: string;
  private MyApiUrl: string;

  // id: any = String;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute,) { 
    this.MyAppUrl = environment.endpoint
    this.MyApiUrl = 'api'
  }


  Postvehiculo(vehiculos: Vehiculos): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post(`${this.MyAppUrl}${this.MyApiUrl}/user/vehiculos`, vehiculos, { headers: headers })
  }

  Getvehiculo(): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<any>(`${this.MyAppUrl}${this.MyApiUrl}/user/vehiculos`, { headers: headers})
    // return this.http.get<any>(`${this.MyAppUrl}${this.MyApiUrl}/user/vehiculos`,  { headers: headers })
  }

  // DeleteVehiculo(): Observable<any> {
  //   this.id = this.activateRoute.snapshot.paramMap.get('id');
  //   console.log(this.id);
  //   return this.http.delete(`${this.MyAppUrl}${this.MyApiUrl}/user/vehiculos/${this.id}`)
  // }
  
}
