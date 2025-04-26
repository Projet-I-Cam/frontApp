import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
    selector: 'app-teacher-details',
    templateUrl: './teacher-details.component.html',
    styleUrl: './teacher-details.component.scss',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, SharedModule]
})
export class TeacherDetailsComponent {
  public routes = routes;
}
