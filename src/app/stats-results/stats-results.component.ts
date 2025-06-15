import { Component } from '@angular/core';
import {routes} from "../shared/routes/routes";
import {DataService} from "../shared/data/data.service";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-stats-results',
  standalone: false,
  templateUrl: './stats-results.component.html',
  styleUrl: './stats-results.component.scss'
})
export class StatsResultsComponent {

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


  protected readonly routes = routes;
}
