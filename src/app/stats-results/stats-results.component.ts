import { Component } from '@angular/core';
import {routes} from "../shared/routes/routes";

@Component({
  selector: 'app-stats-results',
  standalone: false,
  templateUrl: './stats-results.component.html',
  styleUrl: './stats-results.component.scss'
})
export class StatsResultsComponent {


  print() {
    const printContents = document.getElementById('container-stats-results')?.innerHTML;
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
