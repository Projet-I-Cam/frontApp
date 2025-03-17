import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';


@Component({
    selector: 'app-icon-material',
    templateUrl: './icon-material.component.html',
    styleUrls: ['./icon-material.component.scss'],
    standalone: false
})
export class IconMaterialComponent {
  public routes = routes;
}
