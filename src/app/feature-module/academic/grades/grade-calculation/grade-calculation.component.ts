import { Component, OnInit } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../../../../shared/shared.module';

interface Student {
  id: number;
  rollNo: string;
  name: string;
  rank: string;
  totalMarks: number;
  percentage: number;
  result: string;
  subjects: Array<{
    name: string;
    marks: number;
    maxMarks: number;
    grade: string;
  }>;
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

@Component({
  selector: 'app-grade-calculation',
  templateUrl: './grade-calculation.component.html',
  styleUrls: ['./grade-calculation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    DropdownModule,
    SharedModule
  ]
})
export class GradeCalculationComponent implements OnInit {
  public routes = routes;
  
  // Options pour les dropdowns
  classes: ClassData[] = [];
  sections: SectionData[] = [];
  exams: ExamData[] = [];
  
  // Sélections actuelles
  selectedClass: ClassData | undefined;
  selectedSection: SectionData | undefined;
  selectedExam: ExamData | undefined;
  
  // Liste des Élèves avec leurs notes calculées
  students: Student[] = [];
  
  // État du composant
  isLoading: boolean = false;
  hasCalculated: boolean = false;
  
  constructor() {}
  
  ngOnInit(): void {
    this.loadDropdownOptions();
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
  
  calculateGrades(): void {
    if (!this.selectedClass || !this.selectedSection || !this.selectedExam) {
      return;
    }
    
    this.isLoading = true;
    
    // Simuler un chargement de données
    setTimeout(() => {
      // Générer des données d'exemples pour les Élèves
      const subjects = ['Mathématiques', 'Français', 'Histoire-Géographie', 'Physique-Chimie', 'SVT', 'Anglais', 'Éducation Physique'];
      
      this.students = Array.from({ length: 10 }, (_, i) => {
        const studentSubjects = subjects.map(subject => {
          const marks = Math.floor(Math.random() * 20) + 1; // Notes entre 1 et 20
          const maxMarks = 20;
          return {
            name: subject,
            marks: marks,
            maxMarks: maxMarks,
            grade: this.calculateGradeFromMarks(marks)
          };
        });
        
        const totalMarks = studentSubjects.reduce((sum, subject) => sum + subject.marks, 0);
        const maxPossibleMarks = studentSubjects.reduce((sum, subject) => sum + subject.maxMarks, 0);
        const percentage = parseFloat(((totalMarks / maxPossibleMarks) * 100).toFixed(2));
        
        return {
          id: i + 1,
          rollNo: `S${String(i + 1).padStart(3, '0')}`,
          name: this.getRandomName(),
          rank: `${i + 1}`,
          totalMarks: totalMarks,
          percentage: percentage,
          result: percentage >= 50 ? 'ADMIS' : 'RECALÉ',
          subjects: studentSubjects
        };
      });
      
      // Trier les Élèves par pourcentage (du plus haut au plus bas)
      this.students.sort((a, b) => b.percentage - a.percentage);
      
      // Mettre à jour les rangs après le tri
      this.students.forEach((student, index) => {
        student.rank = `${index + 1}`;
      });
      
      this.isLoading = false;
      this.hasCalculated = true;
    }, 1000);
  }
  
  resetCalculation(): void {
    this.hasCalculated = false;
    this.students = [];
    this.selectedClass = undefined;
    this.selectedSection = undefined;
    this.selectedExam = undefined;
  }
  
  exportAsPDF(): void {
    // Logique pour l'export PDF (à implémenter avec une bibliothèque comme jspdf)
    console.log('Export PDF déclenché');
  }
  
  exportAsExcel(): void {
    // Logique pour l'export Excel (à implémenter avec une bibliothèque comme xlsx)
    console.log('Export Excel déclenché');
  }
  
  getResultClass(result: string): string {
    return result === 'ADMIS' ? 'text-success' : 'text-danger';
  }
  
  getGradeClass(grade: string): string {
    switch(grade) {
      case 'A+': return 'text-success';
      case 'A': return 'text-success';
      case 'B': return 'text-primary';
      case 'C': return 'text-info';
      case 'D': return 'text-warning';
      default: return 'text-danger';
    }
  }
  
  calculateGradeFromMarks(marks: number): string {
    if (marks >= 19) return 'A+';
    if (marks >= 16) return 'A';
    if (marks >= 14) return 'B';
    if (marks >= 12) return 'C';
    if (marks >= 10) return 'D';
    return 'F';
  }
  
  // Noms fictifs pour la démo
  private getRandomName(): string {
    const firstNames = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Thomas', 'Emma', 'Lucas', 'Camille', 'Hugo', 'Chloé', 'Léa', 'Maxime'];
    const lastNames = ['Dupont', 'Martin', 'Durand', 'Lefebvre', 'Moreau', 'Bernard', 'Thomas', 'Robert', 'Richard', 'Petit', 'Leroy', 'Simon'];
    
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  }
} 