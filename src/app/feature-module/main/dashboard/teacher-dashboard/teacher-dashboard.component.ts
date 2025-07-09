import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexPlotOptions,
  ApexDataLabels, 
  ApexLegend,
  ApexGrid,
} from 'ng-apexcharts';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from '../../../../shared/routes/routes';
import { LoginService } from '../../../../auth/services/login.service';
import {  getCurrentAcademicYear } from '../../../../services/statefull/genericParse';

import Parse from 'parse';

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
};
@Component({
    selector: 'app-teacher-dashboard',
    templateUrl: './teacher-dashboard.component.html',
    styleUrl: './teacher-dashboard.component.scss',
    standalone: false
})
export class TeacherDashboardComponent implements OnInit{
  public routes = routes;
  public studentDonutChart: Partial<ChartOptions>;
  public attendanceChart: Partial<ChartOptions>;
  date: Date | undefined;
  person: any = {};
  classRooms: any[] = [];
  classroomArray: any[] = [];
  currentPerson: any = {};
  academicYear: any = {};
  tableData: any[] = [];
   totalRecords = 0;
  filteredStudents: any[] = [];

  constructor(private loginService : LoginService) {
    this.date = new Date();

    this.studentDonutChart = {
      series: [95, 5],
      chart: {
        height: 90,
        type: 'donut',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Completed', 'Pending'],
      legend: {
        show: false,
      },
      colors: ['#1ABE17', '#E82646'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    this.attendanceChart = {
      series: [60, 5, 15, 20],
      chart: {
        height: 290,
        type: 'donut',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Present', 'Late', 'Half Day', 'Absent'],
      colors: ['#1ABE17', '#1170E4', '#E9EDF4', '#E82646'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'left',
            },
          },
        },
      ],
      legend: {
        position: 'bottom',
      },
    };
  }

  async ngOnInit(): Promise<any> {
    this.academicYear = await  getCurrentAcademicYear()
    this.person = await this.loginService.getPerson();
    if(this.person?.user?.role?.task_name === "enseignant"){
      const queries = ['teacherChief', 'teacherSecond'].map((k: string) => {
        const q = new Parse.Query('Classroom')
        q.equalTo(k, {"__type": "Pointer", "className": "Person" , "objectId": this.person?.objectId})
        return q
      })
      const query = Parse.Query.or(...queries);
      const result = await query.find()
      console.log('Classroom Classroom Classroom Classroom ', result)
      this.classRooms = result?.map(r => r?.toJSON())
      await this.getTableData(1)
    }
  }


  async getTableData(currentPage: number): Promise<void> {
    try {
      console.log('this.person this.person ', this.person)
      const includes = ['person', 'person.gender', 'classroom', 'classroom.classe', 'classroom.classe.section', 'person.section']
      const classesR = this.classRooms
      let queries: any = []
      if(classesR.length && this.person?.user?.role?.task_name === "enseignant"){
        queries = classesR.map((classr: any) => {
          const q = new Parse.Query('Enrollment')
          q.equalTo('classroom', {"__type": "Pointer", "className": "Classroom" , "objectId": classr.objectId})
          return q
        })
      }
      const mainQuery = classesR.length && this.person?.user?.role?.task_name === "enseignant" ? Parse.Query.or(...queries) : new Parse.Query('Enrollment');
      includes.forEach(include => {
        mainQuery.include(include)
      });
      mainQuery.equalTo("academicYear", {"__type": "Pointer", "className": "AcademicYear" , "objectId": this.academicYear?.objectId})
      mainQuery.equalTo("isValid", true)
      const results = await mainQuery.find()
      const json = results?.map(r => r?.toJSON())
      console.log('DATAT DATAT DATAT DTA =>>>> ', results?.map(r => r?.toJSON()))
      this.tableData = json // res || [];
      this.filteredStudents = [...this.tableData];
      this.totalRecords = json?.length//res?.count || res?.length || 0;
    } catch (error) {
      throw error;
    }
  }

  customFormattingFn(value: number): string {
    return value.toString();
  }
  customOptions: OwlOptions = {
    items: 3,
    loop: true,
    margin: 15,
    nav: true,
    dots: false,
    smartSpeed: 1000,
    navText: [
      '<i class="ti ti-chevron-left"></i>',
      '<i class="ti ti-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 4,
      },
      1200: {
        items: 4,
      },
      1400: {
        items: 4,
      },
    },
  };
  public lesson: OwlOptions = {
    loop: true,
    margin: 24,
    nav: false,
    dots: false,
    autoplay: false,
    smartSpeed: 1000,
    // navContainer: '.slide-nav5',
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
   
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  };
}
