import { Component } from '@angular/core';
import { TableConfig } from '../../../shared/model/table.model';

@Component({
  selector: 'app-region',
  standalone: false,
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss'
})
export class RegionComponent {
// academic-reasons.component.ts
tableConfig: TableConfig = {
  title: 'Academic Reasons',
  breadcrumbs: [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Academic', link: '' },
    { label: 'Reasons', link: '' }
  ],
  columns: [
    { name: 'role', header: 'Role', sortable: true },
    { name: 'reason', header: 'Reason', sortable: true },
    { name: 'createdDate', header: 'Created Date', sortable: true }
  ],
  actions: [
    {
      name: 'Add Reason',
      icon: 'ti ti-square-rounded-plus-filled me-2',
      handler: () => this.openAddModal()
    }
  ],
  filters: [
    {
      name: 'role',
      label: 'Role',
      options: ['Teacher', 'Student', 'Staff']
    }
  ]
};
tableData = [];

openAddModal(){}

onFilter(event: any): void {
  console.log('Filter applied:', event);
}

onSort(event: any): void {
  console.log('Sort applied:', event);

}

onSearch(event: any): void {
  console.log('Search applied:', event);
}

onRowSelect(selectedRows: any[]): void {
  console.log('Selected rows:', selectedRows);}

}
