import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-student-time-table',
    templateUrl: './student-time-table.component.html',
    styleUrl: './student-time-table.component.scss',
    standalone: false
})
export class StudentTimeTableComponent {
  public routes = routes;
}
