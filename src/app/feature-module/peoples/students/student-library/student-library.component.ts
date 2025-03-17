import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-student-library',
    templateUrl: './student-library.component.html',
    styleUrl: './student-library.component.scss',
    standalone: false
})
export class StudentLibraryComponent {
public routes = routes
}
