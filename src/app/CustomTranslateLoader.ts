import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    const translations = require(`../assets/i18n/${lang}.json`);
    return of(translations);
  }
}