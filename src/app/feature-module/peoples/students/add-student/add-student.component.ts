import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { routes } from '../../../../shared/routes/routes';
import { StudentService } from '../../../../services/student.service';
import { PersonService } from '../../../../services/person.service';
import { ClassService } from '../../../../services/class.service';
import { Student, Person, Class } from '../../../../shared/model/student.model';
import { finalize } from 'rxjs/operators';

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
  formData: any[] = [];
  values2: string[] = ['Allergy', 'Skin Allergy'];
  values3: string[] = ['Medecine Name'];
  bloodGroups: string[] = ['O +ve', 'O -ve', 'A +ve', 'A -ve', 'B +ve', 'B -ve', 'AB +ve', 'AB -ve'];
  
  // Add new properties
  classes: Class[] = [];
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
    this.studentForm = this.fb.group({
      // Person information
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      placeOfBirth: [''],
      email: ['', [Validators.email]],
      phoneNumber: [''],
      address: [''],
      
      // Student information
      registrationNumber: ['', [Validators.required]],
      joinDate: ['', [Validators.required]],
      status: ['Active', [Validators.required]],
      classId: ['', [Validators.required]],
      
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
      parentGuardianInfo: this.fb.array([this.createParentGroup()])
    });
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

  public onSubmit() {
    if (this.studentForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      
      // Extract form values
      const formValues = this.studentForm.value;
      
      // Create person data
      const personData: Partial<Person> = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        gender: formValues.gender,
        dateOfBirth: formValues.dateOfBirth,
        placeOfBirth: formValues.placeOfBirth,
        email: formValues.email,
        phone: formValues.phoneNumber,
        address: formValues.address
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
            // Now create the student with the person reference
            const studentData: any = {
              registrationNumber: formValues.registrationNumber,
              status: formValues.status,
              joinDate: formValues.joinDate,
              additionalInfo: JSON.stringify({
                bloodGroup: formValues.bloodGroup,
                religion: formValues.religion,
                nationality: formValues.nationality,
                academicInfo: {
                  previousSchool: formValues.previousSchool,
                  previousSchoolAddress: formValues.previousSchoolAddress,
                  transferCertificateNumber: formValues.transferCertificateNumber,
                  transferDate: formValues.transferDate
                },
                medicalInfo: {
                  medicalConditions: formValues.medicalConditions,
                  allergies: formValues.allergies,
                  medications: formValues.medications,
                  emergencyContact: {
                    name: formValues.emergencyContactName,
                    phone: formValues.emergencyContactPhone,
                    relation: formValues.emergencyContactRelation
                  }
                },
                parentGuardianInfo: formValues.parentGuardianInfo
              }),
              person: {
                objectId: person.id
              }
            };
            
            // Add class reference if selected
            if (formValues.classId) {
              studentData.class = {
                objectId: formValues.classId
              };
            }
            
            // Create the student
            this.studentService.createStudent(studentData)
              .subscribe(
                (student) => {
                  console.log('Student created successfully:', student);
                  this.router.navigate([routes.studentsList]);
                },
                (error) => {
                  console.error('Error creating student:', error);
                  this.errorMessage = 'Failed to create student. Please try again.';
                }
              );
          },
          (error) => {
            console.error('Error creating person:', error);
            this.errorMessage = 'Failed to create person. Please try again.';
          }
        );
    } else {
      // Mark all fields as touched to display validations
      Object.keys(this.studentForm.controls).forEach(key => {
        const control = this.studentForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Helper method to get a class by ID
  getClassById(classId: string): Class | undefined {
    return this.classes.find(c => c.id === classId);
  }
}
