import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Parse from 'parse';
import { finalize } from 'rxjs/operators';
import { ClassService } from '../../../../services/class.service';
import { PersonService } from '../../../../services/person.service';
import { StudentService } from '../../../../services/student.service';
import { UtilsService } from '../../../../services/utilis.service';
import { Class, Person, Student, AcademicYear } from '../../../../shared/model/student.model';
import { routes } from '../../../../shared/routes/routes';
import { SharedModule } from '../../../../shared/shared.module';
import { FilterStudent, getCurrentAcademicYear, listInscriptions } from '../../../../services/statefull/genericParse';
import { globalGet } from '../../../../services/statefull/http'; 
import { LoginService } from '../../../../auth/services/login.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Institution } from '../../../../shared/model/institution.model';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
  standalone: false,
})
export class AddStudentComponent implements OnInit {
  public routes = routes;
  studentForm!: FormGroup;
  classes: any[] = [];
  sections: any = [];
  sexes: any = [];
  classRooms: any = [];
  filteredPerson: any[] = [];
  loading = false;
  isLoading = false;
  isSubmitting = false;
  errorMessage: any;;
  academicYear: any;
  bloodGroups: string[] = ['O +ve', 'O -ve', 'A +ve', 'A -ve', 'B +ve', 'B -ve', 'AB +ve', 'AB -ve'];
  currentPerson: any;
  parents: any[] = [];
  isInitializing = true; // Tracks overall initialization status
 loadingSections = true;
 loadingGenders = true;
 loadingPerson = true;

constructor(
  private router: Router,
  private fb: FormBuilder,
  private studentService: StudentService,
  private personService: PersonService,
  private classService: ClassService,
  private loginService: LoginService,
) {
  // Load sections
  UtilsService.getSection().then(sections => {
    this.sections = sections?.map((sec: any) => ({
      label: sec?.get('name_fr'),
      value: sec?._getId()
    })) || [];
    this.loadingSections = false;
    this.checkInitializationComplete();
  }).catch(() => {
    this.loadingSections = false;
    this.checkInitializationComplete();
  });

  // Load genders
  UtilsService.getGender().then(sexes => {
    this.sexes = sexes?.map((sex: any) => ({
      label: sex?.get('libelle_fr'),
      value: sex?._getId()
    })) || [];
    this.loadingGenders = false;
    this.checkInitializationComplete();
  }).catch(() => {
    this.loadingGenders = false;
    this.checkInitializationComplete();
  });

  // Load current person
  this.loginService.getPerson().then(person => {
    this.currentPerson = person;
    console.log('currentInstitution', this.currentPerson?.institution.objectId);
    this.loadingPerson = false;
    this.checkInitializationComplete();
  }).catch(() => {
    this.loadingPerson = false;
    this.checkInitializationComplete();
  });
}

// Helper method to check if all data is loaded
private checkInitializationComplete() {
  this.isInitializing = this.loadingSections || this.loadingGenders || this.loadingPerson;
}

  async ngOnInit() {
    this.initializeForm();
    this.academicYear = await getCurrentAcademicYear();
    console.log('this.academicYear  ', this.academicYear )
    this.studentForm.get('academicYear')?.patchValue(this.academicYear?.objectId || '');
    this.generateRegistrationNumber();
    this.setupFormListeners();
  }

  initializeForm() {
    this.studentForm = this.fb.group({
      academicYear: [{ value: '', disabled: true }, [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      section: ['', [Validators.required]],
      admissionDate: [''],
      classroom: [''],
      class: [''],
      placeOfBirth: ['',[Validators.required]],
      photo: [null],
      email: [''],
      phoneNumber: ['', [Validators.required]],
      address: [''],
      status: ['Active', [Validators.required]],
      bloodGroup: [''],
      religion: [''],
      nationality: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: [''],
      previousSchool: [''],
      previousSchoolAddress: [''],
      transferCertificateNumber: [''],
      transferDate: [''],
      medicalConditions: [''],
      allergies: this.fb.array([]),
      medications: this.fb.array([]),
      emergencyContactName: [''],
      emergencyContactPhone: [''],
      emergencyContactRelation: [''],
      parentGuardianInfo: this.fb.array([this.createParentGroup()]),
      registrationNumber: ['']
    });
  }

  async getClasses() {
    // const sectionId = this.studentForm.get('section')?.value;
    // if (!sectionId) return;

    try {
      const res: any = await globalGet({
        T: 'Classe',
        filters: {
          // instition: { className: 'Section', objectId: sectionId }
          // institution: {
          //   objectId: institution?.objectId,
          //   className: "Institution"
          // }
        }
      });
      this.classes = res || [];
      console.log('Classes loaded:', this.classes);
    } catch (error) {
      console.error('Error loading classes:', error);
      this.classes = [];
    }
  }

  async getClassRooms() {
    const classId = this.studentForm.get('class')?.value;
    const institutionId = this.currentPerson?.institution?.objectId;

    // if (!classId || !institutionId) return;

    try {
      const res: any = await globalGet({
        T: 'Classroom',
        filters: {
          classe: { className: 'Classe', objectId: classId },
          institution: {
            objectId: institutionId,
            className: "Institution"
          }
          // institution: { className: 'Institution', objectId: institutionId }
        },
        selects: ['objectId', 'name_fr', 'name_en']
      });
      this.classRooms = res || [];
      console.log('Classrooms loaded:', this.classRooms);
    } catch (error) {
      console.error('Error loading classrooms:', error);
      this.classRooms = [];
    }
  }

  setupFormListeners() {
    this.getClasses();
    // With 300ms debounce to prevent rapid changes
    this.studentForm.get('section')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(sectionId => {
      if (sectionId) {
        this.getClasses();
      } else {
        this.classes = [];
        this.studentForm.get('class')?.reset();
      }
    });

    this.studentForm.get('class')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(classId => {
      if (classId) {
        this.getClassRooms();
      } else {
        this.classRooms = [];
      }
    });
  }
  generateRegistrationNumber(): void {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const randomID = Math.floor(1000 + Math.random() * 9000);
    this.studentForm.patchValue({
      registrationNumber: `ST-${year}-${randomID}`
    });
  }

  createParentGroup(): FormGroup {
    const form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: [''],
      fatherObjectId: [''],
      LinkExistedParent: [false],
      phoneNumber: ['', [Validators.required]],
      address: [''],
      createUserAccount: ['']
    });

    form.get('LinkExistedParent')?.valueChanges.subscribe(linked => {
      const controls = ['firstName', 'lastName', 'phoneNumber', 'gender'];
      controls.forEach(control => {
        const ctrl = form.get(control);
        linked ? ctrl?.clearValidators() : ctrl?.setValidators([Validators.required]);
        ctrl?.updateValueAndValidity();
      });
      form.get('fatherObjectId')?.[linked ? 'setValidators' : 'clearValidators']([Validators.required]);
      form.get('fatherObjectId')?.updateValueAndValidity();
    });

    return form;
  }

