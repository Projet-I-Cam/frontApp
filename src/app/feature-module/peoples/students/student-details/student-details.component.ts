import { routes } from '../../../../shared/routes/routes';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../auth/services/login.service';
import { Location } from '@angular/common';
import { PersonService } from '../../../../services/person.service';




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


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private location: Location,
    private personService: PersonService
  ) { }

  ngOnInit(): void {

      this.loginUserRole = this.loginService.getCurrentRole();
      if (this.loginUserRole == 'eleve') {
        this.isLoginStudent = true;
      }
      else {
        this.isLoginStudent = false;
        this.studentId = this.route.snapshot.paramMap.get('id') || '';
      }
      this.getStudentDetails(this.studentId);

  }
  onTabChange(index: any) {
    if (index !== -1) {
      this.activeIndex = index + 1;
    }
  }

async getStudentDetails(id: string) {
  console.log(id);
  this.isDataLoading = true;

  this.personService.getPersonById(id).subscribe({
    next: (student: any) => {
      this.studentData = student;
      this.isDataLoading = false;
      console.log(student)
    },
    error: (err) => {
      console.error('Failed to fetch student details', err);
      this.isDataLoading = false;
    }
  });
}

  goBack() {
    this.location.back();
  }

}
