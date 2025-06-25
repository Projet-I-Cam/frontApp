import { routes } from '../../../../shared/routes/routes';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../auth/services/login.service';
import { Location } from '@angular/common';
import { PersonService } from '../../../../services/person.service';
import { Institution } from '../../../../shared/model/institution.model';
import { globalGet } from '../../../../services/statefull/http';
import { FilterStudent, getCurrentAcademicYear, listInscriptions } from '../../../../services/statefull/genericParse';





@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss',
  standalone: false
})
export class StudentDetailsComponent implements OnInit {
  public routes = routes;
  activeIndex = 0;
  studentId = '';
  studentData: any;
  isLoginStudent = false;
  isDataLoading = false;
  loginUserRole = '';
  institutionData : any;
  userId: any;
  academicYear: any;
  person : any = {};


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private location: Location,
    private personService: PersonService
  ) { }

  async ngOnInit() {
    this.person = await this.loginService.getPerson();
    console.log("personne concernée : ");
    console.log(this.person);
    console.log(this.person?.isParent);

      const user = this.loginService.getUser();
      this.academicYear = await getCurrentAcademicYear();
      const role = user?.role?.task_name || 'admin';
      this.loginUserRole = role;
      if (this.loginUserRole == 'eleve') {
        this.isLoginStudent = true;
        this.userId = user.objectId;
        this.getStudentDetails(this.userId);
      }
      else {
        this.isLoginStudent = false;
        this.studentId = this.route.snapshot.paramMap.get('id') || '';
        this.getStudentDetails(this.studentId);
      }
  }
  onTabChange(index: any) {
    if (index !== -1) {
      this.activeIndex = index + 1;
    }
  }

async getStudentDetails(id: string) {
  console.log('Student ID:', id);
  this.isDataLoading = true;
  try {
    const res: any = await globalGet({
      T: 'Enrollment',
      filters:
      this.studentId ?
        {
          academicYear: { className: 'AcademicYear', objectId: this.academicYear.objectId },
          person: { className: 'Person', objectId: this.studentId }
        } :
        {
           academicYear: { className: 'AcademicYear', objectId: this.academicYear.objectId },
           person: {className: 'Person', user: {className:'_User', objectId: this.userId}}
        },
      includes: [
        'person',
        'person.parents',
        'person.enrollments',
        'institution',
        'institution.persons',
        'institution.municipality',
        'institution.municipality.department',
        'institution.municipality.department.region',
        'institution.educationOfferings',
        'institution.educationOfferings.educationType',
        'institution.owner'
      ],
    });

    this.studentData = res[0] || {};
    console.log('res', res);
    console.log('studentData', this.studentData);
  } catch (error) {
    console.error('Error fetching student details:', error);
  } finally {
    this.isDataLoading = false;
  }
}



  goBack() {
    this.location.back();
  }

}
