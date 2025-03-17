import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';


@Component({
    selector: 'app-ui-popovers',
    templateUrl: './ui-popovers.component.html',
    styleUrl: './ui-popovers.component.scss',
    standalone: false
})
export class UiPopoversComponent {
  public routes = routes;
}
