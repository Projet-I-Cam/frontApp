import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { InstitutionService } from '../../../../services/institution.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-add-institution',
    templateUrl: './add-institution.component.html',
    styleUrls: ['./add-institution.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class AddInstitutionComponent implements OnInit {
  public routes = routes;
  public institutionForm: FormGroup;
  public submitting = false;
  public loading = false;
  public errorMessage: string | null = null;
  public isEditMode = false;
  public editId: string | null = null;
  public pageTitle = 'Add Institution';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private institutionService: InstitutionService
  ) {
    this.institutionForm = this.fb.group({
      name: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      motto: [''],
      description: [''],
      poBox: [''],
      emails: ['', [Validators.email]],
      phones: [''],
      isActive: [true],
      owners: this.fb.array([]),
      // campus: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Vérifier si nous sommes en mode édition
    this.route.queryParams.subscribe(params => {
      if (params['edit'] === 'true' && params['id']) {
        this.isEditMode = true;
        this.editId = params['id'];
        this.pageTitle = 'Edit Institution';
        this.loadInstitutionData(params['id']);
      } else {
        // Alternative: vérifier le localStorage
        const storedId = localStorage.getItem('editInstitutionId');
        if (storedId) {
          this.isEditMode = true;
          this.editId = storedId;
          this.pageTitle = 'Edit Institution';
          this.loadInstitutionData(storedId);
          // Nettoyer après usage
          localStorage.removeItem('editInstitutionId');
        }
      }
    });
    // this.addCampus();
    this.addOwner();
  }

  get campus(): FormArray {
    return this.institutionForm.get('campus') as FormArray;
  }
  
  get owners(): FormArray {
    return this.institutionForm.get('owners') as FormArray;
  }

  addCampus(): void {
    const campusGroup = this.fb.group({
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      address: ['', Validators.required],
      municipality: ['', Validators.required],
      classes: ['', Validators.required],
      educationOfferings: ['', Validators.required],
    });
    this.campus.push(campusGroup);
  }
  addOwner(): void {
    const onwnerGroup = this.fb.group({
      // emails: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phones: ['', Validators.required],
    });
    this.owners.push(onwnerGroup);
  }

  removeOwner(index: number): void {
    this.owners.removeAt(index);
  }

  removeCampus(index: number): void {
    this.owners.removeAt(index);
  }

  loadInstitutionData(id: string): void {
    if (!id) {
      console.error('No institution ID provided for editing');
      this.errorMessage = 'Erreur: Impossible de charger les données de l\'institution. Identifiant manquant.';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.institutionService.getInstitutionById(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (institution) => {
          console.log('Institution data loaded:', institution);
          
          // Préparer les emails et téléphones pour le formulaire
          let emailForForm = '';
          if (institution.emails && institution.emails.length > 0) {
            emailForForm = institution.emails[0];
          }
          
          let phoneForForm = '';
          if (institution.phones && institution.phones.length > 0) {
            phoneForForm = institution.phones[0];
          }

          // Remplir le formulaire avec les données existantes
          this.institutionForm.patchValue({
            name: institution.name || '',
            registrationNumber: institution.registrationNumber || '',
            motto: institution.motto || '',
            description: institution.description || '',
            poBox: institution.poBox || '',
            emails: emailForForm,
            phones: phoneForForm,
            isActive: institution.isActive,
            owners: institution?.owners || []
          });
          
          // Vérifier que le formulaire a été correctement rempli
          console.log('Form values after patch:', this.institutionForm.value);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des données de l\'institution:', error);
          this.errorMessage = 'Impossible de charger les données de l\'institution.';
        }
      });
  }

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    if (this.institutionForm.valid) {
      this.submitting = true;
      this.errorMessage = null;

      // Préparer les données pour l'API
      const formData = { ...this.institutionForm.value };
      
      // Transformer les champs email et phone en tableaux
      if (formData.emails && typeof formData.emails === 'string' && formData.emails.trim() !== '') {
        formData.emails = [formData.emails.trim()];
      } else if (!formData.emails || formData.emails === '') {
        formData.emails = [];
      }
      
      if (formData.phones && typeof formData.phones === 'string' && formData.phones.trim() !== '') {
        formData.phones = [formData.phones.trim()];
      } else if (!formData.phones || formData.phones === '') {
        formData.phones = [];
      }

      console.log('Form data prepared for API:', formData);
      console.log('Is edit mode:', this.isEditMode, 'Edit ID:', this.editId);
     
      if (this.isEditMode && this.editId) {
        // Appeler le service pour mettre à jour l'institution
        console.log('Updating institution with ID:', this.editId);
        this.institutionService.updateInstitution(this.editId, formData)
          .pipe(finalize(() => this.submitting = false))
          .subscribe({
            next: (response) => {
              console.log('Institution mise à jour avec succès:', response);
              // Rediriger vers la liste des institutions
              this.router.navigate(['/peoples/institutions/institutions-list']);
            },
            error: (error) => {
              console.error('Erreur lors de la mise à jour de l\'institution:', error);
              this.errorMessage = 'Une erreur est survenue lors de la mise à jour de l\'institution. Veuillez réessayer.';
            }
          });
      } else {
        // Appeler le service pour créer l'institution
        this.institutionService.createInstitution(formData)
          .pipe(finalize(() => this.submitting = false))
          .subscribe({
            next: (response) => {
              console.log('Institution créée avec succès:', response);
              // Rediriger vers la liste des institutions
              this.router.navigate(['/peoples/institutions/institutions-list']);
            },
            error: (error) => {
              console.error('Erreur lors de la création de l\'institution:', error);
              this.errorMessage = 'Une erreur est survenue lors de la création de l\'institution. Veuillez réessayer.';
            }
          });
      }
    } else {
      this.markFormGroupTouched(this.institutionForm);
      this.errorMessage = 'Veuillez remplir correctement tous les champs obligatoires.';
    }
  }

  // Méthode pour annuler et retourner à la liste
  cancel(): void {
    this.router.navigate(['/peoples/institutions/institutions-list']);
  }

  // Méthode utilitaire pour marquer tous les champs comme touchés
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }else if (control instanceof FormArray) {
        control.controls.forEach((ctrl) => {
          ctrl.markAsTouched(); // Marquer chaque contrôle dans le FormArray comme touché
          if (ctrl instanceof FormGroup) {
            this.markFormGroupTouched(ctrl); // Appel récursif pour les FormGroup dans le FormArray
          }
        });
      }
    });
  }
} 