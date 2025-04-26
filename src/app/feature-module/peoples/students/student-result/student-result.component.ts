import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-student-result',
    templateUrl: './student-result.component.html',
    styleUrl: './student-result.component.scss',
    standalone: false
})
export class StudentResultComponent {
  public routes = routes;
}
