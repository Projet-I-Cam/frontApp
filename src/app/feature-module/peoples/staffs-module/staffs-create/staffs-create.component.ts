import { Component, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-staffs-create',
  standalone: false,
  templateUrl: './staffs-create.component.html',
  styleUrl: './staffs-create.component.scss'
})
export class StaffsCreateComponent implements OnInit {
  public routes = routes;
  active: number = 3;
  items: MenuItem[] = [];
  ngOnInit() {
    this.items = [
      {
        label: 'Step 1',
      },
      {
        label: 'Step 2',
      },
      {
        label: 'Step 3',
      }
    ];
  }
}

