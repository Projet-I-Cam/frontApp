import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Modal} from "bootstrap";

@Component({
  selector: 'app-grade-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grade-modal.component.html',
  styleUrls: ['./grade-modal.component.scss']
})
export class GradeModalComponent implements OnChanges {
  @Input() grade: any;
  @Input() subject : any;
  @Output() marksUpdated = new EventEmitter<number>();


  subGrades: { [key: string]: number } = {
    oral: 0,
    ecrit: 0,
    pratique: 0,
    savoirEtre: 0,
  };

  maxValues : { [key: string]: number } = {
    oral: 12,
    ecrit: 15,
    pratique: 6,
    savoirEtre: 3
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['grade'] && this.grade?.subGrades) {
      this.subGrades = { ...this.grade.subGrades };
    }

    if (changes['subject'] && this.subject?.name) {
      console.log('Nouveau sujet sélectionné :', this.subject.name);
    }
  }

  get total(): number {
    return (
      this.subGrades['oral'] +
      this.subGrades['ecrit'] +
      this.subGrades['pratique'] +
      this.subGrades['savoirEtre']
    );
  }

  save() {
    this.grade.subGrades = { ...this.subGrades };
    this.marksUpdated.emit(this.total);

    const modalElement = document.getElementById('gradeModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
}
