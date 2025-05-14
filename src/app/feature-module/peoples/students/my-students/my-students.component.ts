import { Component,  Input, OnInit, Renderer2 } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { DataService } from '../../../../shared/data/data.service';
import { UtilsService } from '../../../../services/utilis.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { PaginationService } from '../../../../shared/custom-pagination/pagination.service';
import { AlertService } from '../../../../services/alertService';
import Parse from 'parse';
import { FilterStudent, getCurrentAcademicYear, listInscriptions } from '../../../../services/statefull/genericParse';
import { LoginService } from '../../../../auth/services/login.service';
import { globalGet } from '../../../../services/statefull/http';


@Component({
  selector: 'app-my-students',
  standalone: false,
  templateUrl: './my-students.component.html',
  styleUrl: './my-students.component.scss',
  
})
export class MyStudentsComponent implements OnInit{

  load: boolean = true;  public routes = routes;
  public length = 10; // Nombre d'éléments par page
  public totalItems = 0; // Nombre total d'éléments
  public currentPage = 0; // Page actuelle
  public searchDataValue = ''; // Valeur recherchée
  public students: any[] = []; // Liste des étudiants
  public isLoading = false; // Indicateur de chargement
  public error = ''; // Message d'erreur
  public rows = 0; // Variable pour stocker le nombre total de lignes
  public selectedStudent: any = null; // Stocke l'étudiant sélectionné
  person : any = {};
  academicYear : any = {};
  currentUser : any = {};
  values = [
    {'label': 'Actif', value: true},
    {'label': 'Inactif', value: false}
  ];

  @Input() filter : FilterStudent = {};

  classes : any[] = [];
  selectedClasse : string | undefined;
  sections : any[] = [];
  selectedSection :string | undefined;
  schools : any[] = [];
  selectedSchool : string | undefined;
  statuts : any[] = [{item: "Actif", value: true}, {item: "Inactif", value: false}];
  selectedStatut : boolean = true;
  academicYears : any[] = [];

  filteredStudents: any[] = [];

   constructor(
     private data: DataService,
     private utils: UtilsService,
     private authService: AuthService,
     private router: Router,
     private pagination: PaginationService,
     private alertService: AlertService,
     private renderer: Renderer2,
     private loginService: LoginService
   ) {}
 
  async ngOnInit() {
    this.load=true;
    this.academicYear = await getCurrentAcademicYear();    
    this.currentUser = this.loginService.getUser();
    this.person = this.loginService.getPerson();
    this.filter.parentId = this.person.objectId
    if(!this.filter.yearId){
      this.filter.yearId = this.academicYear.objectId;
    }
    this.loadStudents(this.filter);    
  }

  

  async loadStudents(f: FilterStudent) {
    this.isLoading = true;
  
    try {
 
      // Charger les inscriptions avec les filtres appliqués
      this.students = await listInscriptions({yearId: f.yearId, parentId: f.parentId});
      this.totalItems = this.students?.length || 0;
      this.rows = this.students?.length || 0;
      this.filteredStudents = this.students;
      this.loadFilterData();
    } catch (error) {
      console.error("Erreur lors du chargement des étudiants:", error);
      this.students = [];
    } finally {
      this.isLoading = false;
    }
  }


