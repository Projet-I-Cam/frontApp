import { Component } from '@angular/core';

import {
  apiResultFormat,
  parentList,
} from '../../../../shared/model/pages.model';
import { routes } from '../../../../shared/routes/routes';
import {
  pageSelection,
  PaginationService,
  tablePageSize,
} from '../../../../shared/custom-pagination/pagination.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../../shared/data/data.service';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { UtilsService } from '../../../../services/utilis.service';
import { NgForm } from '@angular/forms';
import { globalDelete, globalGet, globalPost } from '../../../../services/statefull/http';
import { AuthService } from '../../../../services/auth.service';
import Parse from 'parse';
import { filter } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from '../../../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParentsModalComponent } from '../Modals/Parents-modal.component';



@Component({
    selector: 'app-parents-list',
    templateUrl: './parents-list.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrl: './parents-list.component.scss',
    standalone: false
})
export class ParentsListComponent {
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
  dataSource!: MatTableDataSource<parentList>;
  public searchDataValue = '';

  parent: any = {};
  titlePage = "Liste des parents"




  constructor(
    private data: DataService,
    private utils: UtilsService,
    private authService: AuthService,
    private router: Router,
    private pagination: PaginationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal
  ) {}

    ngOnInit(): void {
      this.load=true;
      this.loadParentList();
    }


    //ouverture du modal pour ajouter un élément
    openNew(){
      this.parent = {};
      this.mode = "new";
      const modalRef = this.modalService.open(ParentsModalComponent);
      modalRef.componentInstance.parentData = this.parent;
      modalRef.componentInstance.mode = this.mode;
    }

    //ouvrir le modal pour modifier un élément

    editData(item: any){
      this.parent = { ...item};
      this.mode = "edit";
      const modalRef = this.modalService.open(ParentsModalComponent);
      modalRef.componentInstance.parentData = this.parent;
      modalRef.componentInstance.mode = this.mode;
    }

    //ouvrir le modal de suppression d'un élément
    deleteData(item: any){
      this.deleteDialog = true;
      this.parent = { ...item };
    }

    //confirmation de suppression
    async confirmDelete(){
      this.deleteDialog = false;
      //script de supression
      const result = await globalDelete({T: 'Parent', objectId: this.parent.objectId})
      .then(() =>{
          this.ngOnInit();
        }

      ).catch((error) => {
        console.log(error.message)
      })
    }


    onFileSelected2(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];  
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
          return;
        }
  
        // Validate file size (4MB = 4 * 1024 * 1024 bytes)
        const maxSize = 4 * 1024 * 1024; // 4MB
        if (file.size > maxSize) {
          return;
        }
  
        // If validation passes, read the file
        const reader = new FileReader();
        reader.onload = (e) => {
        };
        reader.readAsDataURL(file);
      }
    }

    private async loadParentList(): Promise<void> {
      try {
        const apiRes: apiResultFormat = await this.data.getParentList();
        this.actualData = apiRes.data;
        this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
          if (this.router.url === this.routes.parentList) {
            this.getTableData({ skip: res.skip, limit: res.limit });
            this.pageSize = res.pageSize;
          }
        });
      } catch (error) {
        console.error('Erreur lors du chargement de la liste des parents', error);
      }
    }




    


  private getTableData2(pageOption: pageSelection): void {

    this.data.getParentList().then((apiRes: any) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: any, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          const newParentList: parentList = {
            objectId: res.objectId,
            sNo: serialNumber, // Numéro de série
            isSelected: false, // Valeur par défaut, vous pouvez la modifier selon vos besoins
            Addedon: new Date().toISOString(), // Date d'ajout, vous pouvez la modifier selon vos besoins
            p: res.person.firstName+' '+res.person.lastName,
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.firstName,
            phone: res.phone,
            photo: res.photo,
            birthDate: res.birthDate,
            birthPlace: res.birthPlace,
            gender: res.gender
          };  
          this.actualData.push(newParentList);
          this.tableData.push(newParentList);
          this.tableDataCopy.push(newParentList);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<parentList>(this.actualData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

    private getTableData(pageOption: pageSelection): void {
      this.data.getParentList().then((apiRes: any) => {
        this.load = false;
        this.tableData = [];
        this.tableDataCopy = [];
        this.serialNumberArray = [];
        this.totalData = apiRes.totalData;
        apiRes.data.map((res: parentList, index: number) => {
          const serialNumber = index + 1;
          if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
            res.id = serialNumber;
            res.Addedon = res.cratedAt ? res.cratedAt.toISOString() : undefined;
            this.tableData.push(res);
            this.serialNumberArray.push(serialNumber);
            this.tableDataCopy.push(res);
          }

        });
        this.dataSource = new MatTableDataSource<parentList>(this.actualData);
        this.pagination.calculatePageSize.next({
          totalData: this.totalData,
          pageSize: this.pageSize,
          tableData: this.tableData,
          tableDataCopy: this.tableDataCopy,
          serialNumberArray: this.serialNumberArray,
        });
      });
    }

  public searchData(value: string): void {
    if (value == '') {
      this.tableData = this.tableDataCopy;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.tableData = this.dataSource.filteredData;
    }
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


  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }

  showDeleteForm : boolean = false;

  


  viewParent(item: any){
    // this.deleteDialog = true;
    this.parent = { ...item };
  }

  showDelete(parent: any){
    this.showDeleteForm = true;
    this.parent = parent;

  }

}
