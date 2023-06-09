import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guard';
import { VehiculosGuard } from './utils/vehiculos.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'registervehicle',
    loadChildren: () => import('./registervehicle/registervehicle.module').then( m => m.RegistervehiclePageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'tabs',
    canActivate: [VehiculosGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'usersadmin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./usersadmin/usersadmin.module').then( m => m.UsersadminPageModule,)
  },
  {
    path: 'usersadmin/:nombre',
    canActivate: [AuthGuard],
    loadChildren: () => import('./usersadmin/usersadmin.module').then( m => m.UsersadminPageModule,)
  },
  {
    path: 'userprofile/:id_usuarios',
    loadChildren: () => import('./userprofile/userprofile.module').then( m => m.UserprofilePageModule)
  },
  {
    path: 'userprofile/:id_usuarios/adminvehicleprofile/:id_vehiculo',
    loadChildren: () => import('./adminvehicleprofile/adminvehicleprofile.module').then( m => m.AdminvehicleprofilePageModule)
  },
  {
    path: 'vehicleprofile/:id',
    loadChildren: () => import('./vehicleprofile/vehicleprofile.module').then( m => m.VehicleprofilePageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'recuperarcontrasena',
    loadChildren: () => import('./recuperarcontrasena/recuperarcontrasena.module').then( m => m.RecuperarcontrasenaPageModule)
  },
  {
    path: 'codigo',
    loadChildren: () => import('./codigo/codigo.module').then( m => m.CodigoPageModule)
  },
  {
    path: 'recuperacion',
    loadChildren: () => import('./recuperacion/recuperacion.module').then( m => m.RecuperacionPageModule)
  },
  {
    path: 'reportesuser',
    loadChildren: () => import('./reportesuser/reportesuser.module').then( m => m.ReportesuserPageModule)
  },
  {
    path: 'userprofile/:id_usuarios/reportesuseradmin',
    loadChildren: () => import('./reportesuseradmin/reportesuseradmin.module').then( m => m.ReportesuseradminPageModule)
  }


  /* {
    path: '**',
    redirectTo: 'home'
  }, */
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
