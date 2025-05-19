import { Component, Input, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { PersonService } from '../../../../services/person.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from '../../../../auth/services/login.service';
import { globalGet } from '../../../../services/statefull/http';
import { FilterStudent, getCurrentAcademicYear, listInscriptions } from '../../../../services/statefull/genericParse';

@Component({
  selector: 'app-student-infos',
  standalone: false,
  templateUrl: './student-infos.component.html',
  styleUrl: './student-infos.component.scss'
})
export class StudentInfosComponent {
  @Input() studentData: any;
  public routes = routes;
  studentForm!: FormGroup;
  academicForm!: FormGroup;
  academicYear: any;
  academicData: any;
  userRole = '';
  originalData: any;
  isEditMode = false;
  isEditAcademic: boolean = false;
  genders: any;
  sections: any;
  classes: any;
  classRooms: any;
  teachers: any;
  optionMap: any;
  parents: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private location: Location,
    private personService: PersonService
  ) {
  }

  activeSubIndex = 0;
  async ngOnInit() {
    try {
      this.userRole = this.loginService.getCurrentRole();
      this.academicYear = await getCurrentAcademicYear();

      const res = await listInscriptions({
        yearId: this.academicYear.objectId,
        personId: this.studentData.objectId
      });

      this.academicData = res[0] || {};
      console.log('academicData', this.academicData);

      this.initForm();
      this.initAcademicForm();

      // Load dependent data in sequence
      await this.getGenders();
      await this.getSections();
      await this.getClasses();
      await this.getClassRooms();
      await this.getClassRoomTeachers();

      // Initialize optionMap after all data is loaded
      this.optionMap = {
        section: (this.sections && this.sections.length > 0)
          ? this.sections
          : (this.academicData?.classroom?.classe?.section ? [this.academicData.classroom.classe.section] : []),

        classe: (this.classes && this.classes.length > 0)
          ? this.classes
          : (this.academicData?.classroom?.classe ? [this.academicData.classroom.classe] : []),

        classRoom: (this.classRooms && this.classRooms.length > 0)
          ? this.classRooms
          : (this.academicData?.classroom ? [this.academicData.classroom] : []),
      };
      console.log('parents',)
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }
  // In your component.ts
  get normalizedTeachers(): any[] {
    const t = this.teachers;
    return Array.isArray(t) ? t : t ? [t] : [];

  }


  initForm(): void {
    this.studentForm = this.fb.group({
      firstName: [{ value: this.studentData?.firstName || '', disabled: true }, [Validators.required]],
      lastName: [{ value: this.studentData?.lastName || '', disabled: true }, [Validators.required]],
      gender: [{ value: this.studentData?.gender.objectId || '', disabled: true }],
      birthDate: [{ value: this.studentData?.birthDate.iso || '', disabled: true }],
      birthPlace: [{ value: this.studentData?.birthPlace || '', disabled: true }],
      address: [{ value: this.studentData?.address || '', disabled: true }],
      cityOfResidence: [{ value: this.studentData?.cityOfResidence || '', disabled: true }],
      neighborhood: [{ value: this.studentData?.neighborhood || '', disabled: true }],
      phone: [{ value: this.studentData?.phone || '', disabled: true }, [Validators.pattern(/^\+?[0-9]{7,15}$/)]],
      email: [{ value: this.studentData?.email || '', disabled: true }, [Validators.email]]
    });

  }

  initAcademicForm(): void {
    this.academicForm = this.fb.group({
      registrationNumber: [{ value: this.academicData?.matricule|| '', disabled: true }, [Validators.required]],
      section: [{ value: this.academicData?.classroom?.classe?.section?.objectId || '', disabled: true }, [Validators.required]],
      classe: [{ value: this.academicData?.classroom?.classe?.objectId || '', disabled: true }, [Validators.required]],
      classRoom: [{ value: this.academicData?.classroom?.objectId || '', disabled: true }, [Validators.required]]
    });
  }


  onSubTabChange(index: any) {
    if (index !== -1) {
      this.activeSubIndex = index + 1;
    }
  }

  toggleEdit() {
    this.isEditMode = true;
    this.studentForm.enable();
  }
  cancelEdit() {
    this.isEditMode = false;
    this.initForm();
  }
  toggleEditAcademic() {
    this.isEditAcademic = true;
    this.academicForm.enable();
    // Disable read-only field again
    this.academicForm.get('registrationNumber')?.disable();
  }

  cancelEditAcademic() {
    this.isEditAcademic = false;
    this.initAcademicForm();
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.studentData = { ...this.studentData, ...this.studentForm.getRawValue() };
      this.isEditMode = false;
      this.initForm(); // Re-disable form
    }
  }
  async getGenders() {
    const res: any = await globalGet({
      T: 'Gender',
    });
    this.genders = res;
    console.log(this.genders);
  }
  async getSections() {
    const res: any = await globalGet({
      T: 'InstitutionSection',
      filters: {
        institution: {
          className: 'Institution', objectId: this.academicData.institution.objectId
        }
      }
    });
    this.sections = res;
    console.log(this.sections);
  }
  async getClasses() {
    const res: any = await globalGet({
      T: 'Classe',
      filters: {
        section: { className: 'Section', objectId: this.academicForm.get('section')?.value }

      }
    });
    this.classes = res;
    console.log(this.classes);
  }

  async getClassRooms() {
    const res: any = await globalGet({
      T: 'Classroom',
      filters: {
        classe: { className: 'Classe', objectId: this.academicForm.get('classe')?.value },
        institution: { className: 'Institution', objectId: this.academicData.institution.objectId }
      },
      selects: ['objectId', 'name_fr', 'name_en']
    });
    this.classRooms = res;
    console.log(this.classRooms);
  }

  async getClassRoomTeachers() {
    const res: any = await globalGet({
      T: 'TeacherClassroom',
      filters: {
        classroom: { className: 'ClassRoom', objectId: this.academicData.classroom.objectId },
      },
      includes: ['teacher']
    });
    this.teachers = res;
    console.log('teacher', this.teachers);

  }

}
