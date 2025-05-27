import { Component, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { MenuItem } from 'primeng/api';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PersonService} from "../../../../services/person.service";
import {Class, Person} from "../../../../shared/model/student.model";
import {UtilsService} from "../../../../services/utilis.service";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-staffs-create',
  standalone: false,
  templateUrl: './staffs-create.component.html',
  styleUrl: './staffs-create.component.scss'
})
export class StaffsCreateComponent implements OnInit {
  public routes = routes;
  values: string[] = ['English', 'Spanish'];
  staffForm: FormGroup;
  classes: Class[] = [];
  sections: any = [];
  sexes: any = [];

  filteredPerson: any[] = [];
  loading = false;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';

  active: number = 3;
  items: MenuItem[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private personService: PersonService
  ) {
    UtilsService.getSection().then(sections => {
      this.sections = sections?.map((sec: any) => {
        return {
          label: sec?.get('name_fr'),
          value: sec?._getId()
        }
      })
    });

    UtilsService.getGender().then(sexes => {
      this.sexes = sexes?.map((sex: any) => {
        return {
          label: sex?.get('libelle_fr'),
          value: sex?._getId()
        }
      })
    });

    this.staffForm = this.fb.group({
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
      // parentGuardianInfo: this.fb.array([this.createParentGroup()])
    });

  }
  ngOnInit() {
    this.items = [
      {
        label: 'Step 1',
      },
      {
        label: 'Step 2',
      },
      {
        label: 'Step 3',
      }
    ];
  }

  public onFileSelect(event: any) {
    console.log('Changed')
    const file: File = event.target.files[0];
    if (file) {
      this.staffForm.patchValue({
        photo: file
      });
    }
  }

  public async onSubmit() {
    console.log('Submited', this.staffForm.valid, this.staffForm.value)
    if (this.staffForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      // Extract form values
      const formValues = this.staffForm.value;

      // const parentGuardianInfo = formValues?.parentGuardianInfo
      // const parents = await this.personService.createSimpleParent(parentGuardianInfo)
      // console.log(' parents parents ', parents)
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
        // parents: parents,
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
            this.router.navigate([routes.staffList]);
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
      this.markFormGroupTouched(this.staffForm);
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


}

