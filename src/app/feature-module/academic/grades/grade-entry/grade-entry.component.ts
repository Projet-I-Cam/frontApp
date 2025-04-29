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
  image: string;
}

interface ClassData {
  name: string;
  code: string;
}

interface SectionData {
  name: string;
  code: string;
}

interface SubjectData {
  name: string;
  code: string;
}

interface GradeData {
  studentId: number;
  studentName: string;
  studentRollNo: string;
  marks: number;
  outOf: number;
  grade: string;
  remarks: string;
}

@Component({
    selector: 'app-grade-entry',
    templateUrl: './grade-entry.component.html',
    styleUrls: ['./grade-entry.component.scss'],
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
export class GradeEntryComponent implements OnInit {
  public routes = routes;
  
  // Options pour les dropdowns
  classes: ClassData[] = [];
  sections: SectionData[] = [];
  subjects: SubjectData[] = [];
  
  // Sélections actuelles
  selectedClass: ClassData | undefined;
  selectedSection: SectionData | undefined;
  selectedSubject: SubjectData | undefined;
  
  // Liste des Élèves
  students: Student[] = [];
  grades: GradeData[] = [];
  
  // État du composant
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  hasLoaded: boolean = false;
  
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
    
    // Options pour les matières
    this.subjects = [
      { name: 'Mathématiques', code: 'MATH' },
      { name: 'Français', code: 'FR' },
      { name: 'Histoire-Géographie', code: 'HIST' },
      { name: 'Physique-Chimie', code: 'PHYS' },
      { name: 'SVT', code: 'SVT' },
      { name: 'Anglais', code: 'ENG' },
      { name: 'Éducation Physique', code: 'EPS' }
    ];
  }
  
  loadStudents(): void {
    if (!this.selectedClass || !this.selectedSection || !this.selectedSubject) {
      return;
    }
    
    this.isLoading = true;
    
    // Simuler un chargement de données
    setTimeout(() => {
      // Générer des données d'exemple pour les Élèves
      this.students = Array.from({ length: 10 }, (_, i) => {
        return {
          id: i + 1,
          rollNo: `S${String(i + 1).padStart(3, '0')}`,
          name: this.getRandomName(),
          image: `assets/img/profiles/avatar-0${(i % 9) + 1}.jpg`
        };
      });
      
      // Initialiser les notes pour ces Élèves
      this.grades = this.students.map(student => {
        return {
          studentId: student.id,
          studentName: student.name,
          studentRollNo: student.rollNo,
          marks: 0,
          outOf: 20,
          grade: '',
          remarks: ''
        };
      });
      
      this.isLoading = false;
      this.hasLoaded = true;
    }, 1000);
  }
  
  onMarksChange(grade: GradeData): void {
    // Limiter la note entre 0 et outOf
    if (grade.marks < 0) grade.marks = 0;
    if (grade.marks > grade.outOf) grade.marks = grade.outOf;
    
    // Calculer le grade
    grade.grade = this.calculateGradeFromMarks(grade.marks);
  }
  
  saveGrades(): void {
    this.isSubmitting = true;
    
    // Simuler une soumission de données
    setTimeout(() => {
      console.log('Grades saved:', this.grades);
      this.isSubmitting = false;
      
      // Réinitialiser le formulaire
      this.selectedClass = undefined;
      this.selectedSection = undefined;
      this.selectedSubject = undefined;
      this.students = [];
      this.grades = [];
      this.hasLoaded = false;
      
      // Afficher un message de succès (à implémenter)
    }, 1000);
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