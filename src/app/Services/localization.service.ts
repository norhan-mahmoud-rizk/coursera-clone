import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  private readonly LANGUAGE_KEY = 'language';

  constructor() {}

  setLanguage(lang: string) {
    localStorage.setItem(this.LANGUAGE_KEY, lang);
  }

  getLanguage(): string {
    return localStorage.getItem(this.LANGUAGE_KEY) || 'en'; // اللغة الافتراضية
  }
}
