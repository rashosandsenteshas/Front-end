import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    this.verificarSesion()
  }

  verificarSesion() {
    
    // const user = localStorage.getItem('token')

    const role: any = localStorage.getItem('token');
    if (role) {
      const decodedToken: any = jwt_decode(role);
      const idRoles = decodedToken.id_roles;

      if(idRoles === 2){
        this.router.navigate(['/tabs/vehiculos'])
      } else if(idRoles === 1){
        this.router.navigate(['/usersadmin'])
      } else {
        this.router.navigate(['/home'])
      }
    }

    

    // if(!decodedToken){
    //   return this.router.navigate(['/home'])
    // }

    // if(idRoles === 2){
    //   this.router.navigate(['/tabs/vehiculos'])
    // } else if(idRoles === 1){
    //   this.router.navigate(['/usersadmin'])
    // } else {
    //   this.router.navigate(['/home'])
    // }

  }
}


