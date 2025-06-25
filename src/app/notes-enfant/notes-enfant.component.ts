import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {DataService} from "../shared/data/data.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {SharedModule} from "../shared/shared.module";
import { routes } from '../shared/routes/routes';
import {Modal} from "bootstrap";

@Component({
  selector: 'app-notes-enfant',
  templateUrl: './notes-enfant.component.html',
  styleUrl: './notes-enfant.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    SharedModule
  ]

})
export class NotesEnfantComponent {

  protected readonly routes = routes;
  public students: any[] = [];
  selectedUA: string = 'UA 1';
  availableUAs: string[] = ['UA 1', 'UA 2', 'UA 3'];
  selectedEleve: string = '';
  selectedTrimestre: string = 'Trimestre 1';
  trimestres: string[] = ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'];

  modalContent: string = '';
  selectedModule: any = null;

  @ViewChild('gradeModal') gradeModal!: ElementRef;
  modalInstance: any;
  modalReady = false;

  ngAfterViewChecked(): void {
    if (this.shouldShowTable() && !this.modalReady && this.gradeModal) {
      this.modalInstance = new Modal(this.gradeModal.nativeElement);
      this.modalReady = true;
    }
  }

  shouldShowTable(): boolean {
    return !!(this.selectedEleve && this.selectedTrimestre && this.selectedUA);
  }

