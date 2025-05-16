import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  private readonly LANGUAGE_KEY = 'language';

  constructor(private translate: TranslateService) {}

  setLanguage(lang: string) {
    localStorage.setItem(this.LANGUAGE_KEY, lang);
    this.translate.use(lang); // استخدم اللغة مباشرة عند تغييرها
  }

  getLanguage(): string {
    return localStorage.getItem(this.LANGUAGE_KEY) || 'en'; // اللغة الافتراضية
  }

  initLanguage(): void {
    const savedLang = this.getLanguage();
    if (savedLang === 'en') {
      this.translate.use('en');
    } else {
      this.translate.use('ar');
    }
  }
}
