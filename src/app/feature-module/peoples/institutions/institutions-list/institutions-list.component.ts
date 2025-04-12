import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { InstitutionService } from '../../../../services/institution.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-institutions-list',
  templateUrl: './institutions-list.component.html',
  styleUrls: ['./institutions-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class InstitutionsListComponent implements OnInit, AfterViewInit, OnDestroy {
  public routes = routes;
  // Attributs pour gérer la liste des institutions
  public institutions: any[] = [];
  public loading = true;
  public error: string | null = null;
  public selectedInstitution: any = null;
  private modalInstance: any = null;
  private routerSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private institutionService: InstitutionService
  ) { }

  ngOnInit(): void {
    this.loadInstitutions();
    
    // Souscrire aux événements de navigation pour savoir quand l'utilisateur revient à cette page
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd | any) => {
      // Si l'utilisateur revient vers cette page après avoir édité une institution
      if (event.url.includes('/peoples/institutions/institutions-list')) {
        console.log('Navigation detected back to institution list. Refreshing data.');
        this.loadInstitutions();
      }
    });
  }

  ngAfterViewInit(): void {
    // S'assurer que le modal est initialisé correctement
    const modalElement = document.getElementById('view-details');
    if (modalElement) {
      try {
        this.modalInstance = new bootstrap.Modal(modalElement);
        console.log('Modal initialized successfully on component load');
      } catch (error) {
        console.error('Error initializing modal on component load:', error);
      }
    }
  }

  ngOnDestroy(): void {
    // Nettoyer les abonnements pour éviter les fuites de mémoire
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  loadInstitutions(): void {
    this.loading = true;
    this.institutionService.getAllInstitutions().subscribe({
      next: (data) => {
        console.log('Institutions data loaded:', data.length, 'items');
        this.institutions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching institutions:', err);
        this.error = 'Une erreur est survenue lors du chargement des institutions.';
        this.loading = false;
      }
    });
  }

  // Méthode pour ajouter une nouvelle institution
  addInstitution(): void {
    this.router.navigate(['/peoples/institutions/add-institution']);
  }

  // Méthode pour voir les détails d'une institution
  viewDetails(id: string): void {
    this.loading = true;
    console.log('Fetching institution details for ID:', id);
    this.institutionService.getInstitutionById(id).subscribe({
      next: (institution) => {
        console.log('Institution details received:', institution);
        this.selectedInstitution = institution;
        this.loading = false;
        
        // Ouvrir le modal
        this.openModal();
      },
      error: (err) => {
        console.error('Error fetching institution details:', err);
        this.loading = false;
        alert('Erreur lors du chargement des détails de l\'institution.');
      }
    });
  }

  // Méthode pour ouvrir le modal
  openModal(): void {
    // Définir une méthode pour vérifier si Bootstrap est disponible
    const isBootstrapAvailable = typeof bootstrap !== 'undefined';
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
        this.modalInstance = new bootstrap.Modal(modalElement);
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

  // Méthode pour modifier une institution
  editInstitution(id: string): void {
    this.createEditForm(id);
  }

  // Méthode pour éditer l'institution actuellement sélectionnée dans le modal
  editSelectedInstitution(): void {
    if (this.selectedInstitution && this.selectedInstitution.id) {
      this.createEditForm(this.selectedInstitution.id);
    }
  }

  // Créer un formulaire d'édition pour une institution
  createEditForm(id: string): void {
    // Nous stockerons l'ID dans le localStorage pour l'utiliser dans le composant d'édition
    localStorage.setItem('editInstitutionId', id);
    this.router.navigate(['/peoples/institutions/add-institution'], { queryParams: { edit: true, id: id } });
  }

  // Méthode pour supprimer une institution
  deleteInstitution(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette institution ?')) {
      this.institutionService.deleteInstitution(id).subscribe({
        next: () => {
          // Mettre à jour la liste après la suppression
          this.institutions = this.institutions.filter(institution => institution.id !== id);
        },
        error: (err) => {
          console.error('Error deleting institution:', err);
          alert('Une erreur est survenue lors de la suppression de l\'institution.');
        }
      });
    }
  }
} 