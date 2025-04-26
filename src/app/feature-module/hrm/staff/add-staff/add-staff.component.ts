import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-add-staff',
    templateUrl: './add-staff.component.html',
    styleUrl: './add-staff.component.scss',
    standalone: false
})
export class AddStaffComponent {
  public routes = routes;
  values: string[] = ['English', 'Spanish'];
  constructor(private router: Router) {}
  public onSubmit() {
    // this.router.navigate([routes.invoice]);
  }
}
