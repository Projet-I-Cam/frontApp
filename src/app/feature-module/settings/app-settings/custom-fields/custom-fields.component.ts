import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-custom-fields',
    templateUrl: './custom-fields.component.html',
    styleUrl: './custom-fields.component.scss',
    standalone: false
})
export class CustomFieldsComponent {
  public routes = routes;
}
