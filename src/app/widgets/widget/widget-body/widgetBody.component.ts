
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'widget-body',
  templateUrl: './widgetBody.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetBodyComponent { }