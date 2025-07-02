import { Component, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../../../../shared/shared.module';
import {DataService} from "../../../../shared/data/data.service";

interface StudentData {
  id: number;
  name: string;
  rollNo: string;
  class: string;
  section: string;
  dob: string;
  parentName: string;
  address: string;
  profileImage: string;
  rank: string;
  subjects: Array<{name: string, grade: number, appreciation: string}>;
  average: number;
  classAverage: number;
  attendance: string;
  conduct: string;
  teacherRemarks: string;
  principalRemarks: string;
  schoolName: string;
  schoolYear: string;
  term: string;
  image: string;
  admissionNo: string;
  gender: string;
  phone: string;
}

interface GradeData {
  subject: string;
  marks: number;
  maxMarks: number;
  percentage: number;
  grade: string;
  remarks: string;
}

interface AttendanceData {
  term: string;
  present: number;
  absent: number;
  total: number;
  percentage: number;
}

interface ClassData {
  name: string;
  code: string;
}

interface SectionData {
  name: string;
  code: string;
}

interface ExamData {
  name: string;
  code: string;
}

interface StudentSearchResult {
  id: number;
  name: string;
  rollNo: string;
  className: string;
  section: string;
}

export interface Evaluation {
  note: number | null;
  cote: string | null;
  type: string; // dynamique depuis BD
  points: number;
}


interface UniteApprentissage {
  name: 'UA1' | 'UA2' | 'UA3' | 'TRIMESTRE';
  evaluations: Evaluation[];
}

interface Module {
  title: string;
  totalPoints: number;
  unites: UniteApprentissage[];
  totalModulePoints: number;
  coteModule: string;
}

interface Competence {
  id: number;
  title: string;
  totalPoints: number;
  modules: Module[];
}


@Component({
    selector: 'app-report-card',
    templateUrl: './report-card.component.html',
    styleUrls: ['./report-card.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        BsDatepickerModule,
        DropdownModule,
        SharedModule
    ]
})
export class ReportCardComponent implements OnInit {
  public routes = routes;

  // Options pour les dropdowns
  classes: ClassData[] = [];
  sections: SectionData[] = [];
  exams: ExamData[] = [];

  // Sélections actuelles
  selectedClass: ClassData | undefined;
  selectedSection: SectionData | undefined;
  selectedExam: ExamData | undefined;
  searchQuery: string = '';

  // Données de l'élève et du bulletin
  studentData: StudentData | null = null;
  gradeData: GradeData[] = [];
  attendanceData: AttendanceData[] = [];
  totalMarks: number = 0;
  obtainedMarks: number = 0;
  percentage: number = 0;
  rank: string = '';
  result: string = '';
  remarks: string = '';

  // État du composant
  isLoading: boolean = false;
  isSearchMode: boolean = true;
  showBulletin: boolean = false;
  searchResults: StudentSearchResult[] = [];

  // Données pour l'année scolaire
  academicYear: string = '2024-2025';
  reportDate: Date = new Date();

  // Données exemple pour les élèves
  students = [
    { id: 1, name: this.getRandomName(0), image: 'assets/img/profiles/avatar-01.jpg' },
    { id: 2, name: this.getRandomName(1), image: 'assets/img/profiles/avatar-02.jpg' },
    { id: 3, name: this.getRandomName(2), image: 'assets/img/profiles/avatar-03.jpg' },
    { id: 4, name: this.getRandomName(3), image: 'assets/img/profiles/avatar-01.jpg' },
    { id: 5, name: this.getRandomName(4), image: 'assets/img/profiles/avatar-02.jpg' },
    { id: 6, name: this.getRandomName(5), image: 'assets/img/profiles/avatar-03.jpg' },
    { id: 7, name: this.getRandomName(6), image: 'assets/img/profiles/avatar-01.jpg' },
    { id: 8, name: this.getRandomName(7), image: 'assets/img/profiles/avatar-02.jpg' },
    { id: 9, name: this.getRandomName(8), image: 'assets/img/profiles/avatar-03.jpg' }
  ];

  // Données exemple pour les périodes
  terms = [
    { name: '1er Trimestre', value: 'trimestre1' },
    { name: '2ème Trimestre', value: 'trimestre2' },
    { name: '3ème Trimestre', value: 'trimestre3' },
    { name: 'Annuel', value: 'YEAR' }
  ];

  // Sélections pour le formulaire
  selectedStudent: any;
  selectedTerm: any;

  evaluationTypes = [
    { label: 'Orale', value: 'Orale', points: 12 },
    { label: 'Écrite', value: 'Écrite', points: 15 },
    { label: 'Pratique', value: 'Pratique', points: 6 },
    { label: 'Savoir-être', value: 'Savoir-être', points: 3 }
  ];


  competences: {
    totalPoints: number;
    id: number;
    title: string;
    modules: {
      unites: {
        evaluations: ({ note: number | null; cote: string | null; type: string; points: number })[];
        name: string
      }[];
      totalPoints: number;
      coteModule: string;
      totalModulePoints: number;
      title: string
    }[]
  }[];



  constructor(public dataService : DataService) {
    this.competences = [
      {
        id: 1,
        title: 'COMMUNIQUER EN FRANÇAIS ET EN ANGLAIS ET PRATIQUER AU MOINS UNE LANGUE NATIONALE ',
        totalPoints: 80,
        modules: [
          {
            title: 'COMMUNIQUER EN FRANÇAIS',
            totalPoints: 30,
            totalModulePoints: 0,
            coteModule: 'A',
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
            totalPoints: 30,
            totalModulePoints: 0,
            coteModule: 'B',
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
            totalPoints: 20,
            totalModulePoints: 0,
            coteModule: 'A',
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
        ],
      },
      {
        id: 2,
        title: 'UTILISER LES NOTIONS DE BASE EN MATHEMATIQUES, SCIENCES ET TECHNOLOGIES ',
        totalPoints: 80,
        modules: [
          {
            title: 'UTILISER  LES NOTIONS DE BASE EN MATHEMATIQUES',
            totalPoints: 40,
            totalModulePoints: 0,
            coteModule: 'B',
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
            totalPoints: 40,
            totalModulePoints: 0,
            coteModule: 'A',
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
        ],
      },
      {
        id: 3,
        title: 'PRATIQUER LES VALEURS SOCIALES ET CITOYENNES ',
        totalPoints: 40,
        modules: [
          {
            title: 'PRATIQUER LES VALEURS SOCIALES ',
            totalPoints: 40,
            totalModulePoints: 0,
            coteModule: 'B',
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
            totalPoints: 40,
            totalModulePoints: 0,
            coteModule: 'A',
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
        ],
      },
      {
        id: 4,
        title: 'DEMONTRER L’AUTONOMIE, L’ESPRIT D’INITIATIVE ET DE CREATIVITE ET D’ENTREPRENEURIAT ',
        totalPoints: 20,
        modules: [
          {
            title: 'DEMONTRER L’AUTONOMIE, L’ESPRIT D’INITIATIVE ET DE CREATIVITE ET D’ENTREPRENEURIAT ',
            totalPoints: 20,
            totalModulePoints: 0,
            coteModule: 'B',
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
          }
        ],
      },
      {
        id: 5,
        title: 'UTILISER LES CONCEPTES DE BASE ET LES OUTILS DE TECHNOLOGIE DE L’INFOMATION ET DE LA COMMUNICATION ',
        totalPoints: 40,
        modules: [
          {
            title: 'UTILISER LES CONCEPTES DE BASE ET LES OUTILS DES TIC ',
            totalPoints: 40,
            totalModulePoints: 0,
            coteModule: 'B',
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
        ],
      },
      {
        id: 6,
        title: 'PRATIQUER LES ACTIVITES PHYSIQUES, SPORTIVES ET ARTISTQUES ',
        totalPoints: 40,
        modules: [
          {
            title: 'PRATIQUER LES ACTIVITES PHYSIQUES ET SPORTIVES POUR LES APPRENANTS ',
            totalPoints: 20,
            totalModulePoints: 0,
            coteModule: 'B',
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
            totalPoints: 20,
            totalModulePoints: 0,
            coteModule: 'A',
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
        ],
      },
    ];
  }

  ngOnInit(): void {
    this.loadDropdownOptions();
  }

  // Fonction pour générer le bulletin
  generateBulletin() {
    this.showBulletin = true;
    // Simuler des données de bulletin
    console.log(this.selectedStudent);

    this.studentData = {
      id: this.selectedStudent.id,
      name: this.selectedStudent.name,
      rollNo: 'S001',
      class: (this.selectedClass?.name)? this.selectedClass?.name.toString() : this.getRandomClass().toString(),
      section: 'A',
      dob: '15/05/2007',
      parentName: this.selectedStudent.name + ' Sr.',
      address: 'Biyem Assi',
      profileImage: this.selectedStudent.image,
      rank: '3/25',
      subjects: [
        { name: 'Mathématiques', grade: 16, appreciation: 'Excellent travail, continue ainsi!' },
        { name: 'Français', grade: 14, appreciation: 'Bon travail, mais peut mieux faire en orthographe.' },
        { name: 'Histoire-Géographie', grade: 12, appreciation: 'Efforts à poursuivre.' },
        { name: 'Sciences', grade: 15, appreciation: 'Très bonne participation en classe.' },
        { name: 'Anglais', grade: 13, appreciation: 'Bonne progression ce trimestre.' }
      ],
      average: 14,
      classAverage: 12.5,
      attendance: '95%',
      conduct: 'Très bien',
      teacherRemarks: 'Élève sérieux et appliqué. Félicitations!',
      principalRemarks: 'Bon trimestre dans l\'ensemble. Continue tes efforts.',
      schoolName: 'École Publique du centre Administratif',
      schoolYear: '2024-2025',
      term: this.selectedTerm.name,
      image: this.selectedStudent.image,
      admissionNo: 'ADM-001',
      gender: 'Masculin',
      phone: '+237 6 55 98 45 18'
    };
  }

  // Fonction pour imprimer le bulletin
  printBulletin() {
    const printContents = document.getElementById('bulletin-content')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // recharger pour restaurer l'état Angular
    }
  }

  loadDropdownOptions(): void {
    // Options pour les classes
    this.classes = [
      { name: 'SIL', code: '6' },
      { name: 'CP', code: '5' },
      { name: 'CE 1', code: '4' },
      { name: 'CE 2', code: '3' },
      { name: 'CM 1', code: '2' },
      { name: 'CM 2', code: '1' }
    ];

    // Options pour les sections
    this.sections = [
      { name: 'A', code: 'A' },
      { name: 'B', code: 'B' },
      { name: 'C', code: 'C' },
      { name: 'S', code: 'S' },
      { name: 'ES', code: 'ES' },
      { name: 'L', code: 'L' }
    ];

    // Options pour les examens
    this.exams = [
      { name: 'Premier Trimestre', code: 'T1' },
      { name: 'Deuxième Trimestre', code: 'T2' },
      { name: 'Troisième Trimestre', code: 'T3' },
      { name: 'Bulletin Annuel', code: 'YEAR' }
    ];
  }

  searchStudents(): void {
    if ((!this.selectedClass || !this.selectedSection) && !this.searchQuery) {
      // Alerte: veuillez sélectionner une classe et une section ou entrer un terme de recherche
      return;
    }

    this.isLoading = true;

    // Dans un cas réel, vous feriez un appel API ici
    // Simulons des données pour notre exemple
    setTimeout(() => {
      // Simulons 5 Élèves aléatoires
      this.searchResults = Array.from({ length: 5 }, (_, i) => {
        return {
          id: i + 1,
          name: this.getRandomName(),
          rollNo: `S${String(i + 1).padStart(3, '0')}`,
          className: this.selectedClass ? this.selectedClass.name : this.getRandomClass(),
          section: this.selectedSection ? this.selectedSection.name : this.getRandomSection()
        };
      });

      this.isLoading = false;
    }, 800);
  }

  viewReportCard(student: StudentSearchResult): void {
    this.isLoading = true;

    // Dans un cas réel, vous feriez un appel API ici pour récupérer les données du bulletin
    // Simulons des données pour notre exemple
    setTimeout(() => {
      // Données de l'Élève
      this.studentData = {
        id: student.id,
        name: student.name,
        rollNo: student.rollNo,
        class: student.className,
        section: student.section,
        dob: '15/05/2007',
        parentName: 'Jean Dupont',
        address: '123 Rue de Paris, 75001 Paris',
        profileImage: 'assets/img/profiles/avatar-02.jpg',
        rank: '',
        subjects: [],
        average: 0,
        classAverage: 0,
        attendance: '',
        conduct: '',
        teacherRemarks: '',
        principalRemarks: '',
        schoolName: '',
        schoolYear: '',
        term: '',
        image: '',
        admissionNo: '',
        gender: 'Masculin',
        phone: '+237 6 55 98 45 18'
      };

      // Données des notes par matière
      const subjects = [
        { name: 'Communiquer en français', code: 'MATH', points : 30},
        { name: 'Communicate in english', code: 'FR', points : 30},
        { name: 'Pratiquer une langue nationale', code: 'HIST', points : 20 },
        { name: 'Utiliser les notions de base en mathématiques', code: 'PHYS', points : 40},
        { name: 'Utiliser les notions de base en sciences et technologies', code: 'SVT', points : 40},
        { name: 'Pratiquer les valeurs sociales', code: 'ENG', points : 20},
        { name: 'Pratiquer les valeurs citoyennes', code: 'EPS', points : 20},
        { name: "Démontrer l'autonomie, l'esprit d'initiative et de créativité et d'entrepreneuriat", code: 'EPS', points : 20},
        { name: 'Utiliser les concepts de base des les outils des TIC', code: 'EPS', points : 40},
        { name: 'Pratiquer les activités physiques et sportives pour les apprenants', code: 'EPS', points : 20},
        { name: 'Pratiquer les activités artistiques', code: 'EPS', points : 20}
      ];

      this.gradeData = subjects.map(subject => {
        const marks = Math.floor(Math.random() * 40) + 60; // Notes entre 60 et 100
        const maxMarks = 100;
        const percentage = (marks / maxMarks) * 100;

        return {
          subject: subject.name,
          marks: marks,
          maxMarks: maxMarks,
          percentage: percentage,
          grade: this.calculateGradeFromMarks(marks),
          remarks: this.getRemarkForGrade(this.calculateGradeFromMarks(marks))
        };
      });

      // Calcul des totaux
      this.obtainedMarks = this.gradeData.reduce((sum, item) => sum + item.marks, 0);
      this.totalMarks = this.gradeData.reduce((sum, item) => sum + item.maxMarks, 0);
      this.percentage = parseFloat(((this.obtainedMarks / this.totalMarks) * 100).toFixed(2));

      // Rang, résultat et remarques
      this.rank = `${Math.floor(Math.random() * 10) + 1} / 30`;
      this.result = this.percentage >= 50 ? 'ADMIS' : 'RECALÉ';
      this.remarks = this.getOverallRemarks(this.percentage);

      // Données de présence
      this.attendanceData = [
        {
          term: 'Premier Trimestre',
          present: 58,
          absent: 2,
          total: 60,
          percentage: 96.67
        },
        {
          term: 'Deuxième Trimestre',
          present: 55,
          absent: 5,
          total: 60,
          percentage: 91.67
        },
        {
          term: 'Troisième Trimestre',
          present: 57,
          absent: 3,
          total: 60,
          percentage: 95
        }
      ];

      this.isSearchMode = false;
      this.showBulletin = true;
      this.isLoading = false;
    }, 1000);
  }

  calculateGradeFromMarks(marks: number): string {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
  }

  getRemarkForGrade(grade: string): string {
    switch(grade) {
      case 'A+': return 'Excellent';
      case 'A': return 'Très bien';
      case 'B': return 'Bien';
      case 'C': return 'Assez bien';
      case 'D': return 'Passable';
      default: return 'Insuffisant';
    }
  }

  getOverallRemarks(percentage: number): string {
    if (percentage >= 90) return 'Excellent travail ! Continue ainsi.';
    if (percentage >= 80) return 'Très bon travail, continue tes efforts.';
    if (percentage >= 70) return 'Bon travail, peut encore progresser.';
    if (percentage >= 60) return 'Résultats satisfaisants, mais doit travailler davantage.';
    if (percentage >= 50) return 'Résultats moyens, des efforts sérieux sont nécessaires.';
    return 'Résultats insuffisants, un travail beaucoup plus soutenu est indispensable.';
  }

  getGradeClass(grade: string): string {
    switch(grade) {
      case 'A+': return 'grade-a-plus';
      case 'A': return 'grade-a';
      case 'B': return 'grade-b';
      case 'C': return 'grade-c';
      case 'D': return 'grade-d';
      default: return 'grade-f';
    }
  }

  getResultClass(result: string): string {
    return result === 'ADMIS' ? 'text-success' : 'text-danger';
  }

  printReportCard(): void {
    window.print();
  }

  exportAsPDF(): void {
    // Logique pour l'export PDF (à implémenter avec une bibliothèque comme jspdf)
    console.log('Export PDF déclenché');
  }

  backToSearch(): void {
    this.isSearchMode = true;
    this.showBulletin = false;
    this.studentData = null;
    this.gradeData = [];
    this.attendanceData = [];
  }

  // Noms fictifs pour la démo
  private getRandomName(indice?: number): string {
    const firstNames = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Thomas', 'Emma', 'Lucas', 'Camille', 'Hugo', 'Chloé', 'Léa', 'Maxime'];
    const lastNames = ['NLEME', 'NOUKAP', 'ONANA', 'MBARGA', 'ETOGA', 'OBIANG', 'NGONO', 'BISAI', 'ABOUBAKAR', 'TEKENG', 'AYISSI', 'ESSONO'];

    // Si un indice est fourni et qu'il est dans les limites valides
    if (indice !== undefined && indice >= 0 && indice < firstNames.length && indice < lastNames.length) {
      return `${firstNames[indice]} ${lastNames[indice]}`;
    }

    // Sinon, retourne un nom aléatoire
    const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirst} ${randomLast}`;
  }


  private getRandomClass(): string {
    const classes = ['SIL', 'CP', 'CE 1', 'CE 2', 'CM 1', 'CM 2'];
    return classes[Math.floor(Math.random() * classes.length)];
  }

  private getRandomSection(): string {
    const sections = ['A', 'B', 'C', 'S', 'ES', 'L'];
    return sections[Math.floor(Math.random() * sections.length)];
  }

  getEvaluationNote(evaluations: Evaluation[], typeValue: string): string {
    const evalFound = evaluations.find(e => e.type === typeValue);
    return evalFound ? String(evalFound.note ?? '') : '';
  }

  getEvaluationCote(evaluations: Evaluation[], typeValue: string): string {
    const evalFound = evaluations.find(e => e.type === typeValue);
    return evalFound ? evalFound.cote ?? '' : '';
  }

  getTotalNote(ua: any, shownTypes: any[]): number {
    return shownTypes.reduce((sum, type) => {
      const note = Number(this.getEvaluationNote(ua.evaluations, type.value));
      return sum + note;
    }, 0);
  }

  getAverageCote(ua: any, shownTypes: any[]): string {
    const cotes = ['A', 'B'];
    const index = Math.floor(Math.random() * cotes.length);
    return cotes[index];
  }

  filteredEvaluationTypes(mod: any): any[] {
    return this.evaluationTypes.filter(type => this.hasData(mod.unites, type));
  }

  hasData(unites: any[], type: any): boolean {
    return unites.some(ua => {
      const note = this.getEvaluationNote(ua.evaluations, type.value);
      const cote = this.getEvaluationCote(ua.evaluations, type.value);
      return (note !== null && note !== '') || (cote !== null && cote !== '');
    });
  }

  protected readonly DataService = DataService;
}
