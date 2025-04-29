import { Component, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { globalPost, globalGet, globalPut, globalDelete } from '../../../../services/statefull/http';
import { Validators } from 'ngx-editor';

declare var bootstrap: any;

@Component({
  selector: 'app-staffs-list',
  standalone: false,
  templateUrl: './staffs-list.component.html',
  styleUrl: './staffs-list.component.scss'
})
export class StaffsListComponent {

  public routes = routes;
    public mode = 'create';
    public currentObjectId = '';
    public loading: boolean = true;
    public error: string | null = null;
    public searchValue: string = '';
    public pageSize = 10;
    public currentPage = 1;
    public tableData: any[] = [];
    public pageSizeOptions = [10, 25, 50];
    public totalRecords: number = 0;

    constructor(
      private fb: FormBuilder,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.loadData();
    }

    async loadData(): Promise<void> {
      this.loading = true;
      this.error = null;
      try {
        await this.getTableData(this.currentPage, this.pageSize);
      } catch (err) {
        this.error = 'An error occurred while loading data.';
        console.error('Error loading data:', err);
      } finally {
        this.loading = false;
      }
    }

    async getTableData(currentPage: number, size: number, filters?: any, includes?: any): Promise<void> {
      try {
        const res: any = await globalGet({
          T: 'Person',
          filters: filters || {
            isStaff: true,
            region: {className: 'StaffType', objectId: 's1qtYKwduT'},
            ...filters
          },
          includes: includes || ['gender', 'position'],
          curentPage: currentPage,
          size: size
        });

        if (!res.error) {
          this.tableData = res ? [...res] : [];
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        console.error('Error fetching section data:', error);
        throw error;
      }
    }

    onPageChange(event: any): void {
      this.pageSize = event.rows;
      this.currentPage = (event.first / event.rows) + 1;
      this.loadData();
    }

    async deletePersonelle(): Promise<void> {
      try {
        await globalDelete({
          T: 'Person',
          objectId: this.currentObjectId
        });
        this.getTableData(1, this.pageSize);
        this.closeDeleteModal();
      } catch (error) {
        console.error('Error during deletion:', error);
      }
    }

    openDeleteModal(objectId: string): void {
      this.currentObjectId = objectId;
      const modalElement = document.getElementById('delete-modal');
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.show();
    }

    closeDeleteModal(): void {
      const modalElement = document.getElementById('delete-modal');
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.hide();
      this.currentObjectId = '';
    }
}
