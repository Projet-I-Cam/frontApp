import { Component } from '@angular/core';
import { TableConfig, FilterConfig, SortOption } from '../../../shared/model/table.model';
import { routes } from '../../../shared/routes/routes';

@Component({
  selector: 'app-region',
  standalone: false,
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss'
})
export class RegionComponent {
public routes = routes;
tableConfig: TableConfig = {
  title: 'Academic Reasons',
  columns: [
    { name: 'role', header: 'Role', sortable: true },
    { name: 'reason', header: 'Reason', sortable: true },
    { name: 'createdDate', header: 'Created Date', sortable: true }
  ],
  actions: [
    {
      name: 'Add Reason',
      icon: 'ti ti-square-rounded-plus-filled me-2',
      handler: () => this.openModal()
    }
  ],

};

filters:FilterConfig[] = [
  {
    label: 'Role',
    key: 'role',
    options: ['admin', 'user', 'guest'],
    optionLabel: 'name'
  },
  {
    label: 'Reason',
    key: 'reason',
    options: ['good', 'bad', 'average'],
    optionLabel: 'name'
  }
];

sortOptions:  SortOption[] = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
  { label: 'Recently Viewed', value: 'recent_view' },
  { label: 'Recently Added', value: 'recent_add' }
];

tableData = [];

openModal(){}

onFilter(event: any): void {
  console.log('Filter applied:', event);
}

onSort(event: any): void {
  console.log('Sort applied:', event);

}

onSearch(event: any): void {
  console.log('Search applied:', event);
}

onRowSelect(selectedRows: any): void {
  console.log('Selected rows:', selectedRows);
}

  handleTableAction(event: {type: string, item: any}) {
    switch(event.type) {
      case 'edit':
        this.openModal();
        break;
      case 'delete':
        this.openModal();
        break;
    }
  }

  handleDateRangeChange(range: any) {
    // Handle date range change
  }

}
