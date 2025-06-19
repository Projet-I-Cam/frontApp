import { routes } from '../../../../shared/routes/routes';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../auth/services/login.service';


@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrl: './student-dashboard.component.scss',
    standalone: false
})

export class StudentDashboardComponent implements OnInit{
  public routes = routes;
  activeIndex = 1;
  activeSubIndex = 1;
  userRole: any;
  personData: any;

    constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
     const user = this.loginService.getUser();
      const role = user?.role?.task_name || 'admin';
      this.userRole = role;
      this.personData = this.loginService.getPerson();

  }
  onTabChange(index: any) {
    if (index !== -1) {
      this.activeIndex= index + 1;
    }
  }
   onSubTabChange(index: any) {
    if (index !== -1) {
      this.activeIndex= index + 1;
    }
  }
}
