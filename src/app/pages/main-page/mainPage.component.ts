import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { GridsterItemWidget, NgPortalAdapter } from 'portal';
import { WidgetMapperService } from 'src/app/widgetMapper.service';

@Component({
  selector: 'main-page',
  templateUrl: './mainPage.component.html',
})
export class MainPageComponent {
  constructor(
    public readonly adapter: NgPortalAdapter,
    public readonly widgetMapperService: WidgetMapperService,
    private readonly theme: NbThemeService
  ) {
    widgetMapperService.ngOnInit();
  }

  editMode = true;

  dashboard: Array<GridsterItemWidget> = [];

  ngOnInit() {
    this.dashboard = JSON.parse(localStorage.getItem('myDashboard') || '[]');
  }

  ngAfterViewInit() {
    this.theme.changeTheme('dark');
  }

  change(a: any) {
    localStorage.setItem('myDashboard', JSON.stringify(a));
  }
}
