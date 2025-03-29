import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
  standalone: false
})
export class GradesComponent {
  public routes = routes;
} 