import { Component, OnInit } from '@angular/core';
import { TableConfig, FilterConfig, SortOption } from '../../../shared/model/table.model';
import { routes } from '../../../shared/routes/routes';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { globalPost, globalGet, globalPut, globalDelete } from '../../../services/statefull/http';



declare var bootstrap: any;
@Component({
  selector: 'app-region',
  standalone: false,
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss'
})

export class RegionComponent  implements OnInit{
public routes = routes;
mode = 'create';
public regionForm: any;
public currentRegionId = '';
public loading: boolean = true;
public error: string | null = null;
public searchValue: string = '';
public pageSize = 10;
public currentPage = 1;
public tableData: any[] = [];
public  pageSizeOptions = [10, 25, 50];
public totalRecords: number = 0;

constructor(private fb: FormBuilder, private router: Router) {
  this.regionForm = this.fb.group({
    objectId: [''],
    regionNameFr: [''],
    regionNameEn: [''],
  });
}
 ngOnInit() {
  this.loadData();
 }
 openModal(mode: string, modalId: any, data?: any): void {
  this.mode = mode;

  if (mode === 'view_departments' && data) {
    this.router.navigate(['administrative-division/region', data]);
    return;
  }

  if (mode === 'view_districts' && data) {
    this.router.navigate(['administrative-division/department', data]);
    return;
  }

  if (mode === 'edit' && data) {
    this.regionForm.patchValue({
      objectId: data.objectId,
      sectionNameFr: data.name_fr,
      sectionNameEn: data.name_en,
    });
  } else if (mode === 'delete') {
    this.currentRegionId = data;
  }

  const modalElement = document.getElementById(modalId);
  if (!modalElement) {
    console.error(`Modal with ID "${modalId}" not found`);
    return;
  }

  const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
  modalInstance.show();
}


async loadData(): Promise<void> {
  this.loading = true;
  this.error = null;
  try {
    await this.getTableData(this.currentPage);
  } catch (err) {
    this.error = 'Une erreur est survenue lors du chargement des données.';
  } finally {
    this.loading = false;
  }
}

async getTableData(currentPage: number, filters?: any, includes?: any): Promise<void> {
  const res: any = await globalGet({
    T: 'Region',
    filters: filters || {},
    includes: includes || ['departement'],
    curentPage: currentPage,
  });

  console.log('Fetched data:', res);

  if (!res.error) {
    this.tableData = res ? [...res] : [];
  } else {
    console.error('Error:', res.message);
    throw new Error(res.message);
  }
}
onPageChange(event: any) {
  this.pageSize = event.rows;
  this.currentPage = (event.first / event.rows) + 1;
  this.loadData();
}

}