  async loadFilterData(){
    const uniqueSchoolsMap = new Map<string, {objectId: string, name: string}>();
    const uniqueSectionsMap = new Map<string, {objectId: string, name_fr: string}>();
    const uniqueClassesMap = new Map<string, {objectId: string, name_fr: string}>();

    this.students.forEach(student => {
      // Schools
      if (student.institution && !uniqueSchoolsMap.has(student.institution.objectId)) {
        uniqueSchoolsMap.set(student.institution.objectId, {objectId: student.institution.objectId, name:student.institution.name});
      }
      // Sections
      if (student.classroom.classe.section && !uniqueSectionsMap.has(student.classroom.classe.section.objectId)) {
        uniqueSectionsMap.set(student.classroom.classe.section.objectId, {objectId: student.classroom.classe.section.objectId, name_fr:student.classroom.classe.section.name_fr});
      }
      // Classes
      if (student.classroom.classe && !uniqueClassesMap.has(student.classroom.classe.objectId)) {
        uniqueClassesMap.set(student.classroom.classe.objectId, {objectId: student.classroom.classe.objectId, name_fr:student.classroom.classe.name_fr});
      }
    });



    this.classes = Array.from(uniqueClassesMap.values());
    this.sections = Array.from(uniqueSectionsMap.values());
    this.schools = Array.from(uniqueSchoolsMap.values());
    this.academicYears = await  globalGet({T:'AcademicYear'})

  }

  filterStudents() {
    this.filteredStudents = this.students.filter(student => {
        const matchesSchool = this.selectedSchool ? student?.institution?.objectId === this.selectedSchool : true;
        const matchesSection = this.selectedSection ? student.classroom?.classe?.section?.objectId === this.selectedSection : true;
        const matchesClasse = this.selectedClasse ? student.classroom?.classe?.objectId === this.selectedClasse : true;
        return matchesSchool && matchesSection && matchesClasse;
    });
}
  

  onSchoolChange(schoolId: string) {
      this.selectedSchool = schoolId;
      this.filterStudents();
  }
  onSectionChange(sectionId: string) {
      this.selectedSection = sectionId;
      this.filterStudents();
  }
  onClasseChange(classeId: string) {
      this.selectedClasse = classeId;
      this.filterStudents();
  }



  reset(){
    this.filteredStudents = this.students;
    this.selectedSchool = undefined;
    this.selectedClasse = undefined;
    this.selectedSection = undefined;
  }

  // loadStudents(): void {
  //   this.isLoading = true;
  //   this.error = '';
    
  //   this.studentService.getAllStudents()
  //     .pipe(
  //       finalize(() => {
  //         this.isLoading = false;
  //       })
  //     )
  //     .subscribe(
  //       (students) => {
  //         this.students = students;
  //         this.totalItems = students.length;
  //         this.rows = students.length;
  //       },
  //       (error) => {
  //         console.error('Error loading students:', error);
  //         this.error = 'Failed to load students. Please try again.';
  //     }
  //   );
  // }

  navigateToGigs() {
    // Remove the modal backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      this.renderer.removeChild(backdrop.parentNode, backdrop);
    }
    // Navigate to the specified route
    this.router.navigate(['peoples/students/student-details']);
  }

  viewDetails(id: string): void {
    this.isLoading = true;
    
  }

  public handleApplyClick(): void {
    const modalElements = document.getElementsByClassName('drop-width');
    if (modalElements.length > 0) {
      for (let i = 0; i < modalElements.length; i++) {
        const modalElement = modalElements[i];
        this.renderer.removeClass(modalElement, 'show');
      }
    }
  }

  public changePage(pageIndex: number): void {
    this.currentPage = pageIndex;
  }

  async getMesEnfants2() {
    const parentQuery = new Parse.Query('Person');    
    const parent = await parentQuery.get(this.person.objectId);
    
    if (!parent) {
        console.log('Parent non trouvé');
        return;
    }
    const childrenQuery = new Parse.Query('Person');
    childrenQuery.equalTo('parents', parent);
    const children = await childrenQuery.find();

    children.forEach(child => {
      console.log('Enfant:', {
        id: child.id,
        firstName: child.get('firstName'), 
        lastName: child.get('lastName'), 
        photo: child.get('photo'), 
          // Add more fields as needed
      });
  })    
    return children;
  }

  async getMesEnfants() {

    const parent = new Parse.Query('Person')
    parent.equalTo('isParent', true)
    const p = await parent.first()
    
    const elevs = new Parse.Query('Person')
    elevs.equalTo('parents', p)
    const els = await elevs.find()
    console.log('els els ', els)

  }
}

