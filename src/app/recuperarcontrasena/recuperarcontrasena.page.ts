import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { RecuperacionService } from '../services/recuperacion.service';
import { SendCode } from '../interfaces/recuperacion';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {

  /* se guarda el numero en una variable */
  numero: string = ''

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private _recuperacionService: RecuperacionService,
    private http: HttpClient,
    private router: Router,
    ){ }

  ngOnInit() {
  }

  /* funcion para enviar al API REST el numero */
  async sendNumero() {
    if(!this.numero){
      const alert = await this.alertController.create({
        header: 'Lo sentimos!!',
        message: 'Porfavor digite el numero.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }     

    const numero: SendCode = { 
      numero: this.numero
    }

    this._recuperacionService.sendCode(numero).subscribe(data => {
      this.router.navigate(['/codigo'])
    })
  }
}