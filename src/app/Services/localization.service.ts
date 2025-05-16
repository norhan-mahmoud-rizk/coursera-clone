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
    this.translate.use(lang);
    
    // ✅ غيّر اتجاه الصفحة بالكامل بناءً على اللغة
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  getLanguage(): string {
    return localStorage.getItem(this.LANGUAGE_KEY) || 'en';
  }

  initLanguage(): void {
    const savedLang = this.getLanguage();
    this.translate.use(savedLang);

    // ✅ برضو نضبط الاتجاه لما التطبيق يشتغل
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  }
}
