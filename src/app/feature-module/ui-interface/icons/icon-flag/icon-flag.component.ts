import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';


@Component({
    selector: 'app-icon-flag',
    templateUrl: './icon-flag.component.html',
    styleUrls: ['./icon-flag.component.scss'],
    standalone: false
})
export class IconFlagComponent {
  public routes = routes;
}
