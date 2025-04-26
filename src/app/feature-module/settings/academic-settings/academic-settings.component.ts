import { Component } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { CommonService } from '../../../shared/common/common.service';

@Component({
    selector: 'app-academic-settings',
    templateUrl: './academic-settings.component.html',
    styleUrl: './academic-settings.component.scss',
    standalone: false
})
export class AcademicSettingsComponent {
  public routes = routes;
  base = '';
  page = '';
  last = '';
  constructor(
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
}
