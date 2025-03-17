import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-teacher-details',
    templateUrl: './teacher-details.component.html',
    styleUrl: './teacher-details.component.scss',
    standalone: false
})
export class TeacherDetailsComponent {
  public routes = routes;
}
