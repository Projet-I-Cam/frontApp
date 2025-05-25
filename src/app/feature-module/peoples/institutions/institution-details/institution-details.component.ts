import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { globalGet } from '../../../../services/statefull/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { UtilsService } from '../../../../services/utilis.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-institution-details',
  standalone: false,
  templateUrl: './institution-details.component.html',
  styleUrl: './institution-details.component.scss'
})
export class InstitutionDetailsComponent implements OnInit{
  public routes = routes;
  institution: any = null;
  errorMessage: any = null;
  loading: boolean = false;
  public institutionForm: FormGroup;
  public submitting = false;
  municipalities: any[] = [];
  mapUrl: string = "https://www.openstreetmap.org/export/embed.html?bbox=9.7579,4.0411,9.7779,4.0611&layer=mapnik&marker=4.0511,9.7679"
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ){
    this.institutionForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      registrationDate: [{ value: '', disabled: true }, [Validators.required]],
      municipality: [{ value: '', disabled: true }, [Validators.required]],
      address: [{ value: '', disabled: true },],
      certificateOppointment: [null],
      emails: [{ value: '', disabled: true }, [Validators.email]],
      phones: [{ value: '', disabled: true }],
      isActive: [true],
      ownerName: [{ value: '', disabled: true }, [Validators.required]],
      registrationNumber: [{ value: '', disabled: true }, [Validators.required]],
      teachOrder: [{ value: '', disabled: true }, [Validators.required]],
      isInstitutionLaique: [{ value: '', disabled: true }, [Validators.required]],
      religiousGroup: [{ value: '', disabled: true }, [Validators.required]],
      teachingGroup: [{ value: '', disabled: true }, [Validators.required]],
      description: [{ value: '', disabled: true }],
    });
  }
  ngOnInit(): void {
    console.log('Institution details word fine')
    this.loading = true
    this.route.params.subscribe(params => {
      console.log("params['id'] params['id'] ", params['id'])
      if (params['id']) {
        globalGet({
          T: "Institution",
          filters: {
            objectId: params['id']
          },
          isOne: true,
          includes: ['owner', 'municipality']
        }).then((institution: any) => {
          console.log(' institution institution institution ', institution)
          this.institution = institution
          this.institutionForm.patchValue({
            ...institution,
            registrationDate: new Date(institution?.registrationDate?.iso),
            municipality: institution?.municipality?.objectId,
            isInstitutionLaique: institution?.isInstitutionLaique ? "Laïque" : "Confessionnel",
            ownerName: institution?.owner?.firstName + " " + institution?.owner?.lastName
          });
          this.loading = false
        })
      }
    });

    UtilsService.getArrondissement(null).then((arrds: Array<any>) => {
      this.municipalities = arrds?.map((arr: any) => {
        return{
          label: arr.get('name'),
          value: arr._getId(),
        }
      })
    })
  }

  onSubmit(): void {
    if (this.institutionForm.valid) {
      // this.submitting = true;
      // this.errorMessage = null;
    }
  }

  generateMapUrl(lat: number, lon: number): SafeResourceUrl  {
    console.log('RUN REUn -----------------')
    const delta = 0.01; // zone autour du point
    const minLat = lat - delta;
    const maxLat = lat + delta;
    const minLon = lon - delta;
    const maxLon = lon + delta;
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${minLon},${minLat},${maxLon},${maxLat}&layer=mapnik&marker=${lat},${lon}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
}
