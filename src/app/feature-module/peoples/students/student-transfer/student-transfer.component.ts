import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { StudentTransfer } from '../../../../shared/model/pages.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-student-transfer',
    templateUrl: './student-transfer.component.html',
    styleUrls: ['./student-transfer.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class StudentTransferComponent implements OnInit {
  public routes = routes;
  transferForm: FormGroup;
  studentTransfers: StudentTransfer[] = [];
  displayedColumns: string[] = ['ID Élève', 'Date', 'De', 'Vers', 'Statut', 'Actions'];
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.transferForm = this.fb.group({
      studentId: ['', Validators.required],
      transferDate: ['', Validators.required],
      fromSchool: ['', Validators.required],
      toSchool: ['', Validators.required],
      reason: ['', Validators.required],
      transferCertificateNumber: ['', Validators.required],
      status: ['En attente', Validators.required],
      documents: [[]]
    });
  }

  ngOnInit(): void {
    // Charger les transferts existants (dans un cas réel, cela viendrait d'un service)
    this.loadMockData();
  }

  loadMockData() {
    this.studentTransfers = [
      {
        studentId: 'ST-23-1234-ABC12',
        transferDate: '2023-06-15',
        fromSchool: 'École Primaire Saint-Jean',
        toSchool: 'Collège Notre-Dame',
        reason: 'Déménagement familial',
        transferCertificateNumber: 'TC-2023-001',
        status: 'Terminé',
        documents: ['certificate.pdf', 'approval.pdf']
      },
      {
        studentId: 'ST-23-5678-DEF34',
        transferDate: '2023-09-01',
        fromSchool: 'Lycée du Parc',
        toSchool: 'École internationale',
        reason: 'Programme d\'échange',
        transferCertificateNumber: 'TC-2023-045',
        status: 'En attente',
        documents: ['request.pdf']
      }
    ];
  }

  onSubmit() {
    if (this.transferForm.valid) {
      const newTransfer: StudentTransfer = this.transferForm.value;
      
      // Dans un cas réel, envoyer au service
      console.log('Nouveau transfert à enregistrer:', newTransfer);
      
      // Ajouter à la liste pour la démonstration
      this.studentTransfers.unshift(newTransfer);
      
      // Réinitialiser le formulaire
      this.transferForm.reset({
        status: 'En attente',
        documents: []
      });
    } else {
      // Marquer tous les champs comme touchés pour afficher les validations
      Object.keys(this.transferForm.controls).forEach(key => {
        this.transferForm.get(key)?.markAsTouched();
      });
    }
  }

  updateTransferStatus(transferId: string, newStatus: string) {
    // Dans un cas réel, mettre à jour via un service
    const transferIndex = this.studentTransfers.findIndex(transfer => transfer.studentId === transferId);
    if (transferIndex !== -1) {
      this.studentTransfers[transferIndex].status = newStatus;
    }
  }

  deleteTransfer(transferId: string) {
    // Dans un cas réel, supprimer via un service
    this.studentTransfers = this.studentTransfers.filter(transfer => transfer.studentId !== transferId);
  }

  uploadDocument(event: any) {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      const fileNames = Array.from(files).map(file => (file as File).name);
      
      // Dans un cas réel, envoyer les fichiers à un service de stockage
      // Ici, nous stockons simplement les noms pour la démonstration
      this.transferForm.patchValue({
        documents: [...this.transferForm.get('documents')?.value || [], ...fileNames]
      });
    }
  }
} 