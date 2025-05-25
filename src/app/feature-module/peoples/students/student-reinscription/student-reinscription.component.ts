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
  selector: 'app-student-reinscription',
  standalone: false,
  templateUrl: './student-reinscription.component.html',
  styleUrl: './student-reinscription.component.scss'
})
export class StudentReinscriptionComponent implements OnInit {
  public routes = routes;
  studentForm!: FormGroup;
  sections: any = [];
  classes: any[] = [];
  classRooms: any = [];
  students: any[] = [];
  filteredStudents: any[] = [];
  isLoadingStudents = true;
  loading = false;
  isLoading = false;
  isSubmitting = false;
  errorMessage: any ='';
  academicYear: any;
  currentPerson: any;
  selectedStudent: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
  ) {
    UtilsService.getSection().then(sections => {
      this.sections = sections?.map((sec: any) => ({
        label: sec?.get('name_fr'),
        value: sec?._getId()
      })) || [];
    });
  }

  async ngOnInit() {
    this.academicYear = await getCurrentAcademicYear();
    this.currentPerson = await this.loginService.getPerson();
    this.getStudents();
    this.initializeForm();
    this.studentForm.get('academicYear')?.patchValue(this.academicYear?.objectId || '');
    this.setupFormListeners();
  }
  initializeForm() {
    this.studentForm = this.fb.group({
      academicYear: [{ value: '', disabled: true }, [Validators.required]],
      person: ['', [Validators.required]],
      section: ['', [Validators.required]],
      admissionDate: [''],
      classroom: [''],
      class: [''],
      status: ['Active', [Validators.required]],
      registrationNumber: ['']
    });
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

  async getClasses() {
    const sectionId = this.studentForm.get('section')?.value;
    if (!sectionId) return;

    try {
      const res: any = await globalGet({
        T: 'Classe',
        filters: {
          section: { className: 'Section', objectId: sectionId }
        }
      });
      this.classes = res || [];
      console.log('Classes loaded:', this.classes);
    } catch (error) {
      console.error('Error loading classes:', error);
      this.classes = [];
    }
  }

  setupFormListeners() {
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

  async getStudents() {
    this.isLoadingStudents = true;
    try {
      const institutionPointer = {
        __type: 'Pointer',
        className: 'Institution',
        objectId: this.currentPerson?.institution?.objectId
      };
      const academicYearPointer = {
        __type: 'Pointer',
        className: 'AcademicYear',
        objectId: this.academicYear?.objectId
      };
      // First condition: academicYear not equal
      const query1 = new Parse.Query('Enrollment');
      query1.equalTo('institution', institutionPointer);
      query1.notEqualTo('academicYear', academicYearPointer);

      // Second condition: academicYear equal + isValid false
      const query2 = new Parse.Query('Enrollment');
      query2.equalTo('institution', institutionPointer);
      query2.equalTo('academicYear', academicYearPointer);
      query2.equalTo('isValid', false);

      // Combine with OR
      const finalQuery = Parse.Query.or(query1, query2);
      finalQuery.include(['person', 'person.gender', 'classroom', 'classroom.classe', 'classroom.classe.section', 'academicYear', 'institution']);

      const res: any = await finalQuery.find();

      // Deduplicate by unique person.objectId
      const uniquePersonsMap: any = {};
      (res || []).forEach((enrollment: any) => {
        const jsonEnrollment = enrollment.toJSON();
        if (jsonEnrollment.person?.objectId) {
          uniquePersonsMap[jsonEnrollment.person.objectId] = jsonEnrollment;
        }
      });

      this.students = Object.values(uniquePersonsMap);
      this.filteredStudents = [...this.students];
      console.log('Unique persons loaded:', this.students);
      this.isLoadingStudents = false;
    } catch (error) {
      this.isLoadingStudents = false;
      console.error('Error loading classes:', error);
      this.students = [];
    }
  }

  // Filter students based on search input
  filterStudents(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

    this.filteredStudents = this.students.filter(student =>
      student.person.firstName.toLowerCase().includes(searchTerm) ||
      student.person.lastName.toLowerCase().includes(searchTerm) ||
      student.matricule.toLowerCase().includes(searchTerm)
    );
  }

  onStudentSelected(selectedStudent: any) {
    this.selectedStudent = selectedStudent;
    this.studentForm.patchValue({
      person: selectedStudent,
      section: selectedStudent.classroom?.classe?.section?.objectId,
      classe: selectedStudent.classroom?.classe?.objectId,
      classroom: selectedStudent.classroom?.objectId,
    });
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }
async onSubmit() {
  this.markFormGroupTouched(this.studentForm);

  if (this.studentForm.invalid || this.isSubmitting) {
    return;
  }

  this.isSubmitting = true;
  this.errorMessage = '';

  try {
    const formValues = this.studentForm.getRawValue();
    const enrollmentData = {
      academicYear: {
        __type: 'Pointer',
        className: 'AcademicYear',
        objectId: this.academicYear.objectId
      },
      institution: {
        __type: 'Pointer',
        className: 'Institution',
        objectId: this.currentPerson.institution.objectId
      },
      person: {
        __type: 'Pointer',
        className: 'Person',
        objectId: this.selectedStudent.person.objectId
      },
      classroom: formValues.classroom ? {
        __type: 'Pointer',
        className: 'Classroom',
        objectId: formValues.classroom
      } : undefined,

      matricule: formValues.person.matricule,
      enrollmentDate: formValues.admissionDate ? new Date(formValues.admissionDate) : new Date(),
      isValid: true,
      validationDate: new Date(),
    };

    // 1. Check for existing enrollment
    const Enrollment = Parse.Object.extend('Enrollment');
    const query = new Parse.Query(Enrollment);
    query.equalTo('person', enrollmentData.person);
    query.equalTo('academicYear', enrollmentData.academicYear);
    query.equalTo('institution', enrollmentData.institution);

    const existingEnrollment = await query.first();

    // 2. Save or update
    let enrollment;
    if (existingEnrollment) {
      // Update existing
      enrollment = existingEnrollment;
      enrollment.set(enrollmentData);
      console.log('Updating existing enrollment:', enrollment.id);
    } else {
      // Create new
      enrollment = new Enrollment();
      enrollment.set(enrollmentData);
      console.log('Creating new enrollment');
    }

    // 3. Save to database
    const savedEnrollment = await enrollment.save();
    console.log('Enrollment saved successfully:', savedEnrollment);

    // 4. Reset form or navigate
    this.studentForm.reset();
    this.router.navigate([routes.studentList]);

  } catch (error: any) {
    console.error('Error saving enrollment:', error);
    this.errorMessage = error.message || 'Failed to save enrollment';
  } finally {
    this.isSubmitting = false;
  }
}

}
