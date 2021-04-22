import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetComponent { }