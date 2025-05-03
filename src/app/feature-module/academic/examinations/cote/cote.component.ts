import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { routes } from '../../../../shared/routes/routes';
import { pageSelection, PaginationService, tablePageSize } from '../../../../shared/custom-pagination/pagination.service';
import { DataService } from '../../../../shared/data/data.service';
import { UtilsService } from '../../../../services/utilis.service';
import { AuthService } from '../../../../services/auth.service';
import { AlertService } from '../../../../services/alertService';
import { apiResultFormat } from '../../../../shared/model/pages.model';
import { globalDelete, globalPost, globalPut } from '../../../../services/statefull/http';

declare var bootstrap: any;

@Component({
  selector: 'app-cote',
  templateUrl: './cote.component.html',
  styleUrl: './cote.component.scss',
  standalone: false
})
export class CoteComponent implements OnInit{

  load: boolean = true;
  deleteDialog: boolean = false;
  initChecked = false;
  public pageSize = 10;
  public tableData: Array<any> = [];
  public tableDataCopy: Array<any> = [];
  public actualData: Array<any> = [];
  public routes = routes;
  public currentPage = 1;
  mode = 'create'; // Mode par défaut
  public skip = 0;
  public limit: number = this.pageSize;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  public searchDataValue = '';
  dataSource!: MatTableDataSource<any>;
  isSubmited: boolean = false;
  
  smileys: any[] = [];
  entity: any = {};
  titlePage = "Liste des côtes"

  formatLabel(value: number): string {
    return value + '%'; // Ajoute un pourcentage à la valeur
  }

  smileys2 = [
    { icone: '😊', appreciation_fr: '😊' },
    { icone: '😐', appreciation_fr: '😐' },
    { icone: '😞', appreciation_fr: '😞' }
  ];

  values = [
    {'label': 'Actif', value: true},
    {'label': 'Inactif', value: false}
  ];

  bornes = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  filteredBornes: number[] = [...this.bornes];

  constructor(
    private data: DataService,
    private utils: UtilsService,
    private authService: AuthService,
    private router: Router,
    private pagination: PaginationService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.load=true;
    this.loadData();
    this.entity = {}
    this.isSubmited = false;
   this.loadSmileys();
  }


  onMinPointChange(selectedMin: number) {
    this.entity.maxPointIntervalle = null;
    this.filteredBornes = this.bornes.filter(borne => borne > selectedMin);
  }

  private loadSmileys(){
    this.data.getSmileys().subscribe((apiRes: any) => {
      this.smileys = apiRes
    })
  }




  private async loadData(): Promise<void> {
      try {
        const apiRes: apiResultFormat = await this.data.getCoteList();
        this.actualData = apiRes.data;
        this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
          if (this.router.url === this.routes.coteList) {
            this.getTableData({ skip: res.skip, limit: res.limit });
            this.pageSize = res.pageSize;
          }
        });
      } catch (error) {
        this.alertService.showError('Erreur lors du chargement des données');
      }
    }

  

  getTableData(pageOption: pageSelection): void {
    this.data.getCoteList().then((apiRes: any) => {
      this.load = false;
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: any, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          res.Addedon = this.utils.getDate(res.createdAt);
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
          this.tableDataCopy.push(res);
        }
      });
      this.dataSource = new MatTableDataSource<any>(this.actualData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }


  public sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];

        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    if (value == '') {
      this.tableData = this.tableDataCopy;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.tableData = this.dataSource.filteredData;
    }
  }


  public changePageSize(pageSize: number): void {
    this.pageSelection = [];
    this.limit = pageSize;
    this.skip = 0;
    this.currentPage = 1;
    // this.getTableData();
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }

  openModal(mode: string, entity?: any): void {
    this.mode = mode;
    this.isSubmited = false;
    if (mode === 'edit' && entity) {
      this.entity = { ...entity}
    } else {
      this.entity = {};
    }
    const modalElement = document.getElementById('add-edit-modal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.show();
  }

  openDeleteModal(entity: any){
    this.entity = { ...entity}
    const modalElement = document.getElementById('delete-modal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.show();
  }

  closeDeleteModal(){
    const modalElement = document.getElementById('delete-modal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.hide();
    this.entity = {};
  }

  closeAddEditModal() {
    const modalElement = document.getElementById('add-edit-modal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.hide();
    this.entity = {};
  }


   async save(): Promise<void> {
    this.isSubmited = true;
    if (!this.entity.icone || 
      !this.entity.slug?.trim() || 
      !this.entity.defaultAppreciation_fr?.trim() || 
      !this.entity.defaultAppreciation_en?.trim() || 
      this.entity.minPointIntervalle == null || 
      this.entity.maxPointIntervalle == null ||
      this.entity.status == null) { 
    this.alertService.showError("Veuillez remplir tous les champs");
    console.log(this.entity, this.mode);
    this.isSubmited = false;
    return;
  }
  

    console.log(this.entity, this.mode);
    try {
      if (this.mode === 'create') {
        const result = await globalPost({
          T: 'Cote',
          dataObject: {
            icone: this.entity.icone,
            slug: this.entity.slug,
            defaultAppreciation_fr: this.entity.defaultAppreciation_fr,
            defaultAppreciation_en: this.entity.defaultAppreciation_en,
            minPointIntervalle: this.entity.minPointIntervalle,
            maxPointIntervalle: this.entity.maxPointIntervalle,
            status: this.entity.status
          },
        });
      } else {
        if(!this.entity.objectId){
          this.alertService.showError("Aucun Id spécifié");
          this.isSubmited = false;
          return;
        }
        const result = await globalPut({
          T: 'Cote',
          dataObject: {
            icone: this.entity.icone,
            slug: this.entity.slug,
            defaultAppreciation_fr: this.entity.defaultAppreciation_fr,
            defaultAppreciation_en: this.entity.defaultAppreciation_en,
            minPointIntervalle: this.entity.minPointIntervalle,
            maxPointIntervalle: this.entity.maxPointIntervalle,
            status: this.entity.status
          },
          objectId: this.entity.objectId
        });
      }
      this.alertService.showSuccess()
      this.ngOnInit();
      this.closeAddEditModal();
      this.isSubmited = false;
    } catch (error: unknown) {
      this.isSubmited = false;
      if (error instanceof Error) {
        this.alertService.showError(error.message);
      } else {
        this.alertService.showError("Une erreur inconnue est survenue pendant l'opération");
      }          
    }    
  }

  async delete(){
    this.isSubmited = true;
    if(this.entity && this.entity.objectId){
      const result = await globalDelete({T: 'Cote', objectId: this.entity.objectId});
      this.alertService.showSuccess();
      this.isSubmited = false;
      this.ngOnInit();
      this.closeDeleteModal();
    }else{
      this.alertService.showError("Aucune année académique sélectionnée");
      this.isSubmited = false;
      return;
    }
  }
  
}