  modules = [
    {
      title: 'COMMUNIQUER EN FRANÇAIS',
      unites: [
        {
          name: 'UA1',
          evaluations: [
            { type: 'Orale', points: 12, note: 10, cote: 'B' },
            { type: 'Écrite', points: 15, note: 13, cote: 'A' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
          ],
        },
        {
          name: 'UA2',
          evaluations: [
            { type: 'Orale', points: 12, note: 11, cote: 'B' },
            { type: 'Écrite', points: 15, note: 12, cote: 'B' },
            { type: 'Savoir-être', points: 3, note: 2, cote: 'B' },
          ],
        },
        {
          name: 'UA3',
          evaluations: [
            { type: 'Orale', points: 12, note: 9, cote: 'C' },
            { type: 'Écrite', points: 15, note: 14, cote: 'A' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
          ],
        },
        {
          name: "TRIMESTRE",
          evaluations: [
            { type: 'Orale', points: 12, note: 10, cote: 'B' },
            { type: 'Écrite', points: 15, note: 13, cote: 'A' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
          ],
        },
      ],
    },
    {
      title: 'COMMUNICATE IN ENGLISH',
      unites: [
        {
          name: 'UA1',
          evaluations: [
            { type: 'Orale', points: 12, note: 11, cote: 'B' },
            { type: 'Écrite', points: 15, note: 10, cote: 'B' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
          ],
        },
        {
          name: 'UA2',
          evaluations: [
            { type: 'Orale', points: 12, note: 12, cote: 'A' },
            { type: 'Écrite', points: 15, note: 13, cote: 'A' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
          ],
        },
        {
          name: 'UA3',
          evaluations: [
            { type: 'Orale', points: 12, note: 9, cote: 'C' },
            { type: 'Écrite', points: 15, note: 11, cote: 'B' },
            { type: 'Savoir-être', points: 3, note: 2, cote: 'B' },
          ],
        },
        {
          name: 'TRIMESTRE',
          evaluations: [
            { type: 'Orale', points: 12, note: 10, cote: 'B' },
            { type: 'Écrite', points: 15, note: 12, cote: 'B' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
          ],
        },
      ],
    },
    {
      title: 'PRATIQUER UNE LANGUE NATIONALE',
      unites: [
        {
          name: 'UA1',
          evaluations: [
            { type: 'Orale', points: 10, note: 7, cote: 'B' },
            { type: 'Écrite', points: 6, note: 9, cote: 'A' },
            { type: 'Savoir-être', points: 2, note: 2, cote: 'A' },
            { type: 'Pratique', points: 2, note: 2, cote: 'A' },
          ],
        },
        {
          name: 'UA2',
          evaluations: [
            { type: 'Orale', points: 10, note: 8, cote: 'A' },
            { type: 'Écrite', points: 6, note: 9, cote: 'A' },
            { type: 'Savoir-être', points: 2, note: 2, cote: 'A' },
            { type: 'Pratique', points: 2, note: 2, cote: 'A' },
          ],
        },
        {
          name: 'UA3',
          evaluations: [
            { type: 'Orale', points: 10, note: 7, cote: 'B' },
            { type: 'Écrite', points: 10, note: 8, cote: 'B' },
            { type: 'Savoir-être', points: 2, note: 2, cote: 'A' },
            { type: 'Pratique', points: 2, note: 2, cote: 'A' },
          ],
        },
        {
          name: 'TRIMESTRE',
          evaluations: [
            { type: 'Orale', points: 10, note: 8, cote: 'A' },
            { type: 'Écrite', points: 10, note: 9, cote: 'A' },
            { type: 'Savoir-être', points: 2, note: 2, cote: 'A' },
            { type: 'Pratique', points: 2, note: 2, cote: 'A' },
          ],
        },
      ],
    },
    {
      title: 'UTILISER  LES NOTIONS DE BASE EN MATHEMATIQUES',
      unites: [
        {
          name: 'UA1',
          evaluations: [
            { type: 'Orale', points: 8, note: 6, cote: 'B' },
            { type: 'Écrite', points: 28, note: 28, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
          ],
        },
        {
          name: 'UA2',
          evaluations: [
            { type: 'Orale', points: 8, note: 6, cote: 'B' },
            { type: 'Écrite', points: 28, note: 28, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
          ],
        },
        {
          name: 'UA3',
          evaluations: [
            { type: 'Orale', points: 8, note: 6, cote: 'B' },
            { type: 'Écrite', points: 28, note: 28, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
          ],
        },
        {
          name: 'TRIMESTRE',
          evaluations: [
            { type: 'Orale', points: 8, note: 6, cote: 'B' },
            { type: 'Écrite', points: 28, note: 28, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
          ],
        },
      ],
    },
    {
      title: 'UTILISER  LES NOTIONS DE BASE EN SCIENCES ET TECHNOLOGIE ',
      unites: [
        {
          name: 'UA1',
          evaluations: [
            { type: 'Orale', points: 6, note: 4, cote: 'B' },
            { type: 'Écrite', points: 7, note: 7, cote: 'A' },
            { type: 'Savoir-être', points: 7, note: 7, cote: 'A' },
            { type: 'Pratique', points: 20, note: 20, cote: 'A' },
          ],
        },
        {
          name: 'UA2',
          evaluations: [
            { type: 'Orale', points: 6, note: 4, cote: 'B' },
            { type: 'Écrite', points: 7, note: 7, cote: 'A' },
            { type: 'Savoir-être', points: 7, note: 7, cote: 'A' },
            { type: 'Pratique', points: 20, note: 20, cote: 'A' },
          ],
        },
        {
          name: 'UA3',
          evaluations: [
            { type: 'Orale', points: 6, note: 4, cote: 'B' },
            { type: 'Écrite', points: 7, note: 7, cote: 'A' },
            { type: 'Savoir-être', points: 7, note: 7, cote: 'A' },
            { type: 'Pratique', points: 20, note: 20, cote: 'A' },
          ],
        },
        {
          name: 'TRIMESTRE',
          evaluations: [
            { type: 'Orale', points: 6, note: 4, cote: 'B' },
            { type: 'Écrite', points: 7, note: 7, cote: 'A' },
            { type: 'Savoir-être', points: 7, note: 7, cote: 'A' },
            { type: 'Pratique', points: 20, note: 20, cote: 'A' },
          ],
        },
      ],
    },
    {
      title: 'PRATIQUER LES VALEURS SOCIALES ',
      unites: [
        {
          name: 'UA1',
          evaluations: [
            { type: 'Orale', points: 3, note: 2, cote: 'B' },
            { type: 'Écrite', points: 8, note: 8, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
            { type: 'Pratique', points: 5, note: 5, cote: 'A' },
          ],
        },
        {
          name: 'UA2',
          evaluations: [
            { type: 'Orale', points: 3, note: 2, cote: 'B' },
            { type: 'Écrite', points: 8, note: 8, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
            { type: 'Pratique', points: 5, note: 5, cote: 'A' },
          ],
        },
        {
          name: 'UA3',
          evaluations: [
            { type: 'Orale', points: 3, note: 2, cote: 'B' },
            { type: 'Écrite', points: 8, note: 8, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
            { type: 'Pratique', points: 5, note: 5, cote: 'A' },
          ],
        },
        {
          name: 'TRIMESTRE',
          evaluations: [
            { type: 'Orale', points: 3, note: 2, cote: 'B' },
            { type: 'Écrite', points: 8, note: 8, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
            { type: 'Pratique', points: 5, note: 5, cote: 'A' },
          ],
        },
      ],
    },
    {
      title: 'PRATIQUER LES VALEURS CITOYENNES ',
      unites: [
        {
          name: 'UA1',
          evaluations: [
            { type: 'Orale', points: 3, note: 2, cote: 'B' },
            { type: 'Écrite', points: 9, note: 9, cote: 'A' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
            { type: 'Pratique', points: 5, note: 5, cote: 'A' },
          ],
        },
        {
          name: 'UA2',
          evaluations: [
            { type: 'Orale', points: 3, note: 2, cote: 'B' },
            { type: 'Écrite', points: 9, note: 9, cote: 'A' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
            { type: 'Pratique', points: 5, note: 5, cote: 'A' },
          ],
        },
        {
          name: 'UA3',
          evaluations: [
            { type: 'Orale', points: 3, note: 2, cote: 'B' },
            { type: 'Écrite', points: 9, note: 9, cote: 'A' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
            { type: 'Pratique', points: 5, note: 5, cote: 'A' },
          ],
        },
        {
          name: 'TRIMESTRE',
          evaluations: [
            { type: 'Orale', points: 3, note: 2, cote: 'B' },
            { type: 'Écrite', points: 9, note: 9, cote: 'A' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
            { type: 'Pratique', points: 5, note: 5, cote: 'A' },
          ],
        },
      ],
    },
    {
      title: 'DEMONTRER L’AUTONOMIE, L’ESPRIT D’INITIATIVE ET DE CREATIVITE ET D’ENTREPRENEURIAT ',
      unites: [
        {
          name: 'UA1',
          evaluations: [
            { type: 'Orale', points: 3, note: 2, cote: 'B' },
            { type: 'Écrite', points: 9, note: 9, cote: 'A' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
            { type: 'Pratique', points: 5, note: 5, cote: 'A' },
          ],
        },
        {
          name: 'UA2',
          evaluations: [
            { type: 'Orale', points: 3, note: 2, cote: 'B' },
            { type: 'Écrite', points: 9, note: 9, cote: 'A' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
            { type: 'Pratique', points: 5, note: 5, cote: 'A' },
          ],
        },
        {
          name: 'UA3',
          evaluations: [
            { type: 'Orale', points: 3, note: 2, cote: 'B' },
            { type: 'Écrite', points: 9, note: 9, cote: 'A' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
            { type: 'Pratique', points: 5, note: 5, cote: 'A' },
          ],
        },
        {
          name: 'TRIMESTRE',
          evaluations: [
            { type: 'Orale', points: 3, note: 2, cote: 'B' },
            { type: 'Écrite', points: 9, note: 9, cote: 'A' },
            { type: 'Savoir-être', points: 3, note: 3, cote: 'A' },
            { type: 'Pratique', points: 5, note: 5, cote: 'A' },
          ],
        },
      ],
    },
    {
      title: 'UTILISER LES CONCEPTES DE BASE ET LES OUTILS DES TIC ',
      unites: [
        {
          name: 'UA1',
          evaluations: [
            { type: 'Orale', points: 2, note: 1, cote: 'B' },
            { type: 'Écrite', points: 2, note: 2, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
            { type: 'Pratique', points: 12, note: 12, cote: 'A' },
          ],
        },
        {
          name: 'UA2',
          evaluations: [
            { type: 'Orale', points: 2, note: 1, cote: 'B' },
            { type: 'Écrite', points: 2, note: 2, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
            { type: 'Pratique', points: 12, note: 12, cote: 'A' },
          ],
        },
        {
          name: 'UA3',
          evaluations: [
            { type: 'Orale', points: 2, note: 1, cote: 'B' },
            { type: 'Écrite', points: 2, note: 2, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
            { type: 'Pratique', points: 12, note: 12, cote: 'A' },
          ],
        },
        {
          name: 'TRIMESTRE',
          evaluations: [
            { type: 'Orale', points: 2, note: 1, cote: 'B' },
            { type: 'Écrite', points: 2, note: 2, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
            { type: 'Pratique', points: 12, note: 12, cote: 'A' },
          ],
        },
      ],
    },
    {
      title: 'PRATIQUER LES ACTIVITES PHYSIQUES ET SPORTIVES POUR LES APPRENANTS ',
      unites: [
        {
          name: 'UA1',
          evaluations: [
            { type: 'Orale', points: 2, note: 1, cote: 'B' },
            { type: 'Écrite', points: 2, note: 2, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
            { type: 'Pratique', points: 12, note: 12, cote: 'A' },
          ],
        },
        {
          name: 'UA2',
          evaluations: [
            { type: 'Orale', points: 2, note: 1, cote: 'B' },
            { type: 'Écrite', points: 2, note: 2, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
            { type: 'Pratique', points: 12, note: 12, cote: 'A' },
          ],
        },
        {
          name: 'UA3',
          evaluations: [
            { type: 'Orale', points: 2, note: 1, cote: 'B' },
            { type: 'Écrite', points: 2, note: 2, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
            { type: 'Pratique', points: 12, note: 12, cote: 'A' },
          ],
        },
        {
          name: 'TRIMESTRE',
          evaluations: [
            { type: 'Orale', points: 2, note: 1, cote: 'B' },
            { type: 'Écrite', points: 2, note: 2, cote: 'A' },
            { type: 'Savoir-être', points: 4, note: 4, cote: 'A' },
            { type: 'Pratique', points: 12, note: 12, cote: 'A' },
          ],
        },
      ],
    },
    {
      title: 'PRATIQUER LES ACTIVITES ARTISTIQUES ',
      unites: [
        {
          name: 'UA1',
          evaluations: [
            { type: 'Orale', points: 2, note: 1, cote: 'B' },
            { type: 'Écrite', points: 4, note: 4, cote: 'A' },
            { type: 'Savoir-être', points: 2, note: 2, cote: 'A' },
            { type: 'Pratique', points: 12, note: 12, cote: 'A' },
          ],
        },
        {
          name: 'UA2',
          evaluations: [
            { type: 'Orale', points: 2, note: 1, cote: 'B' },
            { type: 'Écrite', points: 4, note: 4, cote: 'A' },
            { type: 'Savoir-être', points: 2, note: 2, cote: 'A' },
            { type: 'Pratique', points: 12, note: 12, cote: 'A' },
          ],
        },
        {
          name: 'UA3',
          evaluations: [
            { type: 'Orale', points: 2, note: 1, cote: 'B' },
            { type: 'Écrite', points: 4, note: 4, cote: 'A' },
            { type: 'Savoir-être', points: 2, note: 2, cote: 'A' },
            { type: 'Pratique', points: 12, note: 12, cote: 'A' },
          ],
        },
        {
          name: 'TRIMESTRE',
          evaluations: [
            { type: 'Orale', points: 2, note: 1, cote: 'B' },
            { type: 'Écrite', points: 4, note: 4, cote: 'A' },
            { type: 'Savoir-être', points: 2, note: 2, cote: 'A' },
            { type: 'Pratique', points: 12, note: 12, cote: 'A' },
          ],
        },
      ],
    },
  ];
  getTotalNote(module: any, selectedUA: any): number {
    let totalNote = 0;

    // Chercher l'UA correspondante dans le module (au cas où selectedUA est un objet similaire)
    const ua = module.unites.find((u: any) => u === selectedUA || u.id === selectedUA.id);

    if (ua) {
      ua.evaluations.forEach((evalItem: any) => {
        totalNote += evalItem.note;
      });
    }

    return totalNote;
  }

  getPopoverContent(module: any, selectedUA: any): string {
    const ua = module.unites.find((u: any) => u === selectedUA || u.id === selectedUA.id);
    if (!ua) return '';

    const labelMap: { [key: string]: string } = {
      'orale': 'Oral',
      'écrite': 'Écrit',
      'pratique': 'Pratique',
      'savoir-être': 'Savoir-être',
    };

    const subGrades: { [label: string]: number } = {};

    ua.evaluations.forEach((evalItem: any) => {
      const rawType = evalItem.type?.toLowerCase();
      if (!rawType || !(rawType in labelMap)) return;

      const label = labelMap[rawType];
      subGrades[label] = evalItem.note ?? 0;
    });

    const content = Object.entries(subGrades)
      .map(([label, note]) => `${label}: ${note.toFixed(2)}`)
      .join(', ');

    return content || 'Aucune note disponible';
  }



  getTotalPoints(module: any, selectedUA: any): number {
    let totalNote = 0;

    // Chercher l'UA correspondante dans le module (au cas où selectedUA est un objet similaire)
    const ua = module.unites.find((u: any) => u === selectedUA || u.id === selectedUA.id);

    if (ua) {
      ua.evaluations.forEach((evalItem: any) => {
        totalNote += evalItem.points;
      });
    }
    return totalNote;
  }
  constructor(public dataService : DataService) {
    this.students = [];
    this.students = this.dataService.getRandomStudentsV2PV().slice(0,2);
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

  // Conversion simplifiée des lettres en notes
  coteToValue(cote: string): number {
    const scale: { [key: string]: number } = { A: 4, B: 3, C: 2, D: 1, E: 0 };
    return scale[cote] ?? 0;
  }

  valueToCote(value: number): string {
    if (value >= 3.5) return 'A';
    if (value >= 2.5) return 'B';
    if (value >= 1.5) return 'C';
    if (value >= 0.5) return 'D';
    return 'E';
  }

  getAverageCote(module: any): string {
    let total = 0;
    let count = 0;
    module.unites.forEach((ua: any) => {
      ua.evaluations.forEach((evalItem: any) => {
        total += this.coteToValue(evalItem.cote);
        count++;
      });
    });
    const average = count ? total / count : 0;
    return this.valueToCote(average);
  }

  openGradeModal(module: any, ua: any): void {
    console.log("contenu à afficher");
    console.log(this.modalContent);

    this.selectedModule = module;
    this.modalContent = this.getPopoverContent(module, ua);
    console.log(this.modalInstance);
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

}
