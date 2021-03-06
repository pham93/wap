import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { GridsterItemWidget, NgPortalAdapter } from 'portal';
import { ThemeService } from 'src/app/services/theme.service';
import { WidgetMapperService } from 'src/app/services/widgetMapper.service';

@Component({
  selector: 'main-page',
  templateUrl: './mainPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  constructor(
    public readonly adapter: NgPortalAdapter,
    public readonly widgetMapperService: WidgetMapperService,
    private readonly theme: ThemeService
  ) {
    widgetMapperService.create();
  }

  editMode = true;

  dashboard: Array<GridsterItemWidget> = [];

  ngOnInit() {
    this.dashboard = JSON.parse(localStorage.getItem('myDashboard') || '[]');
  }

  change(a: any) {
    localStorage.setItem('myDashboard', JSON.stringify(a));
  }
}
