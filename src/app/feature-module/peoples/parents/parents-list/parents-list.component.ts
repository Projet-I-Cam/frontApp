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


interface City {
  name: string;
  code: string;
}
interface City2 {
  name: string;
  code: string;
}

@Component({
    selector: 'app-parents-list',
    templateUrl: './parents-list.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrl: './parents-list.component.scss',
    standalone: false
})
export class ParentsListComponent {
  load: boolean = true;
  formDialog: boolean = false;
  deleteDialog: boolean = false;
  submitted: boolean = false;

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
  cities!: City[];
  cities2!: City2[];

  selectedCities1!: City[];
  selectedCities2!: City2[];

  parent: any = {};
  titlePage = "Liste des parents"

  maxBirthDate: string = '';
  countryCodes: any = [];
  public imagePreview: string | ArrayBuffer | null = null;
  public errorMessage: string | null = null;
  public successMessage: string | null = null;
  public genders: any[] = [];



  constructor(
    private data: DataService,
    private utils: UtilsService,
    private authService: AuthService,
    private router: Router,
    private pagination: PaginationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

    ngOnInit(): void {

      this.load=true;
      this.loadGenders();
      this.initializeCities();
      this.loadParentList();
      this.maxBirthDate = this.utils.getMaxDate(16);
      this.countryCodes = this.utils.countryCodes;
      this.errorMessage = null;
      this.successMessage = null;

      setTimeout(() => {
        this.parent = [/* Actual article data */];
      }, 2000); 

    }



    //ouverture du modal pour ajouter un élément
    openNew(){
      this.load=true;

      this.submitted = false;
      this.formDialog = true;
    }

    //ouvrir le modal pour modifier un élément

    editData(item: any){
        this.parent = { ...item };
        this.formDialog = true;
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
          this.showSuccess("Parent enrégistré");
          this.tableData = this.tableData.filter(val => val.parent.objectId != this.parent.objectId);
        }

      ).catch((error) => {
        this.showError(error.message)
      })
    }

    hideDialog() {
      this.formDialog = false;
      this.submitted = false;
    }

    public validateEmail(email: string): boolean {
      return this.utils.emailRegex.test(email);
    }

    onFileSelected2(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
  
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
          this.errorMessage = 'Format de fichier non valide. Veuillez télécharger un fichier JPG, PNG ou SVG.';
          this.showError('Format de fichier non valide. Veuillez télécharger un fichier JPG, PNG ou SVG.');
          this.imagePreview = null; // Clear the preview
          return;
        }
  
        // Validate file size (4MB = 4 * 1024 * 1024 bytes)
        const maxSize = 4 * 1024 * 1024; // 4MB
        if (file.size > maxSize) {
          this.errorMessage = 'La taille du fichier ne doit pas dépasser 4 Mo.';
          this.showError('La taille du fichier ne doit pas dépasser 4 Mo.');
          this.imagePreview = null; // Clear the preview
          return;
        }
  
        // If validation passes, read the file
        this.errorMessage = null; // Clear any previous error messages
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target?.result ?? null; // Set the image preview
        };
        reader.readAsDataURL(file);
      }
    }
    onFileSelected(event: Event): void {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string; // Prévisualisation de l'image
        };
        reader.readAsDataURL(file);
        this.parent.photo = file; // Stocker le fichier dans l'objet parent
      }
    }
    removeImage(): void {
      this.imagePreview = null; // Clear the image preview
      const input = document.querySelector('.image-sign') as HTMLInputElement;
      if (input) {
        input.value = ''; // Clear the file input
      }
    }
   
    private loadGenders(){
      this.data.getGender().then((apiRes: any) => {
        this.genders = apiRes;
      });
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
        this.showError('Erreur lors du chargement de la liste des parents');
      }
    }

    private initializeCities(): void {
      this.cities = [
        { name: 'Janet', code: 'Janet' },
        { name: 'Joann', code: 'Joann' },
        { name: 'Kathleen', code: 'Kathleen' },
        { name: 'Gifford', code: 'Gifford' },
      ];
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
          console.log(res.id, res);

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



  public getSelectedGender() {
    return this.genders.find(gender => gender.objectId === this.parent.gender);
  }

  public async onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form before submitted:', this.parent);
      this.showError("debut");
      const gender = this.getSelectedGender();
      const birthDateValue = this.parent.birthDate;
      const birthDate = birthDateValue ? new Date(birthDateValue) : undefined;
  
      // Check if the phone number or email already exists
      const query = new Parse.Query('Person');
      query.equalTo('email', this.parent.email);
  
      try {
        const existingUsers = await query.find();
        console.log(existingUsers);
        if (existingUsers.length > 0) {
          this.errorMessage = "L'adresse e-mail existe déjà.";
          return;
        }
      } catch (error) {
        console.error("Error checking existing users:", error);
        this.errorMessage = "Une erreur est survenue lors de la vérification des utilisateurs existants.";
        return;
      }
  
      // Save user for person
      let userResponse: any = [];
      try {
        userResponse = await this.authService.registerUser (
          this.parent.firstName + " " + this.parent.lastName,
          this.parent.email + "0",
          'abc@1234',
          this.parent.email,
          'parent'
        );
        console.log("User  registered successfully:", userResponse);
      } catch (error) {
        if (error instanceof Error) {
          this.errorMessage = error.message;
          console.error(error);
        } else {
          this.errorMessage = "An unknown error occurred during person registration.";
          console.error("An unknown error occurred during person registration.");
        }
      }
  
      if (!userResponse) {
        console.error("Failed to save user:", userResponse);
        this.errorMessage = userResponse;
        return;
      }
      console.log(userResponse);
  
      // Save person for parent
      const personData: any = {
        isParent: true,
        isStudent: false,
        lastName: this.parent.lastName,
        firstName: this.parent.firstName,
        gender: {
          className: "Gender",
          objectId: gender.objectId
        },
        phone: this.parent.phone,
        countryCode: this.parent.countryCode,
        email: this.parent.email,
        birthDate: birthDate,
        birthPlace: this.parent.birthPlace,
        photo: this.parent.photo,
        user: userResponse
      };
  
      const personResponse: any = await globalPost({ T: 'Person', dataObject: personData });
      if (personResponse.error) {
        this.errorMessage = personResponse.message;
        return;
      }
  
      this.successMessage = "Parent enregistré avec succès";
      this.errorMessage = null;
      form.reset();
    } else {
      console.log('Form is invalid');
    }
  }


  public resetForm(form: NgForm): void {
    form.reset();
    this.parent = {};
  }



  closeModal() {
    const modalElement = document.getElementById('add_parent');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }
  }

  showSuccess(message : string){
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: message, life: 5000 });
  }

  showError(message : string){
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: message, life: 5000 });
  }


  viewParent(item: any){
    // this.deleteDialog = true;
    this.parent = { ...item };
  }

}
