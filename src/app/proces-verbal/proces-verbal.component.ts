import { Component } from '@angular/core';
import {routes} from "../shared/routes/routes";

@Component({
  selector: 'app-proces-verbal',
  standalone: false,
  templateUrl: './proces-verbal.component.html',
  styleUrl: './proces-verbal.component.scss'
})
export class ProcesVerbalComponent {

  protected readonly routes = routes;


  // Fonction pour imprimer le procès verbal
  print() {
    const printContents = document.getElementById('container-proces-verbal')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // recharger pour restaurer l'état Angular
    }
  }
}
