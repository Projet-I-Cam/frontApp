import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexStroke, ApexXAxis, ChartComponent } from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  plotOptions: ApexPlotOptions | any;
  dataLabels: ApexDataLabels | any;
  labels: string[] | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  responsive: ApexResponsive[] | any;
  grid?: ApexGrid | any;
  xaxis: ApexXAxis | any;
  stroke?: ApexStroke | any;

};
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexPlotOptions,
  ApexDataLabels,
  ApexLegend,
  ApexGrid,
} from 'ng-apexcharts';
import { routes } from '../../../../shared/routes/routes';
import { fetchCurrentPerson } from '../../../../services/statefull/genericParse';
import { AuthService } from '../../../../services/auth.service';
import { LoginService } from '../../../../auth/services/login.service';

@Component({
    selector: 'app-parent-dashboard',
    templateUrl: './parent-dashboard.component.html',
    styleUrl: './parent-dashboard.component.scss',
    standalone: false
})
export class ParentDashboardComponent implements OnInit{
  public routes = routes;
  parent : any = {};

  constructor( private loginService: LoginService) {

  }

  async ngOnInit() {
    this.parent = this.loginService.getPerson();
  }

}
