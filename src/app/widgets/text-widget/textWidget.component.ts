import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'portal-ui-text-widget',
  templateUrl: './textWidget.component.html',
  styleUrls: ['./textWidget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextWidgetComponent {}
