import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { UtilsService } from '../../../../services/utilis.service';
import { DataService } from '../../../../shared/data/data.service';
import { globalGet, globalPost } from '../../../../services/statefull/http';
import Parse from 'parse';


@Component({
    selector: 'app-add-staff',
    templateUrl: './add-staff.component.html',
    styleUrl: './add-staff.component.scss',
    standalone: false
})
export class AddStaffComponent {
  public routes = routes;
  public staffForm: FormGroup;
  sexes: any = [];
  institution: any = null;
  person: any = null;
  submitting: any = false;
  errorMessage: any = null;
  countries: any = [];
  classrooms: any = [];
  filteredMunicipality: any = [];
  loadingMunicipality: any = false;
  maritalStatuses: any = [];
  values: string[] = ['English', 'Spanish'];
  constructor
  (
    private router: Router,
    private fb: FormBuilder,
    private data: DataService,
  ) {
    UtilsService.getGender().then(sexes => {
      this.sexes = sexes?.map((sex: any) => {
        return {
          label: sex?.get('libelle_fr'),
          value: sex?._getId()
        }
      })
    })
    UtilsService.getMaritalStatus().then(statuses => {
      this.maritalStatuses = statuses?.map((sex: any) => {
        return {
          label: sex?.get('libelle_fr'),
          value: sex?._getId()
        }
      })
    })
    this.loadCounties()
    this.staffForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthPlace: ['', [Validators.required]],
      birthDate: [null, [Validators.required]],
      gender: ['', [Validators.required]],
      photo: [null],
      mutationActRef: [''],
      maritalStatus: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      municipality: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      classroom: ['', [Validators.required]],
      profesionalBackground: this.fb.group({
        status: ['', [Validators.required]],
        registrationNumber: ['', [Validators.required]],
        NIU: [''],
        grade: ['', [Validators.required]],
        currentPosition: ['', [Validators.required]],
        refActeIntegration: [null],
        nominationActRef: [null],
        startDate: [null],
        fpStartDate: [null],
      }),
    });

    const user = Parse.User.current()
    const datax = {
      T: "Person",
      isOne: true,
      filters: {
        user: {className: "_User", objectId: user?._getId()}
      },
      includes: ['institution']
    }

    globalGet(datax).then(v =>{
      console.log('GLOBAL GET 1Z ', v)
      this.institution = v?.institution
      this.person = v
      globalGet({
        T: "Classroom",
        filters: {
          institution: {className: "Institution", objectId: v?.institution?.objectId},
        },
        includes: ['classe', 'classe.section']
      }).then(v =>{
        console.log('classrooms classrooms classrooms classrooms ', v)
        this.classrooms = v?.map((classroom: any) => ({
          label: `${classroom.name_fr}`,
          value: classroom.objectId
        }))
      })
    })
  }

  ngOnInit(): void {
    
  }

  get profesionalBackground() {
    return this.staffForm.get('profesionalBackground') as FormGroup;
  }

  private loadCounties() {
    this.data.getCountries().subscribe((apiRes: any) => {
      this.countries = apiRes
    })
  }
  
  async searchMun(event: any) {
    const query = event.filter;
    if (query?.length < 2) {
      this.filteredMunicipality = [];
      return;
    }
    this.loadingMunicipality = true;
    console.log('query query ', query)
    const resp = await UtilsService.searchMunicipalityByKeyword(query.toLowerCase())
    console.log('RESP ', resp)
    this.filteredMunicipality = resp
    this.loadingMunicipality = false;
  }
  async onSubmit(): Promise<any> {
    console.log('this.staffForm this.staffFormthis.staffForm ', this.staffForm.value)
    if (this.staffForm.valid) {
      console.log('FORM is valid ==== ')
      const data = this.staffForm.value
      const { profesionalBackground, classroom } = data
      delete data.profesionalBackground
      delete data.classroom
      this.submitting = true;
      this.errorMessage = null;
 
      const dataRole = await Parse.Cloud.run('getRole', {task_name: "enseignant"})

      const usr = new Parse.User();
      usr.set("role", {"__type": "Pointer", "className": "_Role" , "objectId": dataRole?.role?.objectId});
      usr.set("username", data.phone);
      usr.set("password", data.phone);
      const user = await usr.signUp()
      
      const backgroud = await globalPost({
        T: "ProfesionalBackground",
        dataObject: {
          ...profesionalBackground
        }
      })
      console.log('backgroud backgroud backgroud ', backgroud)
      console.log('user user user ', user)
      const dataPoster = {
        ...data,
        isStaff: true,
        gender: {"__type": "Pointer", "className": "Gender" , "objectId": data.gender},
        maritalStatus: {"__type": "Pointer", "className": "MaritalStatus" , "objectId": data.maritalStatus},
        municipality: {"__type": "Pointer", "className": "Municipality" , "objectId": data.municipality},
        classroom: {"__type": "Pointer", "className": "Classroom" , "objectId": classroom},
        institution: {"__type": "Pointer", "className": "Institution" , "objectId": this.institution?.objectId},
        profesionalBackground: {"__type": "Pointer", "className": "ProfesionalBackground" , "objectId": backgroud?.id},
        user: {"__type": "Pointer", "className": "_User" , "objectId": user.id},
        countryCode: data.countryCode?.code,
      }
      console.log('dataPoster dataPoster dataPoster ', dataPoster)
      const person = await globalPost({
        T: "Person",
        dataObject: dataPoster
      })

      console.log('person person person ', person)
      
      this.router.navigate([routes.staffList]);
    }else{
      this.markFormGroupTouched(this.staffForm);
      this.errorMessage = 'Veuillez remplir correctement tous les champs obligatoires.';
    }
    // this.router.navigate([routes.invoice]);
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }else if (control instanceof FormArray) {
        control.controls.forEach((ctrl) => {
          ctrl.markAsTouched(); // Marquer chaque contrôle dans le FormArray comme touché
          if (ctrl instanceof FormGroup) {
            this.markFormGroupTouched(ctrl); // Appel récursif pour les FormGroup dans le FormArray
          }
        });
      }
    });
  }

  public onFileSelect(event: any, key?: string) {
    console.log('Changed')
    const file: File = event.target.files[0];
    if (file) {
      if(key){
        this.profesionalBackground.patchValue({[key]: file})
      }else{
        this.staffForm.patchValue({
          photo: file
        });
      }
    }
  }
}
