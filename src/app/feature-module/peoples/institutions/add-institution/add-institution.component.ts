import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { InstitutionService } from '../../../../services/institution.service';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utilis.service';
import { PersonService } from '../../../../services/person.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
    selector: 'app-add-institution',
    templateUrl: './add-institution.component.html',
    styleUrls: ['./add-institution.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule]
})
export class AddInstitutionComponent implements OnInit {
  public routes = routes;
  public institutionForm: FormGroup;
  public submitting = false;
  public loading = false;
  public loadingDrop = false;
  public errorMessage: string | null = null; 
  public isEditMode = false;
  public editId: string | null = null;
  public pageTitle = 'Add Institution';
  municipalities: any[] = [];
  filteredPerson: any[] = [];
  sexes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService,
    private institutionService: InstitutionService
  ) {
    this.institutionForm = this.fb.group({
      name: ['', [Validators.required]],
      registrationDate: ['', [Validators.required]],
      municipality: ['', [Validators.required]],
      address: [''],
      certificateOppointment: [null],
      emails: ['', [Validators.email]],
      phones: [''],
      isActive: [true],
      owners: this.fb.array([]),
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
    this.addOwner();

    UtilsService.getArrondissement(null).then((arrds: Array<any>) => {
      this.municipalities = arrds?.map((arr: any) => {
        return{
          label: arr.get('name'),
          value: arr._getId(),
        }
      })
    })
    UtilsService.getGender().then(sexes => {
      this.sexes = sexes?.map((sex: any) => {
        return {
          label: sex?.get('libelle_fr'),
          value: sex?._getId()
        }
      })
    })
  }

  
  get owners(): FormArray {
    return this.institutionForm.get('owners') as FormArray;
  }


  addOwner(): void {
    const form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      LinkExistedParent: [false],
      gender: ['', [Validators.required]],
      email: [''],
      address: [''],
      ownerId: [''],
    });

    form.get('LinkExistedParent')?.valueChanges.subscribe(linked => {
      const firstName = form.get('firstName');
      const lastName = form.get('lastName');
      const gender = form.get('gender');
      const phoneNumber = form.get('phoneNumber');
      const ownerId = form.get('ownerId');
      if (!linked) {
        firstName?.setValidators([Validators.required]);
        lastName?.setValidators([Validators.required]);
        phoneNumber?.setValidators([Validators.required]);
        gender?.setValidators([Validators.required]);
        ownerId?.clearValidators();
      } else {
        ownerId?.setValidators([Validators.required]);
        firstName?.clearValidators();
        lastName?.clearValidators();
        phoneNumber?.clearValidators();
        gender?.clearValidators();
      }
      ownerId?.updateValueAndValidity();
      firstName?.updateValueAndValidity();
      lastName?.updateValueAndValidity();
      phoneNumber?.updateValueAndValidity();
      gender?.updateValueAndValidity();
    });

    this.owners.push(form);
  }

  removeOwner(index: number): void {
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
            registrationDate: institution.registrationDate || '',
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

  public onFileSelect(event: any) {
    console.log('Changed')
    const file: File = event.target.files[0];
    if (file) {
      this.institutionForm.patchValue({
        certificateOppointment: file
      });
    }
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

      console.log('Is edit mode:', this.isEditMode, 'Edit ID:', this.editId);
       console.log('Form data prepared for API:', formData);
     
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

  async searchParent(event: any) {
    const query = event.filter;
    if (query?.length < 2) {
      this.filteredPerson = [];
      return;
    }
    this.loadingDrop = true;
    console.log('query query ', query)
    const resp = await this.personService.searchParentByKeyword(query.toLowerCase(), false)
    console.log('RESP ', resp)
    this.filteredPerson = resp
    this.loadingDrop = false;
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