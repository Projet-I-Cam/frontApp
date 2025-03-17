import { Component, Renderer2 } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { CommonService } from '../../../shared/common/common.service';

@Component({
    selector: 'app-website-settings',
    templateUrl: './website-settings.component.html',
    styleUrl: './website-settings.component.scss',
    standalone: false
})
export class WebsiteSettingsComponent {

  base = '';
  page = '';
  last = '';
  constructor(
    private renderer: Renderer2,
    private common: CommonService
  ) {

    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.page.subscribe((res: string) => {
      this.last = res;
    });
    
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
  public routes = routes;
}
