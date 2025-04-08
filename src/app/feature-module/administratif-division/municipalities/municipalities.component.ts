import { Component } from '@angular/core';

import { Arrondissement } from '../../../parseClass';
import { globalGet } from '../../../services/statefull/localisation';

@Component({
  selector: 'app-municipalities',
  standalone: false,
  templateUrl: './municipalities.component.html',
  styleUrl: './municipalities.component.scss'
})
export class MunicipalitiesComponent {
  constructor() {
      this.getArrond()
  }

  async  getArrond(){
    const arrond = await globalGet(
      {
        T: Arrondissement,
        filters: {
          departement: {className: 'Departement', objectId: 'msQcMieHZf'},
          objectId: "qRyY0t17Xc"
        },
        isOne: true,
        includes: ['departement',]
      },
      
    )
    console.log(' arrond arrond arrond ', arrond)
  }
}
 