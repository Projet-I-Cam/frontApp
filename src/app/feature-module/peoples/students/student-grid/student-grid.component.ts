import { Component, OnInit, Renderer2 } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { StudentService } from '../../../../services/student.service';
import { finalize } from 'rxjs/operators';
import { CustomPaginationModule } from '../../../../shared/custom-pagination/custom-pagination.module';

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

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
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
