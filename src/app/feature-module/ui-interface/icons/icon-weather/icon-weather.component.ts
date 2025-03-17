import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';


@Component({
    selector: 'app-icon-weather',
    templateUrl: './icon-weather.component.html',
    styleUrls: ['./icon-weather.component.scss'],
    standalone: false
})
export class IconWeatherComponent {
  public routes = routes;

   

   
}
