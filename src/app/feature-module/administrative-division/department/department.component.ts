import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { globalPost, globalGet, globalPut, globalDelete } from '../../../services/statefull/http';

declare var bootstrap: any;

@Component({
  selector: 'app-department',
  standalone: false,
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {
  idParam: string = '';
  public routes = routes;
  mode = 'create';
  public departmentForm: any;
  public currentdepartmentId = '';
  public loading: boolean = true;
  public error: string | null = null;
  public searchValue: string = '';
  public pageSize = 10;
  public currentPage = 1;
  public tableData: any[] = [];
  public  pageSizeOptions = [10, 25, 50];
  public totalRecords: number = 0;


  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.departmentForm = this.fb.group({
      objectId: [''],
       name: [''],
      region: []
    });
  }
   ngOnInit() {
    this.loadData();
   }
  openModal(mode:string,modal:any, data?:any){
    this.mode = mode;
    if(mode === 'edit'){
      this.departmentForm.patchValue({
        objectId: data.objectId,
        name: data.name,
        region: data.region
      });
    }
    else if(mode == 'delete'){
      this.currentdepartmentId = data;
    }
    else if(mode == 'view_districts'){
      this.router.navigate(['administrative-division/department', data]);
    }
    const modalElement = document.getElementById(modal);
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
    this.idParam = this.route.snapshot.paramMap.get('id') || '';
    if (this.idParam == ''){
      const res: any = await globalGet({
        T: 'Department',
        filters: filters || {},
        includes: includes || ['region, municipalities'],
        curentPage: currentPage,

      });
      

      console.log('Fetched data:', res);

      if (!res.error) {
        this.tableData = res ? [...res] : [];
        this.totalRecords = res?.count || res?.total || res?.length || 0;
      } else {
        console.error('Error:', res.message);
        throw new Error(res.message);
      }
    }else{
      console.log(this.idParam);
      const res: any = await globalGet({
        T: 'Department',
        filters: filters || {
          region: {className: 'Region', objectId: this.idParam},
          ...filters
        },
        includes: includes || ['region', 'municipalities'],
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
  }

    onPageChange(event: any) {
      this.pageSize = event.rows;
      this.currentPage = (event.first / event.rows) + 1;
      this.loadData();
  }


}
