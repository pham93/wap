import { Injectable } from '@angular/core';

import { NgPortalAdapter } from 'portal';
import { TextWidgetComponent } from './widgets/text-widget/textWidget.component';

@Injectable({
  providedIn: 'root',
})
export class WidgetMapperService {
  static TEXT_WIDGET = 'TEXT_WIDGET';
  static EMPTY_WIDGET = 'EMPTY_WIDGET';

  constructor(private readonly ngPortalAdapter: NgPortalAdapter) {}

  create() {
    this.ngPortalAdapter.setDefaultWidget(TextWidgetComponent);
    this.ngPortalAdapter
      .addWidgetMapping(WidgetMapperService.TEXT_WIDGET, TextWidgetComponent)
      .addWidgetMapping(WidgetMapperService.EMPTY_WIDGET, TextWidgetComponent);
  }
}
