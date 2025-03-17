import { Component } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
interface data {
  name: string | undefined;
  code: string | undefined;
}

@Component({
    selector: 'app-edit-student',
    templateUrl: './edit-student.component.html',
    styleUrl: './edit-student.component.scss',
    standalone: false
})
export class EditStudentComponent {
  public routes = routes;
  values2: string[] = ['Allergy', 'Skin Allergy'];
  values3: string[] = ['Medecine Name'];
  formData: { selectedClass: data | undefined }[] = [];
  addNewRow() {
    this.formData.push({ selectedClass: {name: undefined,code:undefined}});
  }
  removeRow(index: number) {
    this.formData.splice(index, 1);
  }
  values: string[] = ['English', 'Spanish'];
}
