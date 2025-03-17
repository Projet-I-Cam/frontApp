import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-storage',
    templateUrl: './storage.component.html',
    styleUrl: './storage.component.scss',
    standalone: false
})
export class StorageComponent {
  public routes = routes;
}
