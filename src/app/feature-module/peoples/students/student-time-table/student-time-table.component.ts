import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-student-time-table',
    templateUrl: './student-time-table.component.html',
    styleUrl: './student-time-table.component.scss',
    imports: [CommonModule, RouterModule, FormsModule, SharedModule, DropdownModule, BsDatepickerModule]
})
export class StudentTimeTableComponent {
  public routes = routes;
}
