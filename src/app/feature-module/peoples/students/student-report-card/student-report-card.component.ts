import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { StudentReportCard, SubjectPerformance } from '../../../../shared/model/pages.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-student-report-card',
    templateUrl: './student-report-card.component.html',
    styleUrls: ['./student-report-card.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class StudentReportCardComponent implements OnInit {
  public routes = routes;
  searchForm: FormGroup;
  reportCards: StudentReportCard[] = [];
  selectedReport: StudentReportCard | null = null;
  isPrinting: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      studentId: ['', Validators.required],
      academicYear: ['', Validators.required],
      examType: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMockData();
  }

  loadMockData() {
    this.reportCards = [
      {
        studentId: 'ST-23-1234-ABC12',
        academicYear: '2023-2024',
        class: 'III',
        section: 'A',
        examType: 'Trimestre 1',
        subjects: [
          { subject: 'Mathématiques', marksObtained: 85, maxMarks: 100, grade: 'A' },
          { subject: 'Sciences', marksObtained: 78, maxMarks: 100, grade: 'B' },
          { subject: 'Français', marksObtained: 92, maxMarks: 100, grade: 'A+' },
          { subject: 'Histoire-Géographie', marksObtained: 88, maxMarks: 100, grade: 'A' },
          { subject: 'Anglais', marksObtained: 75, maxMarks: 100, grade: 'B' }
        ],
        totalMarks: 418,
        percentage: 83.6,
        grade: 'A',
        rank: 3,
        teacherRemarks: 'Élève sérieux et appliqué, bonne progression ce trimestre.',
        principalRemarks: 'Bon travail, continuez ainsi !',
        attendanceRecord: {
          totalDays: 60,
          daysPresent: 58,
          daysAbsent: 2,
          percentage: 96.7
        },
        issuedDate: '2023-12-15'
      },
      {
        studentId: 'ST-23-5678-DEF34',
        academicYear: '2023-2024',
        class: 'V',
        section: 'B',
        examType: 'Trimestre 2',
        subjects: [
          { subject: 'Mathématiques', marksObtained: 92, maxMarks: 100, grade: 'A+' },
          { subject: 'Sciences', marksObtained: 88, maxMarks: 100, grade: 'A' },
          { subject: 'Français', marksObtained: 85, maxMarks: 100, grade: 'A' },
          { subject: 'Histoire-Géographie', marksObtained: 79, maxMarks: 100, grade: 'B+' },
          { subject: 'Anglais', marksObtained: 90, maxMarks: 100, grade: 'A+' }
        ],
        totalMarks: 434,
        percentage: 86.8,
        grade: 'A',
        rank: 2,
        teacherRemarks: 'Excellent travail, particulièrement en mathématiques et anglais.',
        principalRemarks: 'Performances exemplaires, félicitations !',
        attendanceRecord: {
          totalDays: 62,
          daysPresent: 61,
          daysAbsent: 1,
          percentage: 98.4
        },
        issuedDate: '2024-03-20'
      }
    ];
  }

  generateTestData() {
    const subjects = [
      { subject: 'Mathématiques', marksObtained: this.getRandomMark(), maxMarks: 100, grade: '' },
      { subject: 'Sciences', marksObtained: this.getRandomMark(), maxMarks: 100, grade: '' },
      { subject: 'Français', marksObtained: this.getRandomMark(), maxMarks: 100, grade: '' },
      { subject: 'Histoire-Géographie', marksObtained: this.getRandomMark(), maxMarks: 100, grade: '' },
      { subject: 'Anglais', marksObtained: this.getRandomMark(), maxMarks: 100, grade: '' }
    ];
    
    // Calcul des grades pour chaque matière
    subjects.forEach(subj => {
      subj.grade = this.calculateGrade(subj.marksObtained);
    });
    
    // Calcul du total et du pourcentage
    const totalMarks = subjects.reduce((acc, subj) => acc + subj.marksObtained, 0);
    const percentage = totalMarks / (subjects.length * 100) * 100;
    
    return {
      studentId: this.searchForm.get('studentId')?.value,
      academicYear: this.searchForm.get('academicYear')?.value,
      class: 'IV',
      section: 'A',
      examType: this.searchForm.get('examType')?.value,
      subjects: subjects,
      totalMarks: totalMarks,
      percentage: parseFloat(percentage.toFixed(1)),
      grade: this.calculateGrade(percentage),
      rank: Math.floor(Math.random() * 10) + 1,
      teacherRemarks: 'Élève sérieux et appliqué.',
      principalRemarks: 'Bon travail, continuez ainsi !',
      attendanceRecord: {
        totalDays: 60,
        daysPresent: Math.floor(Math.random() * 10) + 50,
        daysAbsent: 0, // Calculé ci-dessous
        percentage: 0 // Calculé ci-dessous
      },
      issuedDate: new Date().toISOString().split('T')[0]
    };
  }
  
  getRandomMark(): number {
    return Math.floor(Math.random() * 31) + 70; // Entre 70 et 100
  }
  
  calculateGrade(percentage: number): string {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  }

  searchReport() {
    if (this.searchForm.valid) {
      // Simuler une recherche dans une base de données
      // Dans une application réelle, ce serait un appel au backend
      const studentId = this.searchForm.get('studentId')?.value;
      const academicYear = this.searchForm.get('academicYear')?.value;
      const examType = this.searchForm.get('examType')?.value;
      
      // Chercher un bulletin existant
      this.selectedReport = this.reportCards.find(
        report => report.studentId === studentId && 
                 report.academicYear === academicYear && 
                 report.examType === examType
      ) || null;
      
      // Si aucun bulletin n'est trouvé, on génère des données de test
      if (!this.selectedReport) {
        this.selectedReport = this.generateTestData();
        
        // Calculer les jours d'absence et le pourcentage de présence
        this.selectedReport.attendanceRecord.daysAbsent = 
          this.selectedReport.attendanceRecord.totalDays - this.selectedReport.attendanceRecord.daysPresent;
        
        this.selectedReport.attendanceRecord.percentage = 
          (this.selectedReport.attendanceRecord.daysPresent / this.selectedReport.attendanceRecord.totalDays) * 100;
        
        // Ajouter à la liste des bulletins
        this.reportCards.push(this.selectedReport);
      }
    } else {
      // Marquer tous les champs comme touchés pour afficher les validations
      Object.keys(this.searchForm.controls).forEach(key => {
        this.searchForm.get(key)?.markAsTouched();
      });
    }
  }

  printReport() {
    this.isPrinting = true;
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
    }, 500);
  }

  closeReport() {
    this.selectedReport = null;
    this.searchForm.reset();
  }
} 