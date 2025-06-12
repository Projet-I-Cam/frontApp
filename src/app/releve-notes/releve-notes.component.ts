import { Component } from '@angular/core';
import {routes} from "../shared/routes/routes";

@Component({
  selector: 'app-releve-notes',
  standalone: false,
  templateUrl: './releve-notes.component.html',
  styleUrl: './releve-notes.component.scss'
})
export class ReleveNotesComponent {


  print() {
    const printContents = document.getElementById('container-releve-notes')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // recharger pour restaurer l'état Angular
    }
  }

  protected readonly routes = routes;
}
