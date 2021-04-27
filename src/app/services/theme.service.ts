import { Injectable } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Injectable()
export class ThemeService extends NbThemeService {
  changeTheme(name: string) {
    const themeLink = document?.head?.querySelector('link#theme');
    if (themeLink) {
      const newThemeLink = themeLink.cloneNode() as HTMLLinkElement;
      newThemeLink.href = 'assets/dark_with_css_vars.css';
      newThemeLink.onload = () => {
        super.changeTheme(name);
        themeLink?.remove();
      };
      document.head.appendChild(newThemeLink);
    }
  }
}
