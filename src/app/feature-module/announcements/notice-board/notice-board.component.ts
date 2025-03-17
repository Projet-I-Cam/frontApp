import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';

@Component({
    selector: 'app-notice-board',
    templateUrl: './notice-board.component.html',
    styleUrl: './notice-board.component.scss',
    standalone: false
})
export class NoticeBoardComponent {
  public routes = routes;
}
