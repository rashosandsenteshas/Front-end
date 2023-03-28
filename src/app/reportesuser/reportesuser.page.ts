import { Component, OnInit } from '@angular/core';
import type { DateTimeFormatOptions } from 'intl';
import { ReportesService } from '../services/reportes.service';

@Component({
  selector: 'app-reportesuser',
  templateUrl: './reportesuser.page.html',
  styleUrls: ['./reportesuser.page.scss'],
})
export class ReportesuserPage implements OnInit {
  /* Se guarda el reporte en la variable "reportes" */
  reportesUser: any;
  selectedReportId: any;

  constructor(private _reportesService: ReportesService) {}

  ngOnInit() {
    this.getreportes();
  }

  formatDate(date: string) {
    const options: DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  getreportes() {
    this._reportesService.GetReporte().subscribe((data) => {
      this.reportesUser = data;

    });
  }

}
