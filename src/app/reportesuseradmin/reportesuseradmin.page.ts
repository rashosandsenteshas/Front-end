import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../services/reportes.service';
import { DateTimeFormatOptions } from 'intl';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-reportesuseradmin',
  templateUrl: './reportesuseradmin.page.html',
  styleUrls: ['./reportesuseradmin.page.scss'],
})
export class ReportesuseradminPage implements OnInit {
  reportes: any;
  selectedReportId: any;
  id: any = String;
  message: string = '';

  constructor(
    private _reportesService: ReportesService,
    private http: HttpClient,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id_usuarios');
    this.http
      .get(`https://sorcen-px.up.railway.app/api/user/${this.id}/reportes/`)
      .subscribe(
        (data) => {
          this.reportes = data;
        },
        (e: HttpErrorResponse) => {
          this.msjError(e);
        }
      );
  }

  formatDate(date: string) {
    const options: DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  async msjError(e: HttpErrorResponse) {
    if (e.error.message) this.message = e.error.message;
  }
}
