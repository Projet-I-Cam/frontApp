import { Component, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { globalPost, globalGet, globalPut, globalDelete } from './../../../../services/statefull/http'
import { LoginService } from '../../../../auth/services/login.service';
import { Municipality } from '../../../../shared/model/institution.model';


declare var bootstrap: any;

@Component({
  selector: 'app-institutions-list',
  templateUrl: './institutions-list.component.html',
  styleUrls: ['./institutions-list.component.scss'],
  standalone: false
})
export class InstitutionsListComponent implements OnInit {
  public routes = routes;
  public mode = 'create';
  public institutionForm: FormGroup;
  public currentInstitutionId = '';
  public loading: boolean = true;
  public error: string | null = null;
  public searchValue: string = '';
  public pageSize = 10;
  public currentPage = 1;
  public tableData: any[] = [];
  public pageSizeOptions = [10, 25, 50];
  public totalRecords: number = 0;
  public selectedInstitution: any = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {
    this.institutionForm = this.fb.group({
      objectId: [''],
      name: [''],
      registrationNumber: [''],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      await this.getTableData(this.currentPage, null, ['municipality', 'owner']);
    } catch (err) {
      this.error = 'An error occurred while loading data.';
    } finally {
      this.loading = false;
    }
  }

  async getTableData(currentPage: number, filters?: any, includes?: any): Promise<void> {
    var res = null;
    if (this.loginService.isLoggedIn()) {
      const user = this.loginService.getUser();
      const role = user?.role?.task_name || 'admin';
      var person = this.loginService.getPerson();
      if (role === 'administration' || role === 'services_centraux' || role == 'ministre') {
        res = await globalGet({
          T: 'Institution',
          filters: filters || {},
          includes: includes || [],
          curentPage: currentPage,
        });
      }
      else if (role === 'regional') {
        const regionId = ''
        const regionPointer = {
          __type: "Pointer",
          className: "Region",
          objectId: regionId
        };
        // Get institutions where:
        // 1. The institution's municipality's department's region matches our region
        // 2. The institution is active
        res = await globalGet({
          T: "Institution",
          filters: {
            ...filters,
            "municipality.department.region": regionPointer,
            isActive: true
          },
          includes: [
            "municipality",
            "municipality.department",
            "municipality.department.region"
          ],
          selects: [
            "name",
            "address",
            "geoPoint",
            "logo",
            "registrationNumber",
            "phones",
            "municipality.name",
            "municipality.department.name",
            "municipality.department.region.name_fr"
          ],
          size: 2000
        });
      }
      else if (role === 'departemental') {
        const departmentId = ''
        const departmentPointer = {
          __type: "Pointer",
          className: "Department",
          objectId: departmentId
        };
        // Get institutions where:
        // 1. The institution's municipality's  matches our departmen
        // 2. The institution is active
        res = await globalGet({
          T: "Institution",
          filters: {
            ...filters,
            "municipality.department": departmentPointer,
            isActive: true
          },
          includes: [
            "municipality",
            "municipality.department",
            "municipality.department.region"
          ],
          selects: [
            "name",
            "address",
            "geoPoint",
            "logo",
            "registrationNumber",
            "phones",
            "municipality.name",
            "municipality.department.name",
            "municipality.department.region.name_fr"
          ],
          curentPage: currentPage,
        });


      }
      else if (role === 'arrondissement') {
        res = await globalGet({
          T: 'Institution',
          filters: {
            ...filters,
             municipality: {
              className: 'Municipality',
              objectId: person.municipality
            }
          },
          includes: [
            "municipality",
            "municipality.department",
            "municipality.department.region"
          ],
          selects:[
            "name",
            "address",
            "geoPoint",
            "logo",
            "registrationNumber",
            "phones",
            "municipality.name",
            "municipality.department.name",
            "municipality.department.region.name_fr"
          ],
          curentPage: currentPage,
        });
      }


    }


    console.log('Fetched data:', res);

    if (!res.error) {
      this.tableData = res ? [...res] : [];
      this.totalRecords = res.length;
    } else {
      console.error('Error:', res.message);
      throw new Error(res.message);
    }
  }

  onPageChange(event: any): void {
    this.pageSize = event.rows;
    this.currentPage = (event.first / event.rows) + 1;
    this.loadData();
  }

  openModal(mode: string, modalId?: string, data?: any): void {
    this.mode = mode;
    console.log(data);
    switch (mode) {
      case 'view':
        if (data) {
          this.router.navigate(['/peoples/institutions/institution-details', data]);
        } else {
          console.error('No institution ID provided for view');
        }
        break;

      case 'edit':
        if (data) {
          if (modalId) {
            // Open edit modal
            this.institutionForm.patchValue({
              objectId: data.objectId,
              name: data.name,
              registrationNumber: data.registrationNumber,
              isActive: data.isActive
            });
            this.showModal(modalId);
          } else {

            // this.router.navigate([routes.editInstitution, data.objectId]);
          }
        } else {
          console.error('No institution data provided for edit');
        }
        break;

      case 'delete':
        if (data?.objectId) {
          this.currentInstitutionId = data.objectId;
          if (modalId) {
            this.showModal(modalId);
          } else {
            // Direct deletion if no modal (with confirmation)
            this.confirmAndDelete();
          }
        } else {
          console.error('No institution ID provided for deletion');
        }
        break;

      case 'create':
        if (modalId) {
          this.institutionForm.reset();
          this.showModal(modalId);
        } else {
          this.router.navigate(['add-institution']);
        }
        break;

      default:
        console.error(`Unknown mode: ${mode}`);
    }
  }

  private showModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) {
      console.error(`Modal with ID "${modalId}" not found`);
      return;
    }

    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.show();
  }

  private async confirmAndDelete(): Promise<void> {
    if (confirm('Are you sure you want to delete this institution?')) {
      try {
        await globalDelete({
          T: 'Institution',
          objectId: this.currentInstitutionId
        });
        this.loadData();
      } catch (error) {
        console.error('Error during deletion:', error);
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (this.institutionForm.invalid) {
      return;
    }

    try {
      if (this.mode === 'create') {
        await globalPost({
          T: 'Institution',
          dataObject: {
            name: this.institutionForm.value.name,
            registrationNumber: this.institutionForm.value.registrationNumber,
            isActive: this.institutionForm.value.isActive
          }
        });
      } else {
        await globalPut({
          T: 'Institution',
          dataObject: {
            name: this.institutionForm.value.name,
            registrationNumber: this.institutionForm.value.registrationNumber,
            isActive: this.institutionForm.value.isActive
          },
          objectId: this.institutionForm.value.objectId
        });
      }

      this.institutionForm.reset();
      this.loadData();
      this.closeModal('add_institution');
    } catch (error) {
      console.error('Error during submission:', error);
    }
  }

  async deleteInstitution(): Promise<void> {
    try {
      await globalDelete({
        T: 'Institution',
        objectId: this.currentInstitutionId
      });
      this.loadData();
      this.closeModal('delete_modal');
    } catch (error) {
      console.error('Error during deletion:', error);
    }
  }

  closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) return;

    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }

  addInstitution(): void {
    this.mode = 'create';
    this.institutionForm.reset();
    this.openModal('create', 'add_institution');
  }

  viewDetails(id: string): void {
    const institution = this.tableData.find(i => i.objectId === id);
    if (institution) {
      this.selectedInstitution = institution;
      this.openModal('view', 'view_details');
    }
  }

  editInstitution(id: string): void {
    const institution = this.tableData.find(i => i.objectId === id);
    if (institution) {
      this.mode = 'edit';
      this.openModal('edit', 'add_institution', institution);
    }
  }
}
