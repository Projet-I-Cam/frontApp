import { Component, Renderer2 } from '@angular/core';
import { routes } from '../../../../shared/routes/routes';

@Component({
    selector: 'app-student-grid',
    templateUrl: './student-grid.component.html',
    styleUrl: './student-grid.component.scss',
    standalone: false
})
export class StudentGridComponent {
  public routes = routes;
  constructor(
    private renderer: Renderer2,

  ) {


    
  }
  public handleApplyClick = () => {
    const modalElements = document.getElementsByClassName('drop-width');
    if (modalElements.length > 0) {
      for (let i = 0; i < modalElements.length; i++) {
        const modalElement = modalElements[i];
        this.renderer.removeClass(modalElement, 'show');
      }
    }
  };
}
