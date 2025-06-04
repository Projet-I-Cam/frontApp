import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl  } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Parse from 'parse'; // Ensure Parse is imported properly

import { CommonService } from '../../../shared/common/common.service';
import { routes } from '../../../shared/routes/routes';
import { getPersonByUserId } from '../../../services/statefull/genericParse';
import { globalGet, globalPost, globalPut } from '../../../services/statefull/http';

@Component({
    selector: 'app-general-settings',
    templateUrl: './general-settings.component.html',
    styleUrl: './general-settings.component.scss',
    standalone: false
})
export class GeneralSettingsComponent implements OnInit {
  public routes = routes;
  public institutionForm: FormGroup;
  public submitting = false;
  public loading = false;
  public errorMessage: string | null = null; 
  public loadingDrop = false;
  public pageTitle = 'Add Institution';
  base = '';
  page = '';
  last = '';
  institution: any = null;
  person: any = null;
  options: any = [];

  constructor(
    private common: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.page.subscribe((res: string) => {
      this.last = res;
    });
    this.institutionForm = this.fb.group({
      registrationNumber: ['', [Validators.required]],
      teachOrder: ['', [Validators.required]],
      isInstitutionLaique: ['', [Validators.required]],
      religiousGroup: ['', [Validators.required]],
      teachingGroup: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      isPublicInstituion: ['public'],
      description: [''],
      sections: this.fb.array([]),
      logo: [null],
      photo: [null],
      emails: [''],
      poBox: [''],
      phones: [''],
    });
    globalGet({
      T: "Section",
      filters: {}
    }).then(sections => {
      console.log('sections sections sections ', sections)
      this.options = sections?.map((sect: any) =>({value: sect?.objectId, label: sect?.name_fr}))
      this.institutionForm.patchValue({
        sections: sections.map(() => false),
      });
    })
    
  }

  isChecked(optionId: number): boolean {
  return this.selectedOptionsArray.value.includes(optionId);
}

// Gère les changements de checkbox
onCheckboxChange(event: any, option: any) {
  const selectedOptionsArray = this.selectedOptionsArray;
  
  if (event.target.checked) {
    selectedOptionsArray.push(new FormControl(option.value));
  } else {
    const index = selectedOptionsArray.controls
      .findIndex(x => x.value === option.value);
    selectedOptionsArray.removeAt(index);
  }
}

    get selectedOptionsArray(): FormArray {
      return this.institutionForm.get('sections') as FormArray;
    }
    get isInstitutionLaique() {
      return this.institutionForm.get('isInstitutionLaique');
    }
    ngOnInit(): void {
      const userId: string = Parse.User.current()?._getId() || ""
      getPersonByUserId(userId).then(async (person: any) => {
        console.log('Person found 2', person)
        const institution = await globalGet({
          T: "Institution",
          filters: {
            owner: { className: "Person", objectId: person?.objectId}
          },
          includes: ['owner', 'sections'],
          isOne: true
        })
        console.log('institution institution institution ', institution)
        this.person = person
        this.institution = institution

        this.institutionForm.patchValue({
          phones: institution?.phones?.join(', '),
          emails: institution?.emails?.join(', '),
          poBox: institution?.poBox,
          registrationNumber: institution?.registrationNumber,
          teachOrder: institution?.teachOrder,
          isInstitutionLaique: institution?.isInstitutionLaique? "Oui" :  "Non",
          religiousGroup: institution?.religiousGroup,
          teachingGroup: institution?.teachingGroup,
          description: institution?.description,
          latitude: institution?.geoPoint?.latitude,
          longitude: institution?.geoPoint?.longitude,
          sections: institution?.sections?.map((s: any) => s.objectId)
        });
      })
    }

    public onFileSelect(event: any, isSecond?: boolean) {
    console.log('Changed')
    const file: File = event.target.files[0];
    if (file) {
      if(isSecond){
        return this.institutionForm.patchValue({
          photo: file
        });
      }
      this.institutionForm.patchValue({
        logo: file
      });
    }
  }
    async onSubmit(): Promise<any> {

     console.log('✅ Valeurs sélectionnées :', this.selectedOptionsArray);

      console.log('Form submited 1', this.institutionForm.value)
      if (this.institutionForm.valid) {
        try {
          
        
          this.submitting = true;
          this.errorMessage = null;
          const formData = { 
            ...this.institutionForm.value 
          };
          const geoPoint = new Parse.GeoPoint(formData?.latitude, formData?.longitude)
          console.log('geoPoint geoPoint geoPoint ', geoPoint)
          delete formData.latitude
          delete formData.longitude
          formData.phones = formData.phones ? [...formData.phones.split(',')] : []
          formData.emails = formData.emails ? [...formData.emails.split(',')] : []
          formData.sections = formData.sections?.length ? [...formData.sections.map((section: any) => ({
            __type: "Pointer",
            className: "Section",
            objectId: section
          }) )] : []
          if(formData.isInstitutionLaique ===  "Oui"){
            formData.isInstitutionLaique = true
          }else{
            formData.isInstitutionLaique = false
          }

          console.log('Form submited 2', formData)
          const r = await globalPut({
            T: "Institution",
            dataObject: formData, 
            objectId: this.institution?.objectId,
            geoPoint: {
              field: "geoPoint",
              value: geoPoint
            }
          })
          console.log('UPDATE RESULT ', r)
          this.submitting = false;
          this.errorMessage = null;
        } catch (error) {
           console.error(' error error ', error)
            this.submitting = false;
            this.errorMessage = null;
        }
      }
    }
}
