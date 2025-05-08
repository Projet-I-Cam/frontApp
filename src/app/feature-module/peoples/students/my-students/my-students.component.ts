import { Component, OnInit, Renderer2 } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { DataService } from '../../../../shared/data/data.service';
import { UtilsService } from '../../../../services/utilis.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { AlertService } from '../../../../services/alertService';
import { apiResultFormat } from '../../../../shared/model/pages.model';
import { StudentService } from '../../../../services/student.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-my-students',
  standalone: false,
  templateUrl: './my-students.component.html',
  styleUrl: './my-students.component.scss'
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


  values = [
    {'label': 'Actif', value: true},
    {'label': 'Inactif', value: false}
  ];

   constructor(
     private data: DataService,
     private utils: UtilsService,
     private authService: AuthService,
     private router: Router,
     private pagination: PaginationService,
     private alertService: AlertService,
     private renderer: Renderer2,
     private studentService: StudentService
   ) {}
 
   ngOnInit(): void {
     this.load=true;
     this.loadStudents();
   }

  loadStudents(): void {
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
    console.log('Fetching student details for ID:', id);
    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        console.log('Student details received:', student);
        this.selectedStudent = student;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching student details:', err);
        this.isLoading = false;
        alert('Erreur lors du chargement des détails de l\'étudiant.');
      }
    });
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
    // Vous pouvez ici implémenter une logique pour charger uniquement les données 
    // de la page actuelle si vous avez beaucoup d'étudiants
  }
}

