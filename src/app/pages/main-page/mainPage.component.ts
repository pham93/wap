import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { GridsterItemWidget, NgPortalAdapter } from 'portal';
import { WidgetMapperService } from 'src/app/widgetMapper.service';

@Component({
  selector: 'main-page',
  templateUrl: './mainPage.component.html'
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

  dashboard: Array<GridsterItemWidget> = [
    { x: 0, y: 0, cols: 4, rows: 1, widget: WidgetMapperService.TEXT_WIDGET },
    { x: 4, y: 0, cols: 5, rows: 1, widget: WidgetMapperService.EMPTY_WIDGET }
  ];

  ngOnInit() {
    console.log('hello world');
  }

  ngAfterViewInit() {
    this.theme.changeTheme('dark');
  }

  change(a: any) {}
}