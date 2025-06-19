import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { StudentTransfer } from '../../../../shared/model/pages.model';

@Component({
  selector: 'app-add-student-transfert',
  standalone: false,
  templateUrl: './add-student-transfert.component.html',
  styleUrl: './add-student-transfert.component.scss'
})
export class AddStudentTransfertComponent {
transferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {
    this.transferForm = this.fb.group({
      studentId: ['', Validators.required],
      studentName: ['', Validators.required],
      transferDate: ['', Validators.required],
      fromSchool: ['', Validators.required],
      toSchool: ['', Validators.required],
      reason: ['', Validators.required],
      transferCertificateNumber: ['', Validators.required],
      status: ['En attente', Validators.required],
      documents: [[]]
    });
  }

  onSubmit() {
    if (this.transferForm.valid) {
      const newTransfer: StudentTransfer = this.transferForm.value;
      this.ref.close(newTransfer);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir tous les champs obligatoires'
      });
    }
  }

  uploadDocument(event: any) {
    if (event.target.files?.length) {
      const files = event.target.files;
      const fileNames = Array.from(files).map(file => (file as File).name);
      this.transferForm.patchValue({
        documents: [...this.transferForm.get('documents')?.value || [], ...fileNames]
      });
    }
  }
}
