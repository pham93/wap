
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'widget-header',
  templateUrl: './widgetHeader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetHeaderComponent { }