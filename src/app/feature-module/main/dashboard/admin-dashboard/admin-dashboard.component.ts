import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import Parse from 'parse';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexPlotOptions,
  ApexStroke,
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { routes } from '../../../../shared/routes/routes';
import { Router } from '@angular/router';
import { fetchCurrentPerson, getCurrentAcademicYear } from '../../../../services/statefull/genericParse';
import { AuthService } from '../../../../services/auth.service';
import { LoginService } from '../../../../auth/services/login.service';


export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  stroke: ApexStroke | any;
  grid: ApexGrid | any;
};
interface Task {
  title: string;
  time: string;
  status: string;
  completed: boolean;
}

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss',
    standalone: false
})
export class AdminDashboardComponent implements OnInit {
  public routes = routes;
  value!: Date;
  person : any = {};
  academicYear: any;
  institutionId: any;
  teacherStat: any;
  studentStat: any;
  classStat: any;
  staffStats: any;
  isLoading: boolean = false;
  error: string | null = null;
  recentActivities= [];

  public student: OwlOptions = {
    loop: true,
    margin: 24,
    nav: true,
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
        items: 1,
      },
    },
  };
  public teacher: OwlOptions = {
    loop: true,
    margin: 24,
    nav: true,
    dots: false,
    autoplay: false,
    smartSpeed: 1000,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],

    responsive: {
      0: {
        items: 1,
      },
    },
  };
  public linkslider: OwlOptions = {
    items: 3,
    loop: true,
    margin: 24,
    nav: false,
    rtl:true,
    dots: false,
    autoplay: false,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 3,
      },
      1400: {
        items: 2,
      },
      1500: {
        items: 3,
      },
    },
  };
  public linkSlider: OwlOptions = {
    items: 3,
    loop: true,
    rtl:true,
    margin: 24,
    nav: false,
    dots: false,
    autoplay: false,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 3,
      },
      1400: {
        items: 2,
      },
      1500: {
        items: 3,
      },
    },
  };
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;
  public chartOptions5: Partial<ChartOptions> | any;
  public chartOptions6: Partial<ChartOptions> | any;
  public chartOptions7: Partial<ChartOptions> | any;

  constructor(private router: Router, private loginService: LoginService) {
    this.chartOptions = {
      chart: {
        height: 90,
        type: 'area',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },

      series: [
        {
          name: 'Earnings',
          colors: ['#3D5EE1'],
          data: [50, 60, 40, 50, 45, 55, 50],
        },
      ],
    };
    this.chartOptions2 = {
      chart: {
        height: 90,
        type: 'area',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#E82646'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      series: [
        {
          name: 'Earnings',
          colors: ['#FFC38F'],
          data: [40, 20, 60, 55, 50, 55, 40],
        },
      ],
    };
    this.chartOptions3 = {
      chart: {
        height: 275,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: true,
        horizontalAlign: 'left',
        position: 'top',
        fontSize: '14px',
        labels: {
          colors: '#5D6369',
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          endingShape: 'rounded',
        },
      },
      colors: ['#3D5EE1', '#E9EDF4'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      grid: {
        padding: {
          left: -8,
        },
      },
      series: [
        {
          name: 'Collected Fee',
          data: [30, 40, 38, 40, 38, 30, 35, 38, 40],
        },
        {
          name: 'Total Fee',
          data: [45, 50, 48, 50, 48, 40, 40, 50, 55],
        },
      ],
      xaxis: {
        categories: [
          'Q1: 2023',
          'Q1: 2023',
          'Q1: 2023',
          'Q1: 2023',
          'Q1: 2023',
          'uQ1: 2023l',
          'Q1: 2023',
          'Q1: 2023',
          'Q1: 2023',
        ],
      },
      yaxis: {
        min: 0,
        max: 150,
        tickAmount: 3,
        labels: {
          formatter: function (value: number) {
            return value.toFixed(0); // Format labels to be integers
          },
        },
      },
    };
    this.chartOptions4 = {
      chart: {
        height: 260,
        type: 'donut',
        toolbar: {
          show: false,
        },
      },
      colors: ['#3D5EE1', '#6FCCD8'],
      series: [620, 80],
      labels: ['Present', 'Absent'],
      legend: { show: false },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 150,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
    this.chartOptions5 = {
      chart: {
        height: 260,
        type: 'donut',
        toolbar: {
          show: false,
        },
      },
      colors: ['#3D5EE1', '#6FCCD8'],
      series: [346, 54],
      labels: ['Present', 'Absent'],
      legend: { show: false },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 150,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
    this.chartOptions6 = {
      chart: {
        height: 260,

        type: 'donut',
        toolbar: {
          show: false,
        },
      },
      colors: ['#3D5EE1', '#6FCCD8'],
      series: [3610, 44],
      labels: ['Present', 'Absent'],
      legend: { show: false },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 120,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
    this.chartOptions7 = {
      chart: {
        height: 130,
        type: 'donut',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      colors: ['#3D5EE1', '#EAB300', '#E82646'],
      series: [45, 11, 2],
      labels: ['Good', 'Average', 'Below Average'],
      legend: { show: false },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        tickAmount: 3,
        labels: {
          offsetX: -15,
        },
      },
      grid: {
        padding: {
          left: -8,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
  time: Date | undefined;
  time2: Date | undefined;
  addtime: Date | undefined;
  addtime2: Date | undefined;
  async ngOnInit() {
    this.time = new Date();
    this.time.setHours(8);
    this.time.setMinutes(30);
    this.time2 = new Date();
    this.time2.setHours(6);
    this.time2.setMinutes(30);
    const isRtl = this.router.url.includes('dashboard/layout-rtl');
    this.student = {
      loop: true,
      margin: 24,
      nav: true,
      dots: false,
      autoplay: false,
      smartSpeed: 1000,
      rtl: isRtl,
      navText: [
        '<i class="fas fa-chevron-left"></i>',
        '<i class="fas fa-chevron-right"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
      },
    };
    this.teacher = {
      loop: true,
      margin: 24,
      nav: true,
      dots: false,
      autoplay: false,
      smartSpeed: 1000,
      rtl: isRtl,
      navText: [
        '<i class="fas fa-chevron-left"></i>',
        '<i class="fas fa-chevron-right"></i>',
      ],

      responsive: {
        0: {
          items: 1,
        },
      },
    };

    this.person = await this.loginService.getPerson();
    this.academicYear = await getCurrentAcademicYear();
    this.institutionId = this.person?.institution?.objectId;
     await this.loadDashboardData();
     console.log(this.person)
  }
loadDashboardData(): Promise<void> {
  this.isLoading = true;
  this.error = null;

  return new Promise((resolve, reject) => {
    if (!this.institutionId) {
      this.isLoading = false;
      reject(new Error('No institution found for the current user'));
      return;
    }

    Promise.all([
      this.getClassStatistics(),
      this.getStudentStatistics(),
      this.getTeacherStatistics(),
      this.getStaffStatistics()
    ])
    .then(([classStats, studentStats, teacherStats, staffStats]) => {
      this.classStat = classStats;
      this.studentStat = studentStats;
      this.teacherStat = teacherStats;
      this.staffStats = staffStats;

      console.log(this.staffStats);
      console.log(this.teacherStat);
      console.log(this.studentStat);
      console.log(this.classStat);

      resolve();
    })
    .catch(error => {
      console.log('error ', error);
      this.error = error;
      reject(error);
    })
    .finally(() => {
      this.isLoading = false;
    });
  });
}

    async getTeacherStatistics(): Promise<any> {
    const Person = Parse.Object.extend('Person');
    const query = new Parse.Query(Person);

    query.equalTo('institution', Parse.Object.extend('Institution').createWithoutData(this.institutionId));
    query.equalTo('isStaff', true);
    query.equalTo('staffType', Parse.Object.extend('StaffType').createWithoutData('teacher')); // Assuming you have a StaffType for teachers
    query.include('gender');

    const results = await query.find();

    return {
      totalTeachers: results.length,
      byGender: {
        male: results.filter(p => p.get('gender')?.get('libelle_fr')?.toLowerCase().includes('homme')).length || 0,
        female: results.filter(p => p.get('gender')?.get('libelle_fr')?.toLowerCase().includes('femme')).length || 0
      },
      byStatus: {
        active: results.filter(p => p.get('isActive')).length || 0,
        inactive: results.filter(p => !p.get('isActive')).length || 0
      }
    };
  }

   async getStaffStatistics(): Promise<any> {
    const Person = Parse.Object.extend('Person');
    const query = new Parse.Query(Person);

    query.equalTo('institution', Parse.Object.extend('Institution').createWithoutData(this.institutionId));
    query.equalTo('isStaff', true);
    query.include('gender');

    const results = await query.find();

    return {
      totalStaff: results.length,
      byGender: {
        male: results.filter(p => p.get('gender')?.get('libelle_fr')?.toLowerCase().includes('homme')).length || 0,
        female: results.filter(p => p.get('gender')?.get('libelle_fr')?.toLowerCase().includes('femme')).length || 0
      },
      byStatus: {
        active: results.filter(p => p.get('isActive')).length || 0,
        inactive: results.filter(p => !p.get('isActive')).length || 0
      }
    };
  }

  async getStudentStatistics(): Promise<any> {
    const Enrollment = Parse.Object.extend('Enrollment');
    const query = new Parse.Query(Enrollment);

    query.equalTo('institution', Parse.Object.extend('Institution').createWithoutData(this.institutionId));
    query.equalTo('academicYear', Parse.Object.extend('AcademicYear').createWithoutData(this.academicYear.objectId));
    query.include('classroom');
    query.include('classroom.classe');
    query.include('classroom.classe.classroomLevel');
    query.include('section');
    query.equalTo('isValid', true);
    query.include('person');
    query.include('person.gender');

    const results = await query.find();

    const statistics: any = {
      totalStudents: results.length,
      byGender: {
        male: 0,
        female: 0
      },
      byStatus: {
        active: 0,
        inactive: 0
      },
      byLevel: {},
      bySection: {}
    };

    results.forEach(enrollment => {
      const gender = enrollment.get('person')?.get('gender')?.get('slug') || '';

      if (gender == 'male') {
        statistics.byGender.male++;
      } else if (gender == 'female') {
        statistics.byGender.female++;
      }

      // Assuming active status based on enrollment validity
      if (enrollment.get('isValid')) {
        statistics.byStatus.active++;
      } else {
        statistics.byStatus.inactive++;
      }

      const level = enrollment.get('classroom')?.get('classe')?.get('classroomLevel')?.get('libelle') || 'Unknown';
      statistics.byLevel[level] = (statistics.byLevel[level] || 0) + 1;

      const section = enrollment.get('section')?.get('name_fr') || 'Unknown';
      statistics.bySection[section] = (statistics.bySection[section] || 0) + 1;
    });

    return statistics;
  }
async getClassStatistics(): Promise<any> {
    const Classroom = Parse.Object.extend('Classroom');
    const query = new Parse.Query(Classroom);

    query.equalTo('institution', Parse.Object.extend('Institution').createWithoutData(this.institutionId));
    query.equalTo('academicYear', Parse.Object.extend('AcademicYear').createWithoutData(this.academicYear.objectId));
    query.include('classe');
    query.include('section');
    query.include('classe.classroomLevel');

    const results = await query.find();

    const statistics: any = {
      totalClasses: results.length,
      byLevel: {},
      bySection: {},
      byStatus: {
        active: 0,
        inactive: 0
      }
    };

    results.forEach(classroom => {
      const level = classroom.get('classe')?.get('classroomLevel')?.get('libelle') || 'Unknown';
      statistics.byLevel[level] = (statistics.byLevel[level] || 0) + 1;

      const section = classroom.get('section')?.get('name_fr') || 'Unknown';
      statistics.bySection[section] = (statistics.bySection[section] || 0) + 1;

      if (classroom.get('isActive')) {
        statistics.byStatus.active++;
      } else {
        statistics.byStatus.inactive++;
      }
    });

    return statistics;
  }


  tasks: Task[] = [
    {
      title: 'Send Reminder to Students',
      time: '01:00 PM',
      status: 'Completed',
      completed: true,
    },
    {
      title: 'Create Routine to new staff',
      time: '04:50 PM',
      status: 'Inprogress',
      completed: false,
    },
    {
      title: 'Extra Class Info to Students',
      time: '04:55 PM',
      status: 'Yet to Start',
      completed: false,
    },
    {
      title: 'Fees for Upcoming Academics',
      time: '04:55 PM',
      status: 'Yet to Start',
      completed: false,
    },
    {
      title: 'English - Essay on Visit',
      time: '05:55 PM',
      status: 'Yet to Start',
      completed: false,
    },
  ];

  toggleCompletion(task: Task) {
    task.completed = !task.completed;
  }
  customFormattingFn(value: number): string {
    return value.toString();
  }

  // Test the function



}
