import { Component, OnInit, Renderer2 } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { Router } from '@angular/router';
import { LoginService } from '../../../../auth/services/login.service';
import { AlertService } from '../../../../services/alertService';
import { getCurrentAcademicYear } from '../../../../services/statefull/genericParse';
import { globalGet } from '../../../../services/statefull/http';
import { StudentService } from '../../../../services/student.service';
import Parse from 'parse';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-student-list-homeworks',
  standalone: false,
  templateUrl: './student-list-homeworks.component.html',
  styleUrl: './student-list-homeworks.component.scss'
})

export class StudentListHomeworksComponent implements OnInit {
  public routes = routes;
  public length = 10; // Nombre d'éléments par page
  public totalItems = 0; // Nombre total d'éléments
  public currentPage = 0; // Page actuelle
  public searchDataValue = ''; // Valeur recherchée
  public homeworks: any[] = []; // Liste des devoirs
  public isLoading = false; // Indicateur de chargement
  public error = ''; // Message d'erreur
  public rows = 0; // Variable pour stocker le nombre total de lignes
  public selectedHomework: any = null; // Stocke le devoir sélectionné
  public selectedYear : any = null;
  public academicYears : any[] = [];
  currentUser : any = {};
  currentPerson : any = {};
  classes : any[] = [];
  selectedClasse : string | undefined;
  sections : any[] = [];
  selectedSection :string | undefined;
  genders : any[] = [];
  selectedGender : string | undefined;
  statuts : any[] = [{item: "Actif", value: true}, {item: "Inactif", value: false}];
  selectedStatut : boolean = true;
  
  person: any = null;
  homework: any = [];
  classroom: any = null;
  classroomId : any = null;

  constructor(private loginService: LoginService  ) {}

  async ngOnInit() {
    this.currentUser = this.loginService.getUser();
    this.currentPerson = this.loginService.getPerson();
    this.academicYears = await globalGet({T: 'AcademicYear'});
    
    this.selectedYear = 'dsiw02koq7'; //await getCurrentAcademicYear(); // A recupérer de façon dynamique
    this.classroomId = 'gvJiOAkJ9p'; // A recupérer de façon dynamique
    this.loadHomeworks(this.selectedYear.objectId, this.classroomId);
  }

  async loadHomeworks(yearId : any, idclassroom : any = '') : Promise<void> {
     this.homeworks = await globalGet({
      T: "HomeWork",  
      filters: { 
        classroom: {
          className: "Classroom", // Nom de la classe Parse
          objectId: idclassroom // ID de l'objet lié // 'gvJiOAkJ9p'     
        },
        // includes :  ["Person"]
     }
    });
     console.log('load homeworks list', this.homeworks);
  }

selectYear(yearAcademicId: any): void {
  this.selectedYear = yearAcademicId;
  // Ajoutez ici toute autre logique nécessaire
  console.log('Année sélectionnée:', this.selectedYear);
}

 // Retourne le nombre de Jours restants pour la remise des devoirs à l'enseignant
getDaysRemaining(submissionDate: Date): number {
    const today = new Date();
    const timeDiff = submissionDate.getTime() - today.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  }

  getStatusClass(days: number): string {
    if (days < 0) return 'En Retard';
    if (days === 0) return 'Aujourd\'hui';
    if (days <= 3) return 'Urgent';
    return 'Normal';
  }

  public changePage(pageIndex: number): void {
    this.currentPage = pageIndex; // Vous pouvez ici implémenter une logique pour charger uniquement les données de la page actuelle si vous avez beaucoup de devoirs
  }  
}