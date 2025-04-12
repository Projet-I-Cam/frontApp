import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class InstitutionsComponent {
  constructor() { }
} 