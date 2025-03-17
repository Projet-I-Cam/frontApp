import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-all-blog',
    templateUrl: './all-blog.component.html',
    styleUrl: './all-blog.component.scss',
    standalone: false
})
export class AllBlogComponent {
  public routes = routes;
}
