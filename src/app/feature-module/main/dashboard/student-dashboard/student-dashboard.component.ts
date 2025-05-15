import { routes } from '../../../../shared/routes/routes';
import { Component, OnInit } from '@angular/core';

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
  ngOnInit(): void {

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
