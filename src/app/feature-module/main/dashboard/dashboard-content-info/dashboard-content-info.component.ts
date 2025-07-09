// A Supprimer ...
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

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
import { OwlOptions } from 'ngx-owl-carousel-o';
import Parse from 'parse';

import { LoginService } from '../../../../auth/services/login.service';
import {
  getCurrentAcademicYear,
  getPersonByUserId,
} from '../../../../services/statefull/genericParse';
import { globalGet } from '../../../../services/statefull/http';
import {
  checkTaskName_Enseignant,
  checkTaskName_Etablissement,
  checkTaskName_Minedub,
} from '../../../../shared/common/common.service';
import { routes } from '../../../../shared/routes/routes';

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
// Fin  a supprimer

@Component({
  selector: 'app-dashboard-content-info',
  standalone: false,
  templateUrl: './dashboard-content-info.component.html',
  styleUrl: './dashboard-content-info.component.scss'
})
export class DashboardContentInfoComponent implements OnInit {
  
  isAllowMinedub : boolean = false;
  isAllowEtablissement : boolean = false;
  isAllowEnseignant : boolean = false;

  public routes = routes;
   annees : any[] = [];
   anneeEnCours: any; // l'année en cours
   currentUser : any = {};
   currentPerson : any;
   totalInstitutions : any [] = [];

  date: Date | undefined;
  person: any = {};
  classRooms: any[] = [];
  classroomArray: any[] = [];
  academicYear: any = {};
  tableData: any[] = [];
  totalRecords = 0;
  filteredStudents: any[] = [];
  
   totalInstitutionsPublics : any [] = [];
   totalInstitutionsPublicsOpen : any [] = [];
   totalInstitutionsPublicsClose : any [] = [];

   totalInstitutionsPrives : any [] = [];
   totalInstitutionsPrivesAgrees : any [] = [];
   totalInstitutionsPrivesClandestin : any [] = [];
   totalInstitutionsLaics : any [] = [];
   totalInstitutionsConf : any [] = [];
   
   totalClassesOp : any [] = [];
   totalClassesNotOp : any [] = [];
   
   totalPersons  : any [] = [];
   totalStudents : any [] = [];
   totalStudentsBoy : any [] = [];
   totalStudentsGirl : any [] = [];
   totalStudentsActive : any [] = [];
   totalStudentsInactive : any [] = [];

   totalTeachers : any [] = [];
   totalTeachersMens : any [] = [];
   totalTeachersWomens : any [] = [];
   totalTeachersActive : any [] = [];
   totalTeachersInactive : any [] = [];
   
   totalStaffs : any [] = [];
   totalStaffsMens : any [] = [];
   totalStaffsWomens : any [] = [];
   totalStaffsActive : any [] = [];
   totalStaffsInactive : any [] = [];


  constructor(private loginService: LoginService, private router: Router,) {
    // A supprimer ...
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
  // Fin à supprimer
  }

