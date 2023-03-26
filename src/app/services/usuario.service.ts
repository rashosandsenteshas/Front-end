import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Datos, Password, Usuarios } from '../interfaces/usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private MyAppUrl: string;
  private MyApiUrl: string;


  constructor(private http: HttpClient) { 
    this.MyAppUrl = environment.endpoint
    this.MyApiUrl = 'api'
  }

  /* Registramos al usuario */
  register(usuario: Usuarios): Observable<any> {
    return this.http.post(`${this.MyAppUrl}${this.MyApiUrl}/auth/register`, usuario)
  }

  /* Iniciamos sesion  */
  login(usuario: Usuarios): Observable<string> {
    return this.http.post<string>(`${this.MyAppUrl}${this.MyApiUrl}/auth/login`, usuario)
  }

  /* Obtener todos los usuarios registrados en la aplicacion */
  getUsuarios(): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<any>(`${this.MyAppUrl}${this.MyApiUrl}/usuarios`, { headers: headers })
    // return this.http.get<Usuarios[]>(`${this.MyAppUrl}${this.MyApiUrl}/usuarios`)
  }

  /* obtener datos de usuario logueado */

  getUsuarioById(): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<any>(`${this.MyAppUrl}${this.MyApiUrl}/user/usuarios`, { headers: headers })
  }

  /* actualizar datos de usuario logueado  excepto contrasena*/
  updateUser(dato: Datos): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.patch(`${this.MyAppUrl}${this.MyApiUrl}/user/usuarios`, dato, { headers: headers })
  }

  /* actualizar la contrasena encriptandola*/
  updatePassword(password: Password): Observable<any> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.put(`${this.MyAppUrl}${this.MyApiUrl}/user/usuarios`, password, { headers: headers })
  }

  /* buscador */
  search(query: string) {
    return this.http.get<any[]>(`${this.MyAppUrl}${this.MyApiUrl}/users/usuarios`, { params: { query: query } });
  }
} 
