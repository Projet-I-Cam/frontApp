import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
    selector: 'app-student-details',
    templateUrl: './student-details.component.html',
    styleUrl: './student-details.component.scss',
    imports: [CommonModule, RouterModule, FormsModule, BsDatepickerModule, DropdownModule, SharedModule]
})
export class StudentDetailsComponent {
  public routes = routes;
}
