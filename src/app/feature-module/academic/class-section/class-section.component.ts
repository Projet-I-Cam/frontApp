import { Component, OnInit, Renderer2 } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { globalPost, globalGet, globalPut, globalDelete } from '../../../services/statefull/http';
import { DataService } from '../../../shared/data/data.service';
import {
  pageSelection,
  PaginationService,
  tablePageSize,
} from '../../../shared/custom-pagination/pagination.service';
import { classSectionData, apiResultFormat } from '../../../shared/model/pages.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Validators } from 'ngx-editor';

declare var bootstrap: any;


interface data {
  name: string;
  code: string;
}

@Component({
    selector: 'app-class-section',
    templateUrl: './class-section.component.html',
    styleUrl: './class-section.component.scss',
    standalone: false
})
export class ClassSectionComponent {
  public routes = routes;

  public sectionForm: FormGroup;

  // Table configuration and data
  public tableData: classSectionData[] = [];
  public pageSize = 10;
  public currentPage = 1;
  public mode = 'create';
  public loading: boolean = false;
  public error: string | null = null;
  public searchValue: string = '';
  public currentObjectId: string = '';

  // Table config (for your generic table if needed)
  public tableConfig: any = {
    title: 'Class Section',
    columns: [
      { name: 'name_fr', header: 'Name of section Fr', sortable: true },
      { name: 'name_en', header: 'Name of section En', sortable: true },
      { name: 'slug', header: 'Slug', sortable: false },
      { name: 'createdAt', header: 'Created Date', sortable: true },
    ],
    pageSizeOptions: [10, 25, 50],
    pageSize: this.pageSize,

  };

  constructor(
    private fb: FormBuilder,
  ) {
    this.sectionForm = this.fb.group({
      objectId: [''],
      sectionNameFr: ['', Validators.required],
      sectionNameEn: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Initial data load (page 1)
    this.getTableData(this.currentPage, this.pageSize);


  }

  /**
   * Fetches table data from the server using the globalGet method.
   */
  async getTableData(curentPage: number, size: number, filters?: any, includes?: any): Promise<void> {
    try {
      const res: any = await globalGet({
        T: 'Section',
        filters: filters || {},
        includes: includes || [],
        curentPage: curentPage,
        size: size
      });
      console.log('Fetched data:', res);
      if (!res.error) {
        // Assign a new array reference for change detection.
        this.tableData = res ? [...res] : [];
      } else {
        console.error('Error:', res.message);
      }
    } catch (error) {
      console.error('Error fetching section data:', error);
    }
  }

  /**
   * Handles the form submission using the globalPost method.
   */
  async onSubmit(): Promise<void> {
    if (this.sectionForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      try {
        await globalPost({
          T: 'Section',
          dataObject: {
            name_fr: this.sectionForm.value.sectionNameFr,
            name_en: this.sectionForm.value.sectionNameEn,
          },
        });
        this.sectionForm.reset();
        // Reload page 1 data after successful submission.
        this.getTableData(1, this.pageSize);
        this.closeAddModal();
      } catch (error) {
        console.error('Error during submission:', error);
      }
    }
    else{
      try {
        await globalPut({
          T: 'Section',
          dataObject: {
            name_fr: this.sectionForm.value.sectionNameFr,
            name_en: this.sectionForm.value.sectionNameEn,
          },
          objectId: this.sectionForm.value.objectId
        });
        this.sectionForm.reset();
        // Reload page 1 data after successful submission.
        this.getTableData(1, this.pageSize);
        this.closeAddModal();
      } catch (error) {
        console.error('Error during submission:', error);
      }
    }
  }

  async deleteSection(): Promise<void> {
    try {
      await globalDelete({
        T: 'Section',
       objectId: this.currentObjectId
      });
      // Reload page 1 data after successful deletion.
      this.getTableData(1, this.pageSize);
    } catch (error) {
      console.error('Error during deletion:', error);
    }
  }

  /**
   * Cancels form editing/adding and closes the modal.
   */
  onCancel(): void {
    this.sectionForm.reset();
    this.closeAddModal();
  }

  /**
   * Closes the "add section" modal using Bootstrap's modal API.
   */
  openModal(mode:string, data?:any){
    this.mode = mode;
    if(mode === 'edit'){
      this.sectionForm.patchValue({
        objectId: data.objectId,
        sectionNameFr: data.name_fr,
        sectionNameEn: data.name_en,
      });
    }else{
      this.sectionForm.reset();
    }
    const modalElement = document.getElementById('add_class_section');
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.show();
  }
  openDeleteModal(objectId: string): void {
    const modalElement = document.getElementById('delete-modal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.show();
    this.currentObjectId= objectId;

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
