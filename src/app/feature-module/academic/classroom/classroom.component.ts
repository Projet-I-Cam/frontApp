import { Component, OnInit } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { globalPost, globalGet, globalPut, globalDelete } from '../../../services/statefull/http';
import { Validators } from 'ngx-editor';

declare var bootstrap: any;

@Component({
    selector: 'app-classroom',
    templateUrl: './classroom.component.html',
    styleUrl: './classroom.component.scss',
    standalone: false
})
export class ClassroomComponent {
  public routes = routes;
    public mode = 'create';
    public sectionForm: FormGroup;
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
    ) {
      this.sectionForm = this.fb.group({
        objectId: [''],
        sectionNameFr: ['', Validators.required],
        sectionNameEn: ['', Validators.required],
      });
    }

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
          T: 'Section',
          filters: filters || {},
          includes: includes || [],
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

    async onSubmit(): Promise<void> {
      if (this.sectionForm.invalid) {
        return;
      }

      try {
        if (this.mode === 'create') {
          await globalPost({
            T: 'Section',
            dataObject: {
              name_fr: this.sectionForm.value.sectionNameFr,
              name_en: this.sectionForm.value.sectionNameEn,
            },
          });
        } else {
          await globalPut({
            T: 'Section',
            dataObject: {
              name_fr: this.sectionForm.value.sectionNameFr,
              name_en: this.sectionForm.value.sectionNameEn,
            },
            objectId: this.sectionForm.value.objectId
          });
        }

        this.sectionForm.reset();
        this.getTableData(1, this.pageSize);
        this.closeAddModal();
      } catch (error) {
        console.error('Error during submission:', error);
      }
    }

    async deleteSection(): Promise<void> {
      try {
        await globalDelete({
          T: 'Section',
          objectId: this.currentObjectId
        });
        this.getTableData(1, this.pageSize);
        this.closeDeleteModal();
      } catch (error) {
        console.error('Error during deletion:', error);
      }
    }

    openModal(mode: string, data?: any): void {
      this.mode = mode;

      if (mode === 'edit' && data) {
        this.sectionForm.patchValue({
          objectId: data.objectId,
          sectionNameFr: data.name_fr,
          sectionNameEn: data.name_en,
        });
      } else {
        this.sectionForm.reset();
      }

      const modalElement = document.getElementById('add_class_section');
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.show();
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

    closeAddModal(): void {
      const modalElement = document.getElementById('add_class_section');
      const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modalInstance.hide();
    }
}
