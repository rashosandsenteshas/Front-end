import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Aseguradora } from '../interfaces/aseguradora';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AseguradoraService {

  private MyAppUrl: string;
  private MyApiUrl: string;


  constructor(private http: HttpClient) {
    this.MyAppUrl = environment.endpoint
    this.MyApiUrl = 'api'
  }

  PostAseguradora(aseguradora: Aseguradora): Observable<any> {
    const token = localStorage.getItem('tokenVehiculo')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post(`${this.MyAppUrl}${this.MyApiUrl}/user/aseguradora`, aseguradora, { headers: headers })
  }

}
