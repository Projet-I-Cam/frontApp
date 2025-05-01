import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  // Méthode générique pour afficher une alerte
  showAlert(title: string, message: string, icon: SweetAlertIcon = 'info', timer?: number) {
    return Swal.fire({
      title,
      text: message,
      icon,
      timer,
      timerProgressBar: !!timer,
      confirmButtonText: 'OK'
    });
  }

  // Alertes spécifiques
  showSuccess(message: string, title: string = 'Succès') {
    return this.showAlert(title, message, 'success', 3000);
  }

  showError(message: string, title: string = 'Erreur') {
    return this.showAlert(title, message, 'error');
  }

  showWarning(message: string, title: string = 'Attention') {
    return this.showAlert(title, message, 'warning');
  }

  showInfo(message: string, title: string = 'Information') {
    return this.showAlert(title, message, 'info');
  }
}