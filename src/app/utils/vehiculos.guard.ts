import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { VehiculosService } from '../services/vehiculos.service';

@Injectable({
  providedIn: 'root',
})
export class VehiculosGuard implements CanActivate {
  constructor(private _vehiculoService: VehiculosService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this._vehiculoService.Getvehiculo();

    return true;
  }
}
