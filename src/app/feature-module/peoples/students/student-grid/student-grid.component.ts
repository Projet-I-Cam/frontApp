import { Component, OnInit, Renderer2 } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentService } from '../../../../services/student.service';
import { finalize } from 'rxjs/operators';
import { CustomPaginationModule } from '../../../../shared/custom-pagination/custom-pagination.module';
import { FilterStudent, getCurrentAcademicYear, listInscriptions } from '../../../../services/statefull/genericParse';
import { AuthService } from '../../../../services/auth.service';
import { LoginService } from '../../../../auth/services/login.service';
import { globalGet } from '../../../../services/statefull/http';

// Définition d'interface pour Bootstrap pour éviter les erreurs TS
declare global {
  interface Window {
    bootstrap: any;
  }
}

@Component({
    selector: 'app-student-grid',
    templateUrl: './student-grid.component.html',
    styleUrls: ['./student-grid.component.scss'],
    imports: [CommonModule, RouterModule, FormsModule, SharedModule, CustomPaginationModule]
})
export class StudentGridComponent implements OnInit {
  public routes = routes;
  public length = 10; // Nombre d'éléments par page
  public totalItems = 0; // Nombre total d'éléments
  public currentPage = 0; // Page actuelle
  public searchDataValue = ''; // Valeur recherchée
  public students: any[] = []; // Liste des étudiants
  public isLoading = false; // Indicateur de chargement
  public error = ''; // Message d'erreur
  public rows = 0; // Variable pour stocker le nombre total de lignes
  public selectedStudent: any = null; // Stocke l'étudiant sélectionné
  private modalInstance: any = null; // Instance du modal
  academicYear : any = {};
  currentUser : any = {};
  currentPerson : any = {};
  classes : any[] = [];
  selectedClasse : any = {};
  sections : any[] = [];
  selectedSection : any = {};
  

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private studentService: StudentService,
    private loginService: LoginService
  ) {}

  async ngOnInit() {
    this.currentUser = this.loginService.getUser();
    this.currentPerson = this.loginService.getPerson();
    this.academicYear = await getCurrentAcademicYear();
    this.loadStudents({yearId : this.academicYear.objectId});
    this.loadFilterData();
  }

  loadStudents3(): void { 
    this.isLoading = true;
    this.error = '';
    
    this.studentService.getAllStudents()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (students) => {
          this.students = students;
          this.totalItems = students.length;
          this.rows = students.length;
        },
        (error) => {
          console.error('Error loading students:', error);
          this.error = 'Failed to load students. Please try again.';
        }
      );
  }

  async loadFilterData(){
    this.classes = await globalGet({T: 'Classe'});
    this.sections = await globalGet({T: 'Section'});
    console.log(this.classes, this.sections);
  }

  async loadStudents2(academicYearId:any){     
    this.isLoading = true;
    switch (this.currentUser .role.task_name) {
      case "super":
      case "administration":
        // Accès aux inscriptions pour toutes les institutions et l'année donnée
        this.students = await listInscriptions({ yearId: academicYearId });
        break;
  
      // Accès aux inscriptions pour linstitution et l'année donnée
      case "etablissement":
        if (this.currentPerson.institution) {
          this.students = await listInscriptions({ yearId: academicYearId, schoolId: this.currentPerson.institution.id });
        } else {
          this.students = [];
        }
      break;
  
      case "regional":
        if (this.currentPerson.region) {
          this.students = await listInscriptions({ yearId: academicYearId, regionId: this.currentPerson.region.id });
        } else {
          this.students = [];
        }
      break;
  
      case "departement":
        if (this.currentPerson.department) {
          this.students = await listInscriptions({ yearId: academicYearId, departId: this.currentPerson.department.id });
        } else {
          this.students = [];
        }
      break;
  
      case "arrondissement":
        if (this.currentPerson.arrondissement) {
          this.students = await listInscriptions({ yearId: academicYearId, arronId: this.currentPerson.arrondissement.id });
        } else {
          this.students = [];
        }
      break;
  
      case "enseignant":
        this.students = await listInscriptions({ yearId: academicYearId, enseignantId: this.currentUser .id });
      break;
  
      default:
        console.error("Rôle non reconnu ou accès non autorisé.");
        this.students = [];
      break;
    }
    
    this.totalItems = this.students?.length || 0;
    this.rows = this.students?.length || 0;
    this.isLoading = false;
    console.log(this.students);
  }

  async loadStudents(f: FilterStudent) {
    this.isLoading = true;
  
    try {
      // Définir les filtres en fonction du rôle
      switch (this.currentUser .role.task_name) {
        case "super":
        case "administration":
          // Accès aux inscriptions pour toutes les institutions et l'année donnée
          break; // Pas besoin de modifier f ici
  
        case "etablissement":
          f.schoolId = this.currentPerson.institution?.id;
          break;
  
        case "regional":
          f.regionId = this.currentPerson?.municipality?.departement?.region?.id;
          break;
  
        case "departement":
          f.departId = this.currentPerson?.municipality?.departement?.id;
          break;
  
        case "arrondissement":
          f.arronId = this.currentPerson?.municipality?.id;
          break;
  
        default:
          console.error("Rôle non reconnu ou accès non autorisé.");
          this.students = [];
          this.isLoading = false;
          return;
      }
  
      // Charger les inscriptions avec les filtres appliqués
      this.students = await listInscriptions(f);
      this.totalItems = this.students?.length || 0;
      this.rows = this.students?.length || 0;
  
    } catch (error) {
      console.error("Erreur lors du chargement des étudiants:", error);
      this.students = [];
    } finally {
      this.isLoading = false;
      console.log(this.students);
    }
  }
  

  // Méthode pour voir les détails d'un étudiant
  viewDetails(id: string): void {
    this.isLoading = true;
    console.log('Fetching student details for ID:', id);
    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        console.log('Student details received:', student);
        this.selectedStudent = student;
        this.isLoading = false;
        
        // Ouvrir le modal
        this.openModal();
      },
      error: (err) => {
        console.error('Error fetching student details:', err);
        this.isLoading = false;
        alert('Erreur lors du chargement des détails de l\'étudiant.');
      }
    });
  }

  // Méthode pour ouvrir le modal
  openModal(): void {
    // Définir une méthode pour vérifier si Bootstrap est disponible
    const isBootstrapAvailable = typeof window.bootstrap !== 'undefined';
    console.log('Bootstrap available:', isBootstrapAvailable);
    
    // Réinitialiser le modal à chaque fois pour éviter les problèmes
    const modalElement = document.querySelector('#view-details') as HTMLElement;
    
    if (!modalElement) {
      console.error('Modal element not found in DOM with querySelector');
      alert('Erreur: Élément modal non trouvé dans le DOM.');
      return;
    }
    
    console.log('Modal element found:', modalElement);
    
    if (isBootstrapAvailable) {
      try {
        // Essayons de repartir de zéro à chaque fois pour éviter les problèmes
        this.modalInstance = null;
        
        // Créer une nouvelle instance
        this.modalInstance = new window.bootstrap.Modal(modalElement);
        console.log('New Modal instance created');
        
        // Montrer le modal
        this.modalInstance.show();
        console.log('Modal show() method called');
        return;
      } catch (error) {
        console.error('Error with Bootstrap modal API:', error);
      }
    } else {
      console.warn('Bootstrap is not defined, trying manual approach');
    }
    
    // Méthode alternative: manipulation directe du DOM
    try {
      console.log('Using DOM manipulation as fallback');
      
      // Ajouter la classe 'show' au modal et afficher
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      modalElement.setAttribute('aria-modal', 'true');
      modalElement.removeAttribute('aria-hidden');
      
      // Ajouter modal-open à body
      document.body.classList.add('modal-open');
      
      // Ajouter un backdrop manuellement
      const backdropExists = document.querySelector('.modal-backdrop');
      if (!backdropExists) {
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
      }
      
      // Ajouter un gestionnaire de clic pour fermer le modal
      const closeButtons = modalElement.querySelectorAll('[data-bs-dismiss="modal"]');
      closeButtons.forEach(button => {
        button.addEventListener('click', () => {
          this.closeModal(modalElement);
        });
      });
      
      console.log('Modal displayed with DOM manipulation');
    } catch (domError) {
      console.error('DOM manipulation failed:', domError);
      alert('Erreur lors de l\'affichage du modal. Vérifiez la console pour plus de détails.');
    }
  }

  // Méthode pour fermer le modal manuellement (utilisée quand bootstrap n'est pas disponible)
  closeModal(modalElement: HTMLElement): void {
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.removeAttribute('aria-modal');
    
    document.body.classList.remove('modal-open');
    
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.parentNode?.removeChild(backdrop);
    }
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

  public deleteStudent(id: string): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id)
        .subscribe(
          () => {
            this.students = this.students.filter(student => student.id !== id);
            this.totalItems = this.students.length;
            this.rows = this.students.length;
          },
          (error) => {
            console.error('Error deleting student:', error);
            alert('Failed to delete student. Please try again.');
          }
        );
    }
  }

  // Pour le modal de suppression
  public deleteData(): void {
    alert('Pour supprimer un élève, veuillez utiliser le bouton de suppression sur sa carte.');
  }

  public changePage(pageIndex: number): void {
    this.currentPage = pageIndex;
    // Vous pouvez ici implémenter une logique pour charger uniquement les données 
    // de la page actuelle si vous avez beaucoup d'étudiants
  }
}