  // Form array getters
  get allergiesArray(): FormArray {
    return this.studentForm.get('allergies') as FormArray;
  }

  get medicationsArray(): FormArray {
    return this.studentForm.get('medications') as FormArray;
  }

  get parentGuardianArray(): FormArray {
    return this.studentForm.get('parentGuardianInfo') as FormArray;
  }

  // Array manipulation methods
  addAllergy(): void {
    this.allergiesArray.push(this.fb.control(''));
  }

  removeAllergy(index: number): void {
    this.allergiesArray.removeAt(index);
  }

  addMedication(): void {
    this.medicationsArray.push(this.fb.control(''));
  }

  removeMedication(index: number): void {
    this.medicationsArray.removeAt(index);
  }

  addParentGuardian(): void {
    if (this.parentGuardianArray.length < 2) {
      this.parentGuardianArray.push(this.createParentGroup());
    }
  }

  removeParentGuardian(index: number): void {
    if (this.parentGuardianArray.length > 1) {
      this.parentGuardianArray.removeAt(index);
    }
  }

  public onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.studentForm.patchValue({
        photo: input.files[0]
      });
    }
  }

  async searchParent(event: any): Promise<void> {
    const query = event?.filter || '';
    if (query.length < 2) {
      this.filteredPerson = [];
      return;
    }
    this.loading = true;
    try {
      const resp = await this.personService.searchParentByKeyword(query.toLowerCase(), true);
      this.filteredPerson = resp || [];
    } catch (error) {
      console.error('Error searching parents:', error);
      this.filteredPerson = [];
    } finally {
      this.loading = false;
    }
  }

 public async onSubmit(): Promise<void> {
  this.markFormGroupTouched(this.studentForm);

  if (this.studentForm.invalid || this.isSubmitting) {
    return;
  }

  this.isSubmitting = true;
  this.errorMessage = '';

  try {
    const formValues = this.studentForm.getRawValue();

    // Create parents first
    if(!this.parents ){
        try {
      this.parents = await this.personService.createSimpleParent(formValues.parentGuardianInfo);
    } catch (parentError) {
      this.errorMessage = parentError;
      console.error('Error creating parents:', parentError);
      this.loading = false;
      this.errorMessage = 'Erreur lors de la création des parents. Veuillez vérifier les informations.';
      return;
    }

    }

    const personData: Partial<Person> = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      gender: formValues.gender,
      dateOfBirth: formValues.dateOfBirth,
      placeOfBirth: formValues.placeOfBirth,
      email: formValues.email,
      phone: formValues.phoneNumber,
      section: formValues.section,
      address: formValues.address,
      photo: formValues.photo,
      isStudent: true,
      parents: this.parents,
      registrationNumber: UtilsService.getStudentMatricule(),
      classroom: formValues.classroom,
      roleId: null,
      academicYear: this.academicYear?.objectId,//formValues.academicYear,
      class: formValues.class,
      admissionDate: formValues.admissionDate,
      status: formValues.status,
      institution: this.currentPerson?.institution?.objectId,
    };

    this.personService.createPerson(personData).subscribe({
      next: () => {
        this.router.navigate([routes.studentsList]);
      },
      error: (error) => {
        console.error('Error creating person:', error);
        this.errorMessage = error
        this.isSubmitting = false;

        // More specific error messages based on error type
        // if (error.code === 202) { // Username already taken
        //   this.errorMessage = 'Cette adresse email ou numéro de téléphone est déjà utilisée.';
        // } else if (error.code === 203) { // Email already taken
        //   this.errorMessage = 'Cette adresse email est déjà utilisée.';
        // } else if (error.code === 125) { // Invalid email
        //   this.errorMessage = 'Adresse email invalide.';
        // } else {
        //   this.errorMessage = 'Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.';
        // }
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    this.errorMessage = 'Une erreur inattendue est survenue. Veuillez contacter l\'administrateur.';
    this.isSubmitting = false;
  }
}

  private markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getClassById(classId: string): Class | undefined {
    return this.classes.find(c => c.id === classId);
  }
}
