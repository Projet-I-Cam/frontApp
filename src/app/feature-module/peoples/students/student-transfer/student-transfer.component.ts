import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../../../../shared/routes/routes';
import { StudentTransfer } from '../../../../shared/model/pages.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddStudentTransfertComponent } from '../add-student-transfert/add-student-transfert.component';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-student-transfer',
  templateUrl: './student-transfer.component.html',
  styleUrls: ['./student-transfer.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService],
  standalone: false
})
export class StudentTransferComponent implements OnInit {
  @ViewChild('dt') dt!: any;

  public routes = routes;
  studentTransfers: any[] = [];
  loading = false;
  ref: DynamicDialogRef | undefined;
  filteredTransfers: any[] = [];
  statuses = [
    { label: 'En attente', value: 'En attente' },
    { label: 'En cours', value: 'En cours' },
    { label: 'Approuvé', value: 'Approuvé' },
    { label: 'Rejeté', value: 'Rejeté' },
    { label: 'Terminé', value: 'Terminé' }
  ];
     // Filter properties

  searchValue: string = '';
  studentIdFilter: string = '';
  studentNameFilter: string = '';
  fromSchoolFilter: string = '';
  toSchoolFilter: string = '';
  statusFilter: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadMockData();
  }

   applyFilters() {
    this.filteredTransfers = this.studentTransfers.filter(transfer => {
      return (
        (!this.studentIdFilter || transfer.studentId.toLowerCase().includes(this.studentIdFilter.toLowerCase())) &&
        (!this.studentNameFilter || transfer.studentName.toLowerCase().includes(this.studentNameFilter.toLowerCase())) &&
        (!this.fromSchoolFilter || transfer.fromSchool.toLowerCase().includes(this.fromSchoolFilter.toLowerCase())) &&
        (!this.toSchoolFilter || transfer.toSchool.toLowerCase().includes(this.toSchoolFilter.toLowerCase())) &&
        (!this.statusFilter || transfer.status === this.statusFilter)
      );
    });
  }

  loadMockData() {
    this.loading = true;
    setTimeout(() => {
      this.studentTransfers = [
        {
          studentId: 'ST-23-1234-ABC12',
          studentName: 'Jean Dupont',
          transferDate: new Date('2023-06-15'),
          fromSchool: 'École Primaire Saint-Jean',
          toSchool: 'Collège Notre-Dame',
          reason: 'Déménagement familial',
          transferCertificateNumber: 'TC-2023-001',
          status: 'Terminé',
          documents: ['certificate.pdf', 'approval.pdf']
        },
        {
          studentId: 'ST-23-5678-DEF34',
          studentName: 'Marie Lambert',
          transferDate: new Date('2023-09-01'),
          fromSchool: 'Lycée du Parc',
          toSchool: 'École internationale',
          reason: 'Programme d\'échange',
          transferCertificateNumber: 'TC-2023-045',
          status: 'En attente',
          documents: ['request.pdf']
        }
      ];
      this.loading = false;
      this.filteredTransfers = [...this.studentTransfers];
    }, 1000);
  }

  openAddTransferDialog() {
    this.ref = this.dialogService.open(AddStudentTransfertComponent, {
      header: 'Nouveau transfert d\'élève',
      width: '70%',
      contentStyle: { 'max-height': '800px', overflow: 'auto' },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((transfer: StudentTransfer) => {
      if (transfer) {
        this.studentTransfers.unshift(transfer);
        this.filteredTransfers.unshift(transfer);

        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Transfert ajouté avec succès'
        });
      }
    });
  }

  updateTransferStatus(transferId: string, newStatus: string) {
    const transfer = this.studentTransfers.find(t => t.studentId === transferId);
    if (transfer) {
      transfer.status = newStatus;
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Statut mis à jour'
      });
    }
  }

  confirmDelete(transferId: string) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce transfert?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTransfer(transferId);
      }
    });
  }

  deleteTransfer(transferId: string) {
    this.studentTransfers = this.studentTransfers.filter(t => t.studentId !== transferId);
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Transfert supprimé'
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Terminé':
      case 'Approuvé':
        return 'success';
      case 'En attente':
        return 'warning';
      case 'Rejeté':
        return 'danger';
      case 'En cours':
        return 'info';
      default:
        return null;
    }
  }
}

