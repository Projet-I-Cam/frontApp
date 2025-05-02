import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { StudentService } from '../../../../services/student.service';
import { PersonService } from '../../../../services/person.service';
import { ClassService } from '../../../../services/class.service';
import { Student, Person, Class } from '../../../../shared/model/student.model';
import { finalize } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-edit-student',
    templateUrl: './edit-student.component.html',
    styleUrl: './edit-student.component.scss',
    standalone: false
})
export class EditStudentComponent implements OnInit {
  public routes = routes;
  studentForm: FormGroup;
  values: string[] = ['English', 'Spanish'];
  values2: string[] = ['Allergy', 'Skin Allergy'];
  values3: string[] = ['Medicine Name'];
  
  // Add new properties
  studentId: string = '';
  student: Student | null = null;
  person: Person | null = null;
  classes: Class[] = [];
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  bloodGroups: string[] = ['O +ve', 'O -ve', 'A +ve', 'A -ve', 'B +ve', 'B -ve', 'AB +ve', 'AB -ve'];
  formData: any[] = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    // Get student ID from route
    this.route.params.subscribe(params => {
      this.studentId = params['id'];
      if (this.studentId) {
        this.loadStudentData();
      }
    });
    
    // Load active classes
    this.loadClasses();
  }
  
  loadStudentData(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.studentService.getStudentById(this.studentId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (student) => {
          this.student = student;
          
          // If student has person data, load it
          if (student.person && student.person.id) {
            this.loadPersonData(student.person.id);
          }
          
          // Populate student form fields
          this.studentForm.patchValue({
            registrationNumber: student.registrationNumber,
            joinDate: student.joinDate,
            status: student.status,
            classId: student.class?.id
          });
          
          // Parse additional info if exists
          if (student.additionalInfo) {
            try {
              const additionalInfo = JSON.parse(student.additionalInfo);
              
              // Populate additional info fields
              this.studentForm.patchValue({
                bloodGroup: additionalInfo.bloodGroup,
                religion: additionalInfo.religion,
                nationality: additionalInfo.nationality,
                
                // Academic info
                previousSchool: additionalInfo.academicInfo?.previousSchool,
                previousSchoolAddress: additionalInfo.academicInfo?.previousSchoolAddress,
                transferCertificateNumber: additionalInfo.academicInfo?.transferCertificateNumber,
                transferDate: additionalInfo.academicInfo?.transferDate,
                
                // Medical info
                medicalConditions: additionalInfo.medicalInfo?.medicalConditions,
                emergencyContactName: additionalInfo.medicalInfo?.emergencyContact?.name,
                emergencyContactPhone: additionalInfo.medicalInfo?.emergencyContact?.phone,
                emergencyContactRelation: additionalInfo.medicalInfo?.emergencyContact?.relation
              });
              
              // Set up allergies form array
              if (additionalInfo.medicalInfo?.allergies && Array.isArray(additionalInfo.medicalInfo.allergies)) {
                this.clearFormArray(this.allergiesArray);
                additionalInfo.medicalInfo.allergies.forEach((allergy: string) => {
                  this.allergiesArray.push(this.fb.control(allergy));
                });
              }
              
              // Set up medications form array
              if (additionalInfo.medicalInfo?.medications && Array.isArray(additionalInfo.medicalInfo.medications)) {
                this.clearFormArray(this.medicationsArray);
                additionalInfo.medicalInfo.medications.forEach((medication: string) => {
                  this.medicationsArray.push(this.fb.control(medication));
                });
              }
              
              // Set up parent/guardian info
              if (additionalInfo.parentGuardianInfo && Array.isArray(additionalInfo.parentGuardianInfo)) {
                this.clearFormArray(this.parentGuardianArray);
                additionalInfo.parentGuardianInfo.forEach((guardianInfo: any) => {
                  this.parentGuardianArray.push(this.fb.group({
                    relation: [guardianInfo.relation || ''],
                    firstName: [guardianInfo.firstName || ''],
                    lastName: [guardianInfo.lastName || ''],
                    occupation: [guardianInfo.occupation || ''],
                    education: [guardianInfo.education || ''],
                    email: [guardianInfo.email || ''],
                    phoneNumber: [guardianInfo.phoneNumber || ''],
                    address: [guardianInfo.address || '']
                  }));
                });
              }
            } catch (error) {
              console.error('Error parsing additional info:', error);
            }
          }
        },
        (error) => {
          console.error('Error loading student:', error);
          this.errorMessage = 'Failed to load student data. Please try again.';
        }
      );
  }
  
  loadPersonData(personId: string): void {
    this.personService.getPersonById(personId)
      .subscribe(
        (person) => {
          this.person = person;
          
          // Populate person form fields
          this.studentForm.patchValue({
            firstName: person.firstName,
            lastName: person.lastName,
            gender: person.gender,
            dateOfBirth: person.dateOfBirth,
            placeOfBirth: person.placeOfBirth,
            email: person.email,
            phoneNumber: person.phone,
            address: person.address
          });
        },
        (error) => {
          console.error('Error loading person data:', error);
        }
      );
  }
  
  loadClasses(): void {
    this.classService.getActiveClasses().subscribe(
      (classes) => {
        this.classes = classes;
      },
      (error) => {
        console.error('Error loading classes:', error);
      }
    );
  }
  
  clearFormArray(formArray: FormArray): void {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
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
    if (this.studentForm.valid && this.student && this.person) {
      this.isSubmitting = true;
      this.errorMessage = '';
      
      // Extract form values
      const formValues = this.studentForm.value;
      
      // Update person data
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
      
      // Update student data
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
        })
      };
      
      // Add class reference if selected
      if (formValues.classId) {
        studentData.class = {
          objectId: formValues.classId
        };
      }
      
      // Update both person and student in parallel
      forkJoin({
        person: this.personService.updatePerson(this.person.id!, personData),
        student: this.studentService.updateStudent(this.student.id!, studentData)
      })
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe(
        (results) => {
          console.log('Update successful:', results);
          this.router.navigate([this.routes.studentsList]);
        },
        (error) => {
          console.error('Error updating student:', error);
          this.errorMessage = 'Failed to update student. Please try again.';
        }
      );
    } else {
      // Mark all fields as touched to display validations
      Object.keys(this.studentForm.controls).forEach(key => {
        const control = this.studentForm.get(key);
        control?.markAsTouched();
      });
      
      if (!this.student || !this.person) {
        this.errorMessage = 'Student data not loaded properly. Please refresh the page.';
      }
    }
  }

  // Helper method to get a class by ID
  getClassById(classId: string): Class | undefined {
    return this.classes.find(c => c.id === classId);
  }

  removeRow(index: number): void {
    if (this.formData.length > 1) {
      this.formData.splice(index, 1);
    }
  }

  addNewRow(): void {
    this.formData.push({});
  }
}