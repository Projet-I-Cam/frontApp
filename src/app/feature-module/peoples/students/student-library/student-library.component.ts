import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-student-library',
    templateUrl: './student-library.component.html',
    styleUrl: './student-library.component.scss',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, SharedModule, DropdownModule, BsDatepickerModule]
})
export class StudentLibraryComponent {
    public routes = routes
}
