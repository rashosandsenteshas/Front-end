import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PasswordReset, SendCode, VerifyCode } from '../interfaces/recuperacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecuperacionService {
  private MyAppUrl: string;
  private MyApiUrl: string;

  constructor(private http: HttpClient) {
    this.MyAppUrl = environment.endpoint;
    this.MyApiUrl = 'api';
  }


  sendCode(number: SendCode): Observable<any> {
    return this.http.post(`${this.MyAppUrl}${this.MyApiUrl}/user/enviar-codigo`, number)
  }

  verifyCode(code: VerifyCode): Observable<any> {
    return this.http.post(`${this.MyAppUrl}${this.MyApiUrl}/user/verificar-codigo`, code)
  }

  putPassword(password: PasswordReset): Observable<any> {
    return this.http.put(`${this.MyAppUrl}${this.MyApiUrl}/user/actualizar-contrasena`, password)
  }
}
