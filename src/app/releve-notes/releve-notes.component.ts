import { Component } from '@angular/core';
import {routes} from "../shared/routes/routes";
import {DataService} from "../shared/data/data.service";

@Component({
  selector: 'app-releve-notes',
  standalone: false,
  templateUrl: './releve-notes.component.html',
  styleUrl: './releve-notes.component.scss'
})
export class ReleveNotesComponent {

  public students: any[] = [];
  public teachers: any[] = [];

  constructor(public dataService : DataService) {
    this.students = [];
    this.students = this.dataService.getRandomStudents();
    // alert(this.students.length);
  }

  async ngOnInit()
  {
    this.teachers = await this.dataService.getRandomTeachersData();
    console.log("personnes concernées : ");
    console.log(this.teachers);
  }
  print() {
    const printContents = document.getElementById('container-releve-notes')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // recharger pour restaurer l'état Angular
    }
  }

  protected readonly routes = routes;
}
