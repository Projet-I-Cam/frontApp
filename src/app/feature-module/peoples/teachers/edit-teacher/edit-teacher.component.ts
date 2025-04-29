import { Component, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-edit-teacher',
    templateUrl: './edit-teacher.component.html',
    styleUrl: './edit-teacher.component.scss',
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, SharedModule, DropdownModule, BsDatepickerModule]
})
export class EditTeacherComponent implements OnInit {
  public routes = routes;
  values: string[] = ['English', 'Spanish'];
  teacherId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teacherId = params['id'];
      console.log('Teacher ID:', this.teacherId);
      // Ici vous pourriez charger les données de l'enseignant avec cet ID
    });
  }
}
