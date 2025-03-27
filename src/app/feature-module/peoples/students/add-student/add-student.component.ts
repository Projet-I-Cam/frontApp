import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { routes } from '../../../../shared/routes/routes';
import { studentComplete, DisciplinaryRecord, ParentGuardianInfo } from '../../../../shared/model/pages.model';

interface data {
  name: string | undefined;
  code: string | undefined;
}

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrl: './add-student.component.scss',
    standalone: false
})
export class AddStudentComponent implements OnInit {
  public routes = routes;
  values: string[] = ['English', 'Spanish'];
  studentForm: FormGroup;
  formData: { selectedClass: data | undefined }[] = [];
  values2: string[] = ['Allergy', 'Skin Allergy'];
  values3: string[] = ['Medecine Name'];
  bloodGroups: string[] = ['O +ve', 'O -ve', 'A +ve', 'A -ve', 'B +ve', 'B -ve', 'AB +ve', 'AB -ve'];
  
  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      academicYear: ['', [Validators.required]],
      admissionNumber: ['', [Validators.required]],
      admissionDate: ['', [Validators.required]],
      rollNumber: ['', [Validators.required]],
      status: ['Active', [Validators.required]],
      class: ['', [Validators.required]],
      section: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      bloodGroup: [''],
      house: [''],
      religion: [''],
      category: [''],
      language: [''],
      nationality: [''],
      address: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: [''],
      phoneNumber: [''],
      email: ['', [Validators.email]],
      
      // Informations académiques
      previousSchool: [''],
      previousSchoolAddress: [''],
      transferCertificateNumber: [''],
      transferDate: [''],
      
      // Informations médicales
      medicalConditions: [''],
      allergies: this.fb.array([]),
      medications: this.fb.array([]),
      emergencyContactName: [''],
      emergencyContactPhone: [''],
      emergencyContactRelation: [''],
      
      // Parents/Tuteurs
      parentGuardianInfo: this.fb.array([this.createParentGroup()])
    });
  }

  ngOnInit(): void {
    // Générer un numéro d'admission auto-incrémenté avec préfixe
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const randomID = Math.floor(1000 + Math.random() * 9000);
    this.studentForm.get('admissionNumber')?.setValue(`ADM-${year}-${randomID}`);
  }

  createParentGroup(): FormGroup {
    return this.fb.group({
      relation: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      occupation: [''],
      education: [''],
      email: ['', [Validators.email]],
      phoneNumber: [''],
      address: ['']
    });
  }

  get allergiesArray(): FormArray {
    return this.studentForm.get('allergies') as FormArray;
  }

  get medicationsArray(): FormArray {
    return this.studentForm.get('medications') as FormArray;
  }

  get parentGuardianArray(): FormArray {
    return this.studentForm.get('parentGuardianInfo') as FormArray;
  }

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
    this.parentGuardianArray.push(this.createParentGroup());
  }

  removeParentGuardian(index: number): void {
    if (this.parentGuardianArray.length > 1) {
      this.parentGuardianArray.removeAt(index);
    }
  }

  generateStudentID(): string {
    // Format: ST-YEAR-RANDOM4DIGIT-HASH
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const randomID = Math.floor(1000 + Math.random() * 9000);
    const hash = Math.random().toString(36).substr(2, 5).toUpperCase();
    
    return `ST-${year}-${randomID}-${hash}`;
  }

  public onSubmit() {
    if (this.studentForm.valid) {
      // Créer un objet student avec les données du formulaire
      const studentData: studentComplete = {
        ...this.studentForm.value,
        isSelected: false,
        studentIdNumber: this.generateStudentID(),
        img: 'assets/img/students/student-01.jpg', // Image par défaut
      };

      // Ici, vous enverriez normalement les données au service pour les sauvegarder
      console.log('Données de l\'Élève à enregistrer :', studentData);
      
      // Rediriger vers la liste des Élèves
      this.router.navigate([routes.studentsList]);
    } else {
      // Marquer tous les champs comme touchés pour afficher les validations
      Object.keys(this.studentForm.controls).forEach(key => {
        const control = this.studentForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  addNewRow() {
    this.formData.push({ selectedClass: {name: undefined, code:undefined}});
  }
  
  removeRow(index: number) {
    this.formData.splice(index, 1);
  }
}
