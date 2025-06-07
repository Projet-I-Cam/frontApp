import { Component, OnInit } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { globalPost, globalGet, globalPut, globalDelete } from '../../../services/statefull/http';
import { Validators } from 'ngx-editor';
import { pageSelection, PaginationService, tablePageSize } from '../../../shared/custom-pagination/pagination.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../../shared/data/data.service';  
import { UtilsService } from '../../../services/utilis.service';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alertService';
import { apiResultFormat } from '../../../shared/model/pages.model';
import { Sort } from '@angular/material/sort';
import { LoginService } from '../../../auth/services/login.service';

declare var bootstrap: any;

@Component({
    selector: 'app-classroom',
    templateUrl: './classroom.component.html',
    styleUrl: './classroom.component.scss',
    standalone: false
})
export class ClassroomComponent implements OnInit {
  load: boolean = true;
  deleteDialog: boolean = false;
  initChecked = false;
  public pageSize = 10;
  public tableData: Array<any> = [];
  public tableDataCopy: Array<any> = [];
  public actualData: Array<any> = [];
  public routes = routes;
  public currentPage = 1;
  public skip = 0;
  public limit: number = this.pageSize;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  public searchDataValue = '';
  dataSource!: MatTableDataSource<any>;

  public selectedYear : any = null;
  public academicYears : any[] = [];
  currentUser : any = {};
  currentPerson : any = {};

  sections : any[] = []; // Liste des différentes sections existantes
  classes : any[] = []; // Liste des différentes sections existantes
  selectedSection : any; // représente la section sélectionné

  teachers : any[] = []; // Représente la liste des enseignants de l'etablissement
  selectedTeacherChief : any; // Représente l'enseignant principal
  selectedTeacherSecond : any; // Représente l'enseignant secondaire

  isSubmited: boolean = false;
  entity: any = {};
  mode = 'create'; // Mode par défaut
  champRequis = '* Veuillez renseignez ce champ';

    toggle() {
      this.entity.isActive = !this.entity.isActive;
    }

   constructor(
     private loginService: LoginService,
     private utils: UtilsService,
     private authService: AuthService,
     private router: Router,
     private pagination: PaginationService,
     private alertService: AlertService,
     private data: DataService
   ) {}
 
   async ngOnInit() {
     this.entity = {};
     this.isSubmited = false;
    /*
     this.currentUser = this.loginService.getUser();
     */
    this.academicYears = await globalGet({T: 'AcademicYear'});
    this.classes = await globalGet({T: 'Classe'});
    this.selectedYear = 'dsiw02koq7'; //await getCurrentAcademicYear(); // A recupérer de façon dynamique
    
    this.load = true;
    this.loadSections();
    this.loadTeachers();
    this.loginService.getPerson().then((p: any) => {
      this.loadData(p);
      this.currentPerson = p
    });
    console.log('this.currentPerson this.currentPerson ', this.currentPerson)
   }

 // Permet de lister les rôles ayant l'accès en modification sur un devoir.
  checkTaskName(taskName: string): boolean {
  const allowedTasks = ['etablissement'];
  return allowedTasks.includes(taskName);
}

 async loadSections() : Promise<void> {
    try { 
        this.sections = await globalGet({
          T: "Section"
        });
        console.log('chargement liste des Sections : ', this.sections);
     } catch (error) {
        this.alertService.showError('Erreur lors du chargement des données');
      }
  }

  async loadTeachers() : Promise<void> {
    try { 
        this.teachers = await globalGet({
          T: "Person",
          filters: {
          }
        });
        console.log('chargement liste des enseignants : ', this.teachers);
     } catch (error) {
        this.alertService.showError('Erreur lors du chargement des données');
      }
  }

