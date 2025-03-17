import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-student-details',
    templateUrl: './student-details.component.html',
    styleUrl: './student-details.component.scss',
    standalone: false
})
export class StudentDetailsComponent {
  public routes = routes;
}
