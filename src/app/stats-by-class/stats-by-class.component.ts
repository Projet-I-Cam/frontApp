import { Component } from '@angular/core';
import {routes} from "../shared/routes/routes";
import {DataService} from "../shared/data/data.service";

@Component({
  selector: 'app-stats-by-class',
  standalone: false,
  templateUrl: './stats-by-class.component.html',
  styleUrl: './stats-by-class.component.scss'
})
export class StatsByClassComponent {
  protected readonly routes = routes;
  public students: any[] = [];
  public classStats = [
    { nom: 'SIL', students: [] },
    { nom: 'CP', students: [] },
    { nom: 'SPS', students: [] },
    { nom: 'CE 1', students: [] },
    { nom: 'CE 2', students: [] },
    { nom: 'CM 1', students: [] },
    { nom: 'CM 2', students: [] }
  ];

  public classes = ['SIL', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'];
  public selectedClasse: string | null = null;
  constructor(public dataService : DataService) {
    this.students = [];
    this.students = this.dataService.getRandomStudents();
    (this.classStats[0] as any).students = this.dataService.getRandomStudents();
    (this.classStats[1] as any).students = this.dataService.getRandomStudents();
    (this.classStats[2] as any).students = this.dataService.getRandomStudents();
    (this.classStats[3] as any).students = this.dataService.getRandomStudents();
    (this.classStats[4] as any).students = this.dataService.getRandomStudents();
    (this.classStats[5] as any).students = this.dataService.getRandomStudents();
    (this.classStats[6] as any).students = this.dataService.getRandomStudents();
  }

  print() {
    const printContents = document.getElementById('container-stats-results')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // recharger pour restaurer l'état Angular
    }
  }

  getGenderCount(students: any[], gender: 'M' | 'F'): number {
    return students.filter(s => s.gender === gender).length;
  }

  getTotalCount(students: any[]): number {
    return students.length;
  }

  // Dans ton component TS

  getTotalGenderCount(gender: "M" | "F"): number {
    return this.classStats.reduce((acc, c) => acc + this.getGenderCount(c.students,   gender), 0);
  }

  getTotalStudentsCount(): number {
    return this.classStats.reduce((acc, c) => acc + this.getTotalCount(c.students), 0);
  }

  // Optionnel : label plus explicite
  public getClasseLabel(classe: string | null): string {
    const labels: { [key: string]: string } = {
      'SIL': 'Section d’Initiation à la Lecture (SIL)',
      'CP': 'Cours Préparatoire (CP)',
      'CE1': 'Cours Élémentaire 1 (CE1)',
      'CE2': 'Cours Élémentaire 2 (CE2)',
      'CM1': 'Cours Moyen 1 (CM1)',
      'CM2': 'Cours Moyen 2 (CM2)'
    };
    return classe ? labels[classe] || classe : 'Non spécifiée';
  }

}
