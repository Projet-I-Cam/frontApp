import { Component } from '@angular/core';

@Component({
    selector: 'app-localization',
    templateUrl: './localization.component.html',
    styleUrl: './localization.component.scss',
    standalone: false
})
export class LocalizationComponent {
  values: string[] = ['JPG', 'Spanish','PNG'];
}
