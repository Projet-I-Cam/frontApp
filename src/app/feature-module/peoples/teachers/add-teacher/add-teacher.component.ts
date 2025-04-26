import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
interface Option {
  label: string;
  value: string;
}
@Component({
    selector: 'app-add-teacher',
    templateUrl: './add-teacher.component.html',
    styleUrl: './add-teacher.component.scss',
    standalone: false
})
export class AddTeacherComponent {
  public routes = routes;
  values: string[] = ['English', 'Spanish'];
}
