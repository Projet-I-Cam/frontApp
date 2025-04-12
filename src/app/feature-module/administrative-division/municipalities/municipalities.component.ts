import { Component } from '@angular/core';

import { Municipality } from '../../../parseClass';
import { globalGet } from '../../../services/statefull/http';

@Component({
  selector: 'app-municipalities',
  standalone: false,
  templateUrl: './municipalities.component.html',
  styleUrl: './municipalities.component.scss'
})
export class MunicipalitiesComponent {
  constructor() {
      this.getMunicipality()
  }

  async getMunicipality() {
    const municipality = await globalGet(
      {
        T: Municipality,
        filters: {
          //department: {className: 'Department', objectId: 'msQcMieHZf'}, //si je veux lire tous les arrondissement qui ont pour departement d'id msQcMieHZf vue que departement est une classe jointe alors j'utilise cette syntax
          name: "Yakokombo" // ici je veux prendre l'arrondissement qui a le nom Yakokombo
          //Ici je passe autant de filtre que je souhaite et ceci en accord avec les attribut de la classe tous visible dans le dashboard de par se server
        },
        isOne: true, // je veux 1 seule si non je le laisse a null ou undefined
        includes: ['department'] // les includes
      },
      
    )
    console.log(' municipality municipality municipality ', municipality)
  }
} 