import { Component } from '@angular/core';
import { routes } from '../../../../../shared/routes/routes';


@Component({
    selector: 'app-form-mask',
    templateUrl: './form-mask.component.html',
    styleUrls: ['./form-mask.component.scss'],
    standalone: false
})
export class FormMaskComponent{
  public routes = routes;
  
}
