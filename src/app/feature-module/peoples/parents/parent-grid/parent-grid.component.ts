import { Component, Renderer2 } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';
import { Router } from '@angular/router';
interface City {
  name: string,
  code: string
}
interface City2 {
  name: string,
  code: string
}
@Component({
    selector: 'app-parent-grid',
    templateUrl: './parent-grid.component.html',
    styleUrl: './parent-grid.component.scss',
    standalone: false
})
export class ParentGridComponent {
  public routes = routes;
  cities!: City[];
  cities2!: City2[];

  selectedCities1!: City[];
  selectedCities2!: City2[];

  constructor(private renderer: Renderer2, private router: Router) {
      this.cities = [
          {name: 'Janet', code: 'Janet'},
          {name: 'Joann', code: 'Joann'},
          {name: 'Kathleen', code: 'Kathleen'},
          {name: 'Gifford', code: 'Gifford'},
         
      ];
      this.cities = [
        {name: 'Janet', code: 'Janet'},
        {name: 'Joann', code: 'Joann'},
        {name: 'Kathleen', code: 'Kathleen'},
        {name: 'Gifford', code: 'Gifford'},
    ];
  }

  navigateToGigs() {
    // Remove the modal backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      this.renderer.removeChild(backdrop.parentNode, backdrop);
    }

    // Navigate to the specified route
    this.router.navigate(['peoples/students/student-details']);
  }
}
