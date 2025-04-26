import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-teacher-library',
    templateUrl: './teacher-library.component.html',
    styleUrl: './teacher-library.component.scss',
    standalone: false
})
export class TeacherLibraryComponent {
  public routes = routes;
}