  async ngOnInit() {

    console.log('---------------------- onInit ')
    this.currentUser = this.loginService.getUser();
    this.currentPerson = await getPersonByUserId(this.currentUser.objectId);
    this.isAllowMinedub = checkTaskName_Minedub(this.currentUser?.role?.task_name);
    this.isAllowEtablissement = checkTaskName_Etablissement(this.currentUser?.role?.task_name);
    this.isAllowEnseignant = checkTaskName_Enseignant(this.currentUser?.role?.task_name);
    
    // Trouver l'année en cours (isCurrent)
    this.annees = await globalGet({T: 'AcademicYear'});
    this.academicYear = await getCurrentAcademicYear();

    const queries = ['teacherChief', 'teacherSecond'].map((k: string) => { 
      const q = new Parse.Query('Classroom')
      q.equalTo(k, {"__type": "Pointer", "className": "Person" , "objectId": this.currentPerson?.objectId})
      return q
    })
    const query = Parse.Query.or(...queries);
    const result = await query.find()
    console.log('Classroom Classroom Classroom Classroom 222', result)
    this.classRooms = result?.map(r => r?.toJSON())
    await this.getTableData(1)
    
    
    this.anneeEnCours = this.annees.find(a => a.isCurrent) || this.annees[0];

    this.totalInstitutions = await globalGet({T: 'Institution' });

    this.totalInstitutionsPublics = this.totalInstitutions.filter(x => !x.isPrivateInstitution);
    this.totalInstitutionsPublicsOpen = this.totalInstitutionsPublics.filter(x => x.isActive);
    this.totalInstitutionsPublicsClose = this.totalInstitutionsPublics.filter(x => !x.isActive);

    this.totalInstitutionsPrives = this.totalInstitutions.filter(x => x.isPrivateInstitution);
    this.totalInstitutionsLaics = this.totalInstitutionsPrives.filter(x => x.isInstitutionLaique);
    this.totalInstitutionsConf = this.totalInstitutionsPrives.filter(x => !x.isInstitutionLaique);
    this.totalInstitutionsPrivesAgrees = this.totalInstitutionsPrives.filter(x => x.isAgree);
    this.totalInstitutionsPrivesClandestin = this.totalInstitutionsPrives.filter(x => !x.isAgree)

    this.totalPersons = await globalGet({T: 'Person', includes: ['gender', 'institution', 'user', 'user.role']});
    console.log('---------------------- onInit 2')
    this.totalTeachers = this.totalPersons.filter(x => x.isStaff);
    this.totalStaffs = this.totalPersons.filter(x => x.isStaff && x?.institution?.objectId === this.currentPerson?.institution.objectId);
    this.totalTeachersMens = this.totalTeachers.filter(x => x.gender.slug == 'male');
    this.totalTeachersWomens = this.totalTeachers.filter(x => x.gender.slug == 'female');
    console.log('---------------------- onInit 3')
    this.totalStudents = this.totalPersons.filter(x => x.isStudent);
    // this.totalStudentsBoy = this.totalStudents.filter(x => x.gender.slug == 'male');
    // this.totalStudentsGirl = this.totalStudents.filter(x => x.gender.slug == 'female');

    
  
    switch(this.currentUser?.role?.task_name)
    {
      case 'administration':
        break;

      case 'regional':
        break;

          case 'departemental':
        break;

          case 'arrondissement':
        break;

      case 'etablissement':
        this.totalTeachers = this.totalTeachers.filter(x => x?.institution?.objectId === this.currentPerson?.institution.objectId &&   x.user?.role?.task_name === "enseignant");
        this.totalTeachersMens = this.totalTeachers.filter(x => x.gender.slug == 'male');
        this.totalTeachersWomens = this.totalTeachers.filter(x => x.gender.slug == 'female');
       break;

      case 'enseignant':
              break;

      case 'parent':
        break;
    }
  /*
    totalClassesOp : any [] = [];
    totalClassesNotOp : any [] = [];
    
    totalStudentsActive : any [] = [];
    totalStudentsInactive : any [] = [];

    totalTeachers : any [] = [];
    totalTeachersMens : any [] = [];
    totalTeachersWomens : any [] = [];
    totalTeachersActive : any [] = [];
    totalTeachersInactive : any [] = [];
    
    totalStaffs : any [] = [];
    totalStaffsMens : any [] = [];
    totalStaffsWomens : any [] = [];
    totalStaffsActive : any [] = [];
    totalStaffsInactive : any [] = [];
  */





  // A supprimer 
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

  this.person = this.loginService.getPerson();

  }

  customFormattingFn(value: number): string {
    return value.toString();
  }




    // A Supprimer ...
  value!: Date;
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

  time: Date | undefined;
  time2: Date | undefined;
  addtime: Date | undefined;
  addtime2: Date | undefined;

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

  async getTableData(currentPage: number): Promise<void> {
    try {
      console.log('this.currentPerson this.currentPerson ', this.currentPerson?.user?.role)
      const idParam =  '';
      const includes = ['person', 'person.gender', 'classroom', 'classroom.classe', 'classroom.classe.section', 'person.section']
      const classesR = this.classRooms
      let queries: any = []
      if(classesR.length && this.currentPerson?.user?.role?.task_name === "enseignant"){
        queries = classesR.map((classr: any) => {
          const q = new Parse.Query('Enrollment')
          q.equalTo('classroom', {"__type": "Pointer", "className": "Classroom" , "objectId": classr?.objectId})
          return q
        })
      } 
      const mainQuery = classesR.length && this.currentPerson?.user?.role?.task_name === "enseignant" ? Parse.Query.or(...queries) : new Parse.Query('Enrollment');
      includes.forEach(include => {
        mainQuery.include(include)
      });
      if(!classesR.length && this.currentPerson?.user?.role?.task_name !== "enseignant"){
        mainQuery.equalTo("institution", {"__type": "Pointer", "className": "Institution" , "objectId": idParam == '' ? this.currentPerson?.institution?.objectId : idParam})
      }
      mainQuery.equalTo("academicYear", {"__type": "Pointer", "className": "AcademicYear" , "objectId": this.academicYear?.objectId})
      // mainQuery.equalTo("isValid", true)
      const results = await mainQuery.find()
      const json = results?.map(r => r?.toJSON())
      console.log('333333333 ', results?.map(r => r?.toJSON()))
      this.tableData = json // res || [];
      this.filteredStudents = [...this.tableData];
      this.totalRecords = json?.length//res?.count || res?.length || 0;
      this.totalStudentsGirl = this.filteredStudents?.filter(student => student?.person?.gender?.slug==="female")
      this.totalStudentsBoy = this.filteredStudents?.filter(student => student?.person?.gender?.slug==="male")
      this.totalStudentsActive = this.filteredStudents?.filter(student => student?.isValid)
      this.totalStudentsInactive = this.filteredStudents?.filter(student => !student?.isValid)
    } catch (error) {
      throw error;
    }
  }

  getType(type: string){
    return this.totalStaffs?.filter(x => x.gender.slug === type).length
  }

 
}
