import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reportes } from '../interfaces/reportes';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  private MyAppUrl: string;
  private MyApiUrl: string;

  constructor(private http: HttpClient) {
    this.MyAppUrl = environment.endpoint;
    this.MyApiUrl = 'api';
  }

  PostReporte(reporte: Reportes): Observable<string> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<string>(`${this.MyAppUrl}${this.MyApiUrl}/user/reportes`, reporte, { headers: headers})
  }
}
