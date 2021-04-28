import { Injectable } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly baseThemes = new Map<string, string>();

  // private readonly themeChange$ = new Subject<{name: string, previous: string}>();

  constructor(private readonly nbTheme: NbThemeService) {
    this.baseThemes.set('dark', 'assets/dark_with_css_vars.css');
    this.baseThemes.set('default', 'assets/default_with_css_vars.css');
  }

  get currentTheme() {
    return this.nbTheme.currentTheme;
  }

  onThemeChange() {
    return this.nbTheme.onThemeChange();
  }

  changeTheme(name: string) {
    if (name === this.currentTheme) {
      return;
    }
    const themeLink = document?.head?.querySelector('link#theme');
    if (themeLink && this.baseThemes.has(name)) {
      const newThemeLink = themeLink.cloneNode() as HTMLLinkElement;
      newThemeLink.href = this.baseThemes.get(name)!;
      newThemeLink.onload = () => {
        this.nbTheme.changeTheme(name);
        themeLink?.remove();
      };
      document.head.appendChild(newThemeLink);
    }
  }
}
