import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { userResponse } from '../interfaces/usuarios';

@Component({
  selector: 'app-usersadmin',
  templateUrl: './usersadmin.page.html',
  styleUrls: ['./usersadmin.page.scss'],
})
export class UsersadminPage implements OnInit {
  listUsuarios: any;
  listUsuario: any;

  searchTerm: string = '';
  searchResults: any

  searchTimeout: any;


  showListUsuario: boolean = true;
  constructor(
    private http: HttpClient,
    private _usuariosService: UsuarioService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getUsuarios();
    
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getUsuarios();
      event.target.complete();
      this.searchTerm = ''



    }, 2000);
  }

  onSearchKeyUp(event: KeyboardEvent) {

    
    if (!this.searchTerm) {
      this.getUsuarios();
      return;
    }  

    // Verificar si la tecla presionada fue una letra o un número
    if (/^[a-zA-Z]$/.test(event.key)) {
      // Verificar si la longitud del valor del input es mayor a cero
      if (this.searchTerm && this.searchTerm.length > 0) {
        this.search();
      }
    }
  }

  search() {

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this._usuariosService.search(this.searchTerm).subscribe({
        next: (data) => {
          this.searchResults = data;
          console.log(this.searchResults);
          this.showListUsuario = true;
        }
      })
    }, 400);    
  }

  getUsuarios() {

    this._usuariosService
      .getUsuarios()
      .subscribe((data: { rows: any }) => (this.listUsuarios = data.rows));

      this.showListUsuario = false;
  }

  logOut() {
    this.router.navigate(['/login'])
    localStorage.removeItem('token')
    localStorage.removeItem('tokenEntrada_salida')
  }
}
