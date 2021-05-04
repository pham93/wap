import { Injectable } from '@angular/core';

import { NgPortalAdapter } from 'portal';

@Injectable({
  providedIn: 'root',
})
export class WidgetMapperService {
  static TEXT_WIDGET = 'TEXT_WIDGET';
  static EMPTY_WIDGET = 'EMPTY_WIDGET';
  static MAP_WIDGET = 'MAP_WIDGET';

  private readonly lazyTextWidget = async () =>
    (await import('../widgets/text-widget/textWidget.module')).TextWidgetModule.getComponent();

  private readonly lazyMapWidget = async () =>
    (await import('../widgets/map-widget/mapWidget.module')).MapWidgetModule.getComponent();

  constructor(private readonly ngPortalAdapter: NgPortalAdapter) {}

  create() {
    this.ngPortalAdapter.setDefaultWidget({
      widgetLoader: this.lazyMapWidget,
    });
    this.ngPortalAdapter
      .addWidgetMapping({
        name: WidgetMapperService.TEXT_WIDGET,
        widgetLoader: this.lazyTextWidget,
      })

      .addWidgetMapping({
        name: WidgetMapperService.EMPTY_WIDGET,
        widgetLoader: this.lazyTextWidget,
      })

      .addWidgetMapping({
        name: WidgetMapperService.MAP_WIDGET,
        widgetLoader: this.lazyTextWidget,
      });
  }
}
