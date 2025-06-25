import { Component } from '@angular/core';
import {routes} from "../shared/routes/routes";
import {DataService} from "../shared/data/data.service";
@Component({
  selector: 'app-releves-by-class',
  standalone: false,
  templateUrl: './releves-by-class.component.html',
  styleUrl: './releves-by-class.component.scss'
})
export class RelevesByClassComponent {
  public students: any[] = [];
  protected readonly routes = routes;

  public classes = ['SIL', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'];
  public selectedClasse: string | null = null;
  public teachers: any[] = [];
  public selectedTeacher : any = {};

  async ngOnInit()
  {
    this.teachers = await this.dataService.getRandomTeachersData();
    console.log("personnes concernées : ");
    console.log(this.teachers);
  }

  constructor(public dataService : DataService) {
    this.students = [];
    this.students = this.dataService.getRandomStudents();
    // alert(this.students.length);
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

  // Optionnel : label plus explicite
  public getClasseLabel(classe: string | null): string {
    const labels: { [key: string]: string } = {
      'SIL': 'Section d’Initiation à la Lecture (SIL)',
      'CP': 'Cours Préparatoire (CP)',
      'CPS': 'Cours Préparatoire Spécial (CPS)', // si nécessaire
      'CE1': 'Cours Élémentaire 1 (CE1)',
      'CE2': 'Cours Élémentaire 2 (CE2)',
      'CM1': 'Cours Moyen 1 (CM1)',
      'CM2': 'Cours Moyen 2 (CM2)'
    };

    if (classe) {
      // Met à jour l'enseignant sélectionné pour la classe
      this.selectedTeacher = this.teachers.find(t => t.class === classe) || null;
      return labels[classe] || classe;
    }

    this.selectedTeacher = null;
    return 'Non spécifiée';

  }
}
