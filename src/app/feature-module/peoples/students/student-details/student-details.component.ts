import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../../../../shared/shared.module';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss',
  standalone: false
})
export class StudentDetailsComponent implements OnInit {
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
