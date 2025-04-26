import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { Router } from '@angular/router';

@Component({
    selector: 'app-prefixes',
    templateUrl: './prefixes.component.html',
    styleUrl: './prefixes.component.scss',
    standalone: false
})
export class PrefixesComponent {
  public routes = routes;
  constructor(private router: Router) {}
  public onSubmit() {
    // this.router.navigate([routes.invoice]);
  }
}
