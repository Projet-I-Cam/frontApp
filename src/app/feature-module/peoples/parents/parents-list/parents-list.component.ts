import { Component } from '@angular/core';

import {
  apiResultFormat,
  Parent,
  parentList,
  Person,
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
import { globalGet, globalPost } from '../../../../services/statefull/http';
import { AuthService } from '../../../../services/auth.service';
import Parse from 'parse';


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
    styleUrl: './parents-list.component.scss',
    standalone: false
})
export class ParentsListComponent {
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

  parent: Parent = {
    objectId: '',
    person: {
      'objectId': '',
      'firstName': '',
      'lastName': '',
      'gender': undefined,
      'phone': '',
      'email': "",
      'birthDate': undefined,
      'birthPlace': '',
      'GuardianImage': '',
      'image': '',
      'countryCode': '',
      'cratedAt': undefined,
    },
    students: []
  };

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
  ) {}

    ngOnInit(): void {
      this.loadGenders();
      this.initializeCities();
      this.loadParentList();
      this.maxBirthDate = this.utils.getMaxDate(16);
      this.countryCodes = this.utils.countryCodes;
      this.errorMessage = null;
      this.successMessage = null;
    }

    public validateEmail(email: string): boolean {
      return this.utils.emailRegex.test(email);
    }

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
  
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
          this.errorMessage = 'Format de fichier non valide. Veuillez télécharger un fichier JPG, PNG ou SVG.';
          this.imagePreview = null; // Clear the preview
          return;
        }
  
        // Validate file size (4MB = 4 * 1024 * 1024 bytes)
        const maxSize = 4 * 1024 * 1024; // 4MB
        if (file.size > maxSize) {
          this.errorMessage = 'La taille du fichier ne doit pas dépasser 4 Mo.';
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

  private getTableData3(pageOption: pageSelection): void {
    this.data.getParentList().then((apiRes: any) => {
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: any, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.tableDataCopy.push(res);
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
      this.tableData = [];
      this.tableDataCopy = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: any, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          const newParentList: parentList = {
            sNo: serialNumber, // Numéro de série
            isSelected: false, // Valeur par défaut, vous pouvez la modifier selon vos besoins
            Addedon: new Date().toISOString(), // Date d'ajout, vous pouvez la modifier selon vos besoins
            p: res.person.firstName+' '+res.person.lastName,
            parent: res
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

  private async getTableData2(pageOption: pageSelection): Promise<void> {
    try {
      const apiRes = await this.data.getParentList();
      
      // Assurez-vous que apiRes.data est un tableau d'objets Parent
      if (Array.isArray(apiRes.data)) {
        const parentListData: parentList[] = []; // Initialisation du tableau parentList
  
        apiRes.data.forEach((res: Parent, index: number) => {
          const serialNumber = index + 1;
          if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
            // Créer un nouvel objet parentList à partir de l'objet Parent
            const newParentList: parentList = {
              sNo: serialNumber, // Numéro de série
              isSelected: false, // Valeur par défaut, vous pouvez la modifier selon vos besoins
              Addedon: new Date().toISOString(), // Date d'ajout, vous pouvez la modifier selon vos besoins
              p: res.person.firstName+' '+res.person.lastName,
              parent: res
            };
  
            parentListData.push(newParentList); // Ajouter le nouvel objet parentList au tableau
          }
        });
        console.log("les données", parentListData);
        this.dataSource = new MatTableDataSource<parentList>(parentListData); // Passer le tableau à MatTableDataSource
        this.pagination.calculatePageSize.next({
          totalData: apiRes.totalData,
          pageSize: this.pageSize,
          tableData: parentListData, // Utiliser le tableau parentList
          serialNumberArray: parentListData.map(p => p.sNo), // Créer un tableau de numéros de série
        });
      } else {
        console.error('Les données de l\'API ne sont pas un tableau', apiRes.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données des parents', error);
    }
  }
  public searchData2(value: string): void {
    if (value == '') {
      this.tableData = this.tableDataCopy;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.tableData = this.dataSource.filteredData;
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.tableData = this.dataSource.filteredData;
  }

  public sortData2(sort: Sort) {
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

  public sortData(sort: Sort): void {
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
  public changePageSize2(pageSize: number): void {
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

  public changePageSize(pageSize: number): void {
    this.pageSelection = [];
    this.limit = pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }

  selectAll2(initChecked: boolean) {
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

  selectAll(initChecked: boolean): void {
    this.tableData.forEach((f) => {
      f.isSelected = !initChecked;
    });
  }

  public getSelectedGender() {
    return this.genders.find(gender => gender.objectId === this.parent.person.gender);
  }

  public async onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form bifore submitted:', this.parent);
      const gender = this.getSelectedGender();
      const birthDateValue = this.parent.person.birthDate;
      const birthDate = new Date(birthDateValue + 'T00:49:07.665Z');

      //save user for person
      let userResponse: any = [];
      try {
        userResponse = await this.authService.registerUser (
          this.parent.person.firstName + " " + this.parent.person.lastName,
          this.parent.person.email + "0",
          'abc@1234',
          this.parent.person.email,
          'parent'
        );
        console.log("User  registered successfully:", userResponse);
      } catch (error) {
        if (error instanceof Error) {
          this.errorMessage = error.message;
          console.error(error);
        } else {
          this.errorMessage = "An unknown error occurred during peson registration.";
          console.error("An unknown error occurred during peson registration."); 
        }
      }

      if (!userResponse) {
        console.error("Failed to save user:", userResponse);
        this.errorMessage = userResponse;
        return;
      }
      //save person for parent
      console.log(userResponse?.id);
      const personData: any = {
        lastName: this.parent.person.lastName,
        firstName: this.parent.person.firstName,
        gender: {
          className: "Gender",
          objectId: gender?.objectId 
        },
        phones: [this.parent.person.countryCode+this.parent.person.phone],
        emails: [this.parent.person.email],
        birthDate: birthDate,
        birthPlace: this.parent.person.birthPlace,
//        image: "",
//        countryCode: this.parent.person.countryCode,
        user: {
          className: '_User',
          objectId: userResponse?.id
        }
      };

      console.log(personData);
      const personResponse : any = await globalPost({T: 'Person', dataObject: personData});
      if(personData.error){
        console.error("Failed to save person:", personResponse.message);
        this.errorMessage = personResponse.message;
        return;
      }
      const students : any[] = [];
      this.parent.students?.forEach(item => {
        students.push({
          __type: "Pointer",
          className: 'Student', 
          objectId: item
        })
      })
      //save parent
      const parentData: any = {
        person: {
          __type: "Pointer",
          className: 'Person',
          objectId: personResponse?.id
        },
        students: students        
      }
      const parentResponse = await globalPost({T: 'Parent', dataObject: parentData});

      if(parentResponse.error){
        console.error("Failed to save Parent:", parentResponse.message);
        this.errorMessage = parentResponse.message
        return;
      }else{
        this.successMessage = "Parent enrégistré avec succès";
       // this.ngOnInit();
      }      
    } else {
      console.log('Form is invalid');
    }
  }

  public editParent(selectedParent: Parent): void {
    this.parent = { ...selectedParent }; // Remplir le formulaire avec les données du parent sélectionné
    this.mode = 'edit'; // Changer le mode à 'edit'
  }

  public resetForm(): void {
    this.parent = {
      objectId: '',
      person: {
        'objectId': '',
        'firstName': '',
        'lastName': '',
        'gender': undefined,
        'phone': '',
        'email': '',
        'birthDate': undefined,
        'birthPlace': '',
        'GuardianImage': '',
        'image': '',
        'countryCode': '',
        'cratedAt': undefined,
      },
      students: []
    }
  }



  closeModal() {
    const modalElement = document.getElementById('add_parent');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
    }
  }

  openModal() {
    const modalElement = document.getElementById('add_parent');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
    }
  }

}