  private async loadData(p: any): Promise<void> {
      try {
        console.log('p p p p p ', p)
        const apiRes: apiResultFormat = await this.data.getClassRoomList(p?.institution);
        this.actualData = apiRes.data //?.filter((classe: any) => classe.institution?.objectId === p?.institution?.objectId);
        this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
          if (this.router.url === this.routes.classRoom) {
            this.getTableData({ skip: res.skip, limit: res.limit }, p);
            this.pageSize = res.pageSize;
          }
        });
      } catch (error) {
        this.alertService.showError('Erreur lors du chargement des données');
      }
    }

    getTableData(pageOption: pageSelection, p: any): void {
      this.data.getClassRoomList(p?.institution).then((apiRes: any) => {
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

    public searchData(value: string): void {
      if (value == '') {
        this.tableData = this.tableDataCopy;
      } else {
        this.dataSource.filter = value.trim().toLowerCase();
        this.tableData = this.dataSource.filteredData;
      }
    }
    
    openModal(mode: string, entity?: any): void {
      this.mode = mode;
      this.isSubmited = false;
      if (mode === 'edit' && entity) {
        console.log(' entity check : ', this.entity);

        this.entity = { ...entity}
        this.selectedYear = this.entity.academicYear?.objectId;
        this.selectedSection = this.entity.section?.objectId;
        this.selectedTeacherChief = this.entity.teacherChief?.objectId;
        this.selectedTeacherSecond = this.entity.teacherSecond?.objectId;
        
      } else {
        this.entity = { maxCapacity : 30, isActive : true };
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
        if(!this.entity.name_fr.trim() ){
          this.alertService.showError("Veuilez remplir tous les champs");
          this.isSubmited = false;
          return;
        }
    
        console.log(this.entity, this.mode);
        const data : any =  {
          slug: this.entity.slug,
          name_fr: this.entity.name_fr,
          name_en: this.entity.name_fr,
          maxCapacity: this.entity.maxCapacity,
          isActive: this.entity.isActive,
          
          academicYear : this.selectedYear,
        };
        try {
          if (this.mode === 'create') {
            const classRoom = await globalPost({
              T:'Classroom', 
              dataObject : 
              {
                ... data,

                academicYear: {
                  className : "AcademicYear",
                  objectId : this.selectedYear,
                },
                
                teacherChief : { 
                  className: "Person", 
                  objectId: this.selectedTeacherChief
                },

                teacherSecond : { 
                  className: "Person", 
                  objectId: this.selectedTeacherSecond
                 },

                 classe : { 
                  className: "Classe", 
                  objectId: this.selectedSection
                 },
                 institution: {
                  className: "Institution", 
                  objectId: this.currentPerson?.institution?.objectId
                 }
              }
            });

            console.log(classRoom);
          } else {
            if(!this.entity.objectId){
              this.alertService.showError("Aucun Id spécifié");
              this.isSubmited = false;
              return;
            }
            const classRoom = await globalPut({
              T:'Classroom', 
               dataObject : 
              {
                ... data,

                academicYear: {
                  className : "AcademicYear",
                  objectId : this.selectedYear,
                },
                
                teacherChief : { 
                  className: "Person", 
                  objectId: this.selectedTeacherChief
                },

                teacherSecond : { 
                  className: "Person", 
                  objectId: this.selectedTeacherSecond
                },

                 section : { 
                  className: "Section", 
                  objectId: this.selectedSection
                 },
              },
              
              objectId: this.entity.objectId
            });
          }
          this.alertService.showSuccess();
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
          const classRoom = await globalDelete({T: 'Classroom', objectId: this.entity.objectId});
          console.log(classRoom);
          this.alertService.showSuccess();
          this.isSubmited = false;
          this.ngOnInit();
          this.closeDeleteModal();
        }else{
          this.alertService.showError("Aucune classe sélectionnée");
          this.isSubmited = false;
          return;
        }
      }

      increment() {
        this.entity.maxCapacity++;
      }

      decrement() {
        if (this.entity.maxCapacity > 0) {
          this.entity.maxCapacity--;
        }
      }

  selectYear(yearAcademicId: any): void {
  this.selectedYear = yearAcademicId;
  // Ajoutez ici toute autre logique nécessaire
  console.log('Année sélectionnée:', this.selectedYear);
  }
}