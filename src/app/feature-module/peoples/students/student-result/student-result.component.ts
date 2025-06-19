import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import {DropdownModule} from "primeng/dropdown";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {CustomPaginationModule} from "../../../../shared/custom-pagination/custom-pagination.module";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {SharedModule} from "../../../../shared/shared.module";

@Component({
    selector: 'app-student-result',
    templateUrl: './student-result.component.html',
    styleUrl: './student-result.component.scss',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, MatSortModule, MatTableModule, CustomPaginationModule, BsDatepickerModule, DropdownModule, SharedModule]
})
export class StudentResultComponent {
  public routes = routes;
}
