import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
interface data {
  name: string | undefined;
  code: string | undefined;
}

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrl: './add-student.component.scss',
    standalone: false
})
export class AddStudentComponent {
  public routes = routes;
  values: string[] = ['English', 'Spanish'];
  constructor(private router: Router) {}
  formData: { selectedClass: data | undefined }[] = [];
  values2: string[] = ['Allergy', 'Skin Allergy'];
  values3: string[] = ['Medecine Name'];
  public onSubmit() {
    // this.router.navigate([routes.invoice]);
  }
  addNewRow() {
    this.formData.push({ selectedClass: {name: undefined,code:undefined}});
  }
  removeRow(index: number) {
    this.formData.splice(index, 1);
  }
}
