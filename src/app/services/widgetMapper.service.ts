import { Injectable } from '@angular/core';

import { NgPortalAdapter } from 'portal';

@Injectable({
  providedIn: 'root',
})
export class WidgetMapperService {
  static TEXT_WIDGET = 'TEXT_WIDGET';
  static EMPTY_WIDGET = 'EMPTY_WIDGET';

  private readonly lazyTextWidget = async () =>
    (await import('../widgets/text-widget/textWidget.module')).TextWidgetModule.getComponent();

  constructor(private readonly ngPortalAdapter: NgPortalAdapter) {}

  create() {
    this.ngPortalAdapter.setDefaultWidget({
      widgetLoader: this.lazyTextWidget,
    });
    this.ngPortalAdapter
      .addWidgetMapping({
        name: WidgetMapperService.TEXT_WIDGET,
        widgetLoader: this.lazyTextWidget,
      })

      .addWidgetMapping({
        name: WidgetMapperService.EMPTY_WIDGET,
        widgetLoader: this.lazyTextWidget,
      });
  }
}
