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
import { Class, Person, Student } from '../../../../shared/model/student.model';
import { routes } from '../../../../shared/routes/routes';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrl: './add-student.component.scss',
    imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule]
})
export class AddStudentComponent implements OnInit {
  public routes = routes;
  values: string[] = ['English', 'Spanish'];
  studentForm: FormGroup;
  formData: any[] = [];
  values2: string[] = ['Allergy', 'Skin Allergy'];
  values3: string[] = ['Medecine Name'];
  bloodGroups: string[] = ['O +ve', 'O -ve', 'A +ve', 'A -ve', 'B +ve', 'B -ve', 'AB +ve', 'AB -ve'];
  
  // Add new properties
  classes: Class[] = [];
  sections: any = [];
  sexes: any = [];
  parents: any = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ];
  filteredPerson: any[] = [];
  loading = false;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private studentService: StudentService,
    private personService: PersonService,
    private classService: ClassService
  ) {
    UtilsService.getSection().then(sections => {
      this.sections = sections?.map((sec: any) => {
        return {
          label: sec?.get('name_fr'),
          value: sec?._getId()
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
    this.studentForm = this.fb.group({
      // Person information
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      section: ['', [Validators.required]],
      academicYear: [''],
      admissionDate: [''],
      classroom: [''],
      placeOfBirth: [''],
      photo: [null],
      email: [''],
      phoneNumber: ['', [Validators.required]],
      address: [''],
      status: ['Active', [Validators.required]],
      
      // Student information
      // registrationNumber: ['', [Validators.required]],
      // joinDate: ['', [Validators.required]],
      // classId: ['', [Validators.required]],
      
      // Additional information
      bloodGroup: [''],
      religion: [''],
      nationality: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: [''],
      
      // Academic information
      previousSchool: [''],
      previousSchoolAddress: [''],
      transferCertificateNumber: [''],
      transferDate: [''],
      
      // Medical information
      medicalConditions: [''],
      allergies: this.fb.array([]),
      medications: this.fb.array([]),
      emergencyContactName: [''],
      emergencyContactPhone: [''],
      emergencyContactRelation: [''],
      
      // Parent/Guardian information
      // parentGuardianInfo: ['']
      parentGuardianInfo: this.fb.array([this.createParentGroup()])
    });
  }

  async searchParent(event: any) {
    const query = event.filter;
    if (query?.length < 2) {
      this.filteredPerson = [];
      return;
    }
    this.loading = true;
    console.log('query query ', query)
    const resp = await this.personService.searchParentByKeyword(query.toLowerCase())
    console.log('RESP ', resp)
    this.filteredPerson = resp
    this.loading = false;
  }

  ngOnInit(): void {
    // Generate a registration number
    this.generateRegistrationNumber();
    
    // Load active classes
    this.loadClasses();
  }
  
  loadClasses(): void {
    this.isLoading = true;
    this.classService.getActiveClasses()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (classes) => {
          this.classes = classes; 
        },
        (error) => {
          console.error('Error loading classes:', error);
          this.errorMessage = 'Failed to load classes. Please try again.';
        }
      );
  }

  generateRegistrationNumber(): void {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const randomID = Math.floor(1000 + Math.random() * 9000);
    this.studentForm.get('registrationNumber')?.setValue(`ST-${year}-${randomID}`);
  }

  createParentGroup(): FormGroup {
    const form = this.fb.group({
      // relation: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      // occupation: [''],
      // education: [''],
      email: [''],
      fatherObjectId: [''],
      LinkExistedParent: [false],
      phoneNumber: ['', [Validators.required]],
      address: [''],
      createUserAccount: ['']
    });

    form.get('LinkExistedParent')?.valueChanges.subscribe(linked => {
      const firstName = form.get('firstName');
      const lastName = form.get('lastName');
      const gender = form.get('gender');
      const phoneNumber = form.get('phoneNumber');
      const fatherObjectId = form.get('fatherObjectId');

      // fullName is required only if NOT a company
      if (!linked) {
        firstName?.setValidators([Validators.required]);
        lastName?.setValidators([Validators.required]);
        phoneNumber?.setValidators([Validators.required]);
        gender?.setValidators([Validators.required]);
        fatherObjectId?.clearValidators();
      } else {
        fatherObjectId?.setValidators([Validators.required]);
        firstName?.clearValidators();
        lastName?.clearValidators();
        phoneNumber?.clearValidators();
        gender?.clearValidators();
      }
      fatherObjectId?.updateValueAndValidity();
      firstName?.updateValueAndValidity();
      lastName?.updateValueAndValidity();
      phoneNumber?.updateValueAndValidity();
      gender?.updateValueAndValidity();
    });

    return form
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
    if (this.parentGuardianArray.length < 2) {
      this.parentGuardianArray.push(this.createParentGroup());
    }
  }

  removeParentGuardian(index: number): void {
    if (this.parentGuardianArray.length > 1) {
      this.parentGuardianArray.removeAt(index);
    }
  }

  public onFileSelect(event: any) {
    console.log('Changed')
    const file: File = event.target.files[0];
    if (file) {
      this.studentForm.patchValue({
        photo: file
      });
    }
  }

  public async onSubmit() {
     console.log('Submited', this.studentForm.valid, this.studentForm.value)
    if (this.studentForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      
      // Extract form values
      const formValues = this.studentForm.value;
      
      const parentGuardianInfo = formValues?.parentGuardianInfo
      const parents = await this.personService.createSimpleParent(parentGuardianInfo)
      console.log(' parents parents ', parents)
      // Create person data
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
        parents: parents,
        registrationNumber: UtilsService.getStudentMatricule(),
        // registrationNumber: UtilsService.getStudentMatricule(),
        classroom: formValues.classroom,
        roleId: null
      };
      
      // First create the person
      this.personService.createPerson(personData)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe(
          (person) => {
            console.log('Person created here ', person)
            this.router.navigate([routes.studentsList]);
            // Now create the student with the person reference
            // const studentData: any = {
            //   registrationNumber: formValues.registrationNumber,
            //   status: formValues.status,
            //   joinDate: formValues.joinDate,
            //   additionalInfo: JSON.stringify({
            //     bloodGroup: formValues.bloodGroup,
            //     religion: formValues.religion,
            //     nationality: formValues.nationality,
            //     academicInfo: {
            //       previousSchool: formValues.previousSchool,
            //       previousSchoolAddress: formValues.previousSchoolAddress,
            //       transferCertificateNumber: formValues.transferCertificateNumber,
            //       transferDate: formValues.transferDate
            //     },
            //     medicalInfo: {
            //       medicalConditions: formValues.medicalConditions,
            //       allergies: formValues.allergies,
            //       medications: formValues.medications,
            //       emergencyContact: {
            //         name: formValues.emergencyContactName,
            //         phone: formValues.emergencyContactPhone,
            //         relation: formValues.emergencyContactRelation
            //       }
            //     },
            //     parentGuardianInfo: formValues.parentGuardianInfo
            //   }),
            //   person: {
            //     objectId: person.id
            //   }
            // };
            
            // // Add class reference if selected
            // if (formValues.classId) {
            //   studentData.class = {
            //     objectId: formValues.classId
            //   };
            // }
            
            // Create the sother specific data to student here
            // this.studentService.createStudent(studentData)
            //   .subscribe(
            //     (student) => {
            //       console.log('Student created successfully:', student);
            //       this.router.navigate([routes.studentsList]);
            //     },
            //     (error) => {
            //       console.error('Error creating student:', error);
            //       this.errorMessage = 'Failed to create student. Please try again.';
            //     }
            //   );
          },
          (error) => {
            console.error('Error creating person:', error);
            this.errorMessage = 'Failed to create person. Please try again.';
          }
        );
    } else {
      this.markFormGroupTouched(this.studentForm);
    }
  }

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

  // Helper method to get a class by ID
  getClassById(classId: string): Class | undefined {
    return this.classes.find(c => c.id === classId);
  }
}
