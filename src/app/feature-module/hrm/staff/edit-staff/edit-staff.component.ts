import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-staff',
    templateUrl: './edit-staff.component.html',
    styleUrl: './edit-staff.component.scss',
    standalone: false
})
export class EditStaffComponent {
  public routes = routes;
  values: string[] = ['English', 'Spanish'];
  constructor(private router: Router) {}
  public onSubmit() {
    // this.router.navigate([routes.invoice]);
  }
}
