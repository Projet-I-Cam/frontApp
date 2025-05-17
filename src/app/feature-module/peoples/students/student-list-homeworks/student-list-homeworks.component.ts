import { Component, OnInit, Renderer2 } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { Router } from '@angular/router';
import { LoginService } from '../../../../auth/services/login.service';
import { AlertService } from '../../../../services/alertService';
import { getCurrentAcademicYear } from '../../../../services/statefull/genericParse';
import { globalDelete, globalGet, globalPost, globalPut } from '../../../../services/statefull/http';
import { StudentService } from '../../../../services/student.service';
import Parse from 'parse';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { PaginationService } from '../../../../shared/custom-pagination/pagination.service';
import { AuthService } from '../../../../services/auth.service';
import { UtilsService } from '../../../../services/utilis.service';
declare var bootstrap: any;

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
  teacherId : any = null;

  isSubmited: boolean = false;
  entity: any = {};
  mode = 'create'; // Mode par défaut
  champRequis = '* Veuillez renseignez ce champ';

  constructor(
    private loginService: LoginService,
    private utils: UtilsService,
    private authService: AuthService,
    private router: Router,
    private pagination: PaginationService,
    private alertService: AlertService
  ) {}

  async ngOnInit() {
    this.entity = {};
    this.isSubmited = false;

    this.currentUser = this.loginService.getUser();
    this.currentPerson = this.loginService.getPerson();
    this.academicYears = await globalGet({T: 'AcademicYear'});
    this.selectedYear = 'dsiw02koq7'; //await getCurrentAcademicYear(); // A recupérer de façon dynamique
    this.classroomId = 'gvJiOAkJ9p'; // A recupérer de façon dynamique
    console.log('User id : ', this.currentUser);
    this.teacherId =  'dcLJrWeoTQ'; // this.currentUser.objectId; // A recupérer de façon dynamique
    this.loadHomeworks(this.selectedYear.objectId, this.classroomId);
  }

  async loadHomeworks(yearId : any, idclassroom : any = '') : Promise<void> {
    try { 
        this.homeworks = await globalGet({
          T: "HomeWork",  
          filters: { 
            classroom: {
              className: "Classroom", // Nom de la classe Parse
              objectId: idclassroom // ID de l'objet lié // 'gvJiOAkJ9p'     
            },
        },   
            includes :  ['teacher']
        });
        console.log('load homeworks list', this.homeworks);
     } catch (error) {
        this.alertService.showError('Erreur lors du chargement des données');
      }
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

  // Permet de lister les rôles ayant l'accès en modification sur un devoir.
  checkTaskName(taskName: string): boolean {
  const allowedTasks = ['enseignant', 'etablissement', 'eleve'];
  return allowedTasks.includes(taskName);
}
  hasValidUrl(attachment: any): boolean {
  return attachment?.url !== null && attachment?.url !== undefined && attachment?.url !== '';
}

public selectedFile: File | null = null; // Variable pour stocker le fichier

public onFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  // Liste des extensions autorisées (en minuscules)
  const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'];
  
  // 1. Récupération de l'extension du fichier
  const fileExtension = this.getFileExtension(file.name);
  console.log('Extension du fichier :', fileExtension);

  // 2. Vérification du type MIME et de l'extension
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ];

  // 3. Validation
  if (!allowedExtensions.includes(fileExtension.toLowerCase()) || 
      !allowedMimeTypes.includes(file.type)) {
    console.error('Type de fichier non autorisé. Formats acceptés :', allowedExtensions.join(', '));
    return;
  }

  // 4. Stockage du fichier
  this.selectedFile = file;
  this.entity.attachment = file;
  console.log('Fichier valide prêt pour upload:', file.name, '- Type:', file.type);
}

// Méthode pour extraire l'extension du fichier
private getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}
   
  openModal(mode: string, entity?: any): void {
      this.mode = mode;
      this.isSubmited = false;
      if (mode === 'edit' && entity) {
        this.entity = { ...entity}
      } else {
        this.entity = { };
      }
      const modalElement = document.getElementById('add-edit-modal');
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.show();
    }

    openDeleteModal(entity: any){
        this.entity = { ...entity}
        const modalElement = document.getElementById('delete-modal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.show();
      }
    
      closeDeleteModal(){
        const modalElement = document.getElementById('delete-modal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();
        this.entity = {};
      }
    
      closeAddEditModal() {
        const modalElement = document.getElementById('add-edit-modal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();
        this.entity = {};
      }
      
      async save(): Promise<void> {
        this.isSubmited = true;
        if(!this.entity.title?.trim() || !this.entity.title.trim()){
          this.alertService.showError("Veuilez remplir tous les champs");
          this.isSubmited = false;
          return;
        }
          
        console.log(this.entity, this.mode);
        const data : any =  {
          //title: this.entity.title,
          homeWorkDate: this.entity.homeWorkDate,
          submissionDate: this.entity.submissionDate,
          //attachment: this.entity.attachment,
          content: this.entity.content,
        };

    try 
    {
      if (this.mode === 'create') {
        const homeWork = await globalPost({
          T:'HomeWork', 
          dataObject: { 
            ...data,
           // isClosed : false,
            teacher: { 
              className: "Person", 
              objectId: this.teacherId
            },
            classroom: { 
              className: "Classroom", 
              objectId: this.classroomId
            }
          }
        });
        console.log(homeWork);
      } else {
        console.log('idHomework : ', this.entity.objectId);
        if(!this.entity.objectId) {
          this.alertService.showError("Aucun Id spécifié");
          this.isSubmited = false;
          return;
        }
        const homeWork = await globalPut({
          T:'HomeWork', 
          dataObject: data, 
          objectId: this.entity.objectId
        });
      }
      this.alertService.showSuccess();
      this.ngOnInit();
      this.closeAddEditModal();
      this.isSubmited = false;
    }
     catch (error: unknown) {
      this.isSubmited = false;
      if (error instanceof Error) {
        this.alertService.showError(error.message);
      } else {
        this.alertService.showError("Une erreur inconnue est survenue pendant l'opération");
      }          
    }
  }

  async delete(){
    this.isSubmited = true;
    if(this.entity && this.entity.objectId){
      const homeWork = await globalDelete({
        T: 'HomeWork', 
        objectId: this.entity.objectId
      });
      console.log(homeWork);
      this.alertService.showSuccess();
      this.isSubmited = false;
      this.ngOnInit();
      this.closeDeleteModal();
    }else{
      this.alertService.showError("Aucune classe sélectionnée");
      this.isSubmited = false;
      return;
    }
  }
}