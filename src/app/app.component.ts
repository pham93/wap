import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(public readonly theme: ThemeService) {
    this.theme.changeTheme(localStorage.getItem('ThemePreference') || 'default');
  }

  onThemeChange(selected: any) {
    this.theme.changeTheme(selected);
    localStorage.setItem('ThemePreference', selected);
  }
}
