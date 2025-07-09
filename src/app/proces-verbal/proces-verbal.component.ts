import { Component } from '@angular/core';

import Parse from 'parse';

import { LoginService } from '../auth/services/login.service';
import { DataService } from '../shared/data/data.service';
import { routes } from '../shared/routes/routes';

@Component({
  selector: 'app-proces-verbal',
  standalone: false,
  templateUrl: './proces-verbal.component.html',
  styleUrl: './proces-verbal.component.scss'
})
export class ProcesVerbalComponent {

  protected readonly routes = routes;
  public students: any[] = [];
  public teachers: any[] = [];

  constructor(public dataService : DataService,
              private loginService: LoginService,
  ) {
    this.students = [];
    this.students = this.dataService.getRandomStudentsV2PV();
  }

  async ngOnInit()
  {
    this.teachers = await this.dataService.getRandomTeachersData();
    console.log("personnes concernées : ");
    console.log(this.teachers);
  }


  // Fonction pour imprimer le procès verbal
  print() {
    const printContents = document.getElementById('container-proces-verbal')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // recharger pour restaurer l'état Angular
    }
  }

  public coteFromMoyenne(moy: number): string {
    if (moy >= 15) return 'A';
    if (moy >= 12) return 'B';
    if (moy >= 10) return 'C';
    return 'D';
  }

  public getObservation(moyenneTrimestre: number): { text: string, color: string } {
    if (moyenneTrimestre === null || isNaN(moyenneTrimestre)) {
      return { text: 'NON CLASSÉ', color: 'black' };
    }
    if (moyenneTrimestre >= 10) {
      return { text: 'ADMIS', color: 'green' };
    } else {
      return { text: 'RECALÉ', color: 'red' };
    }
  }

  public getAverage(notes: number[]): number {
    if (!notes || notes.length === 0) return NaN;
    const sum = notes.reduce((acc, val) => acc + val, 0);
    return +(sum / notes.length).toFixed(2);
  }

  public getUANotes(notes: number[], uaIndex: number): number[] {
    // Chaque UA a 2 notes (moyenne + cote), d’après ton tableau
    // Mais ici on va simuler des notes (exemple 3 UA, 2 notes chacun)
    // Or tu as beaucoup de notes. Pour l’exemple on simplifie.

    // Supposons que pour chaque UA, on prend 3 notes de la liste "notes" en offset :
    // UA1: notes[0..2], UA2: notes[3..5], UA3: notes[6..8]

    // Attention à adapter selon ta structure réelle !

    const startIndex = uaIndex * 3;
    return notes.slice(startIndex, startIndex + 3);
  }

  public sendNotification (student: any){
    console.log('note note note ', student)
    const note = this.getUAMoyenne(student.notes, 2)
    console.log('note note note ', note)
      const options: any = {
        "to": "wilfriedinfo85@gmail.com",
        "subject": "MINEDUB/I-CAMSCHOOL : Performance academique",
        "html": "<h3 >MINEDUB/I-CAMSCHOOL<b>Performance academique</b>: Chers parents nous vous informons que pour le compte du premier trimestre votre enfant {{enfantName}} a obtenu une côte de A+ (Compétence définitivement installée) soit une moyenne de {{note}}.</h3>",
        "data": {
          enfantName: student?.name,
          note: note
        }
      }
      Parse.Cloud.run('sendEmail', {...options}).then(r => {
        console.log('sendEmail ', r)
      })

  }
  public getUAMoyenne(notes: number[], uaIndex: number): number {
    const uaNotes = this.getUANotes(notes, uaIndex);
    return this.getAverage(uaNotes);
  }

  public getTrimestreMoyenne(notes: number[]): number {
    // Moyenne des 3 UA
    const moyennes = [0, 1, 2].map(i => this.getUAMoyenne(notes, i));
    const validMoyennes = moyennes.filter(m => !isNaN(m));
    if (validMoyennes.length === 0) return NaN;
    return +(validMoyennes.reduce((a, b) => a + b, 0) / validMoyennes.length).toFixed(2);
  }


}
