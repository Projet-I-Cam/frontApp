import { Component, Input } from '@angular/core';
import { globalDelete, globalGet, globalPost } from '../../../../services/statefull/http';
import { AuthService } from '../../../../services/auth.service';
import Parse from 'parse';
import { UtilsService } from '../../../../services/utilis.service';
import { DataService } from '../../../../shared/data/data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';


@Component({
  selector: 'app-parent-modal',
  templateUrl: './parents-modal.component.html',
  styleUrl: './parents-modal.component.scss',
  standalone: false
})
export class ParentsModalComponent {
  @Input() parent: any = {};  
  @Input() mode: any = "new";  
  
 countries: any;
 genders: any[] = [];

  public imagePreview: string | ArrayBuffer | null = null;
  public errorMessage: string | null = null;
  public successMessage: string | null = null;
  submitted: boolean = false;
  maxBirthDate: string = '';


  selectedItem: any;

  filteredItems: any[] = [];

  items: any[] = [];
  students: any[] = [];

  constructor(
    private authService: AuthService,
    private utils: UtilsService,
    private data: DataService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.maxBirthDate = this.utils.getMaxDate(16);
    this.loadCounties();
    this.loadGenders();
    this.loadStudents();
    this.items = [];
    for (let i = 0; i < 10000; i++) {
        this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
    }
  }


  filterItems(event: AutoCompleteCompleteEvent) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.items as any[]).length; i++) {
        let item = (this.items as any[])[i];
        if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(item);
        }
    }

    this.filteredItems = filtered;
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

  private loadStudents(){
    this.data.getStudents().then((apiRes: any) => {
      this.students = apiRes
    })
  }

  private loadCounties(){
    this.data.getCountries().subscribe((apiRes: any) => {
      this.countries = apiRes
      console.log("les pays", apiRes);
    })
  }

  private loadGenders(){
    this.data.getGender().then((apiRes: any) => {
      this.genders = apiRes
    })
  }


  public getSelectedGender() {
    return this.genders.find(gender => gender.objectId === this.parent.gender);
  }

  async save() {
    console.log(0);
    this.submitted = true;
    console.log(this.parent);
    if(this.parent.firstName?.trim() && this.parent.birthDate?.trim() && 
      this.parent.birthPlace?.trim() && this.parent.phone?.trim() && this.parent.email?.trim() && this.parent.gender){
        
        console.log('Form before submitted:', this.parent);
        const gender = this.getSelectedGender();
        const birthDateValue = this.parent.birthDate;
        const birthDate = birthDateValue ? new Date(birthDateValue) : undefined;

        const query = new Parse.Query('Person');
        query.equalTo('email', this.parent.email);
        const existingUsers = await query.find();

        if(this.parent.objectId){ //modification

        }else{ //creation

          try {
            if (existingUsers.length > 0) {

              this.errorMessage = "L'adresse e-mail existe déjà.";
              return;

            }else{

              let userResponse: any = [];
              userResponse = await this.authService.registerUser (
                this.parent.firstName + " " + this.parent.lastName,
                this.parent.email + "0",
                'abc@1234',
                this.parent.email,
                'parent'
              );

              if (!userResponse) {
                console.error("Failed to save user:", userResponse);
                this.errorMessage = userResponse;
                return;
              }else{

                let studentsData : any[] = [];
                this.parent.students.forEach((item : any) => {
                    const student = {
                      __type: 'pointer',
                      className: 'Person',
                      objectId: item.objectId
                    }
                    studentsData.push(student);
                })

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
                  countryCode: this.parent.country.phone,
                  //nationality: this.parent.country.nameFR,
                  email: this.parent.email,
                  birthDate: birthDate,
                  birthPlace: this.parent.birthPlace,
                  photo: this.parent.photo,
                  user: userResponse,
                  //students: studentsData
                };        

                const personResponse: any = await globalPost({ T: 'Person', dataObject: personData });
                
                if(personResponse.error){
                  console.error("Failed to save user:", personResponse.error.message);
                  this.errorMessage = personResponse.error.message;
                }else{
                  this.ngOnInit();
                  this.successMessage = "Parent enregistré avec succès";
                  this.errorMessage = null;
                }               
              }
            }
          } catch (error) {
            console.error("Error checking existing users:", error);
            this.errorMessage = "Une erreur est survenue lors de la vérification des utilisateurs existants.";
            return;
          }          
        } 
    }else{
      this.errorMessage = "Veuillez remplir tous les champs";
    }   
  }


  validateEmail(email: string): boolean {
    return this.utils.emailRegex.test(email);
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}