import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-edit-teacher',
    templateUrl: './edit-teacher.component.html',
    styleUrl: './edit-teacher.component.scss',
    standalone: false
})
export class EditTeacherComponent {
  public routes = routes;
  values: string[] = ['English', 'Spanish'];
}
