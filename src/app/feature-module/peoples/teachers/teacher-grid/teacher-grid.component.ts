import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-teacher-grid',
    templateUrl: './teacher-grid.component.html',
    styleUrl: './teacher-grid.component.scss',
    standalone: false
})
export class TeacherGridComponent {
  public routes = routes;
}
