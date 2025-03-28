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

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
  standalone: true,
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
  academicYear: string = '2023-2024';
  reportDate: Date = new Date();
  
  // Données exemple pour les élèves
  students = [
    { id: 1, name: 'Jean Dupont', image: 'assets/img/profiles/avatar-01.jpg' },
    { id: 2, name: 'Marie Martin', image: 'assets/img/profiles/avatar-02.jpg' },
    { id: 3, name: 'Pierre Durand', image: 'assets/img/profiles/avatar-03.jpg' }
  ];
  
  // Données exemple pour les périodes
  terms = [
    { name: '1er Trimestre', value: 'trimestre1' },
    { name: '2ème Trimestre', value: 'trimestre2' },
    { name: '3ème Trimestre', value: 'trimestre3' }
  ];
  
  // Sélections pour le formulaire
  selectedStudent: any;
  selectedTerm: any;
  
  constructor() {}
  
  ngOnInit(): void {
    this.loadDropdownOptions();
  }
  
  // Fonction pour générer le bulletin
  generateBulletin() {
    this.showBulletin = true;
    // Simuler des données de bulletin
    this.studentData = {
      id: 1,
      name: 'Jean Dupont',
      rollNo: 'S001',
      class: 'Sixième A',
      section: 'A',
      dob: '15/05/2007',
      parentName: 'Jean Dupont Sr.',
      address: '123 Rue de Paris, 75001 Paris',
      profileImage: 'assets/img/profiles/avatar-01.jpg',
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
      schoolName: 'École Primaire La Fontaine',
      schoolYear: '2023-2024',
      term: '1er Trimestre',
      image: 'assets/img/profiles/avatar-01.jpg',
      admissionNo: 'ADM-001'
    };
  }
  
  // Fonction pour imprimer le bulletin
  printBulletin() {
    window.print();
  }
  
  loadDropdownOptions(): void {
    // Options pour les classes
    this.classes = [
      { name: 'Sixième', code: '6' },
      { name: 'Cinquième', code: '5' },
      { name: 'Quatrième', code: '4' },
      { name: 'Troisième', code: '3' },
      { name: 'Seconde', code: '2' },
      { name: 'Première', code: '1' },
      { name: 'Terminale', code: 'T' }
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
        admissionNo: ''
      };
      
      // Données des notes par matière
      const subjects = ['Mathématiques', 'Français', 'Histoire-Géographie', 'Physique-Chimie', 'Anglais', 'SVT', 'Éducation Physique'];
      this.gradeData = subjects.map(subject => {
        const marks = Math.floor(Math.random() * 40) + 60; // Notes entre 60 et 100
        const maxMarks = 100;
        const percentage = (marks / maxMarks) * 100;
        
        return {
          subject: subject,
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
  private getRandomName(): string {
    const firstNames = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Thomas', 'Emma', 'Lucas', 'Camille', 'Hugo', 'Chloé', 'Léa', 'Maxime'];
    const lastNames = ['Dupont', 'Martin', 'Durand', 'Lefebvre', 'Moreau', 'Bernard', 'Thomas', 'Robert', 'Richard', 'Petit', 'Leroy', 'Simon'];
    
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  }
  
  private getRandomClass(): string {
    const classes = ['Sixième', 'Cinquième', 'Quatrième', 'Troisième', 'Seconde', 'Première', 'Terminale'];
    return classes[Math.floor(Math.random() * classes.length)];
  }
  
  private getRandomSection(): string {
    const sections = ['A', 'B', 'C', 'S', 'ES', 'L'];
    return sections[Math.floor(Math.random() * sections.length)];
  }
} 