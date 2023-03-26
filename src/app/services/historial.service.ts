import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private MyAppUrl: string;
  private MyApiUrl: string;

  constructor(private http: HttpClient) { 
    this.MyAppUrl = environment.endpoint
    this.MyApiUrl = 'api'
  }
  
  historial(): Observable<any> {
    return this.http.get(`${this.MyAppUrl}${this.MyApiUrl}/user/historial`)
  }
}
