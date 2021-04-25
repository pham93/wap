import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
} from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { WidgetHeaderComponent } from './widget-header/widgetHeader.component';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  animations: [
    fadeOutOnLeaveAnimation({ duration: WidgetComponent.ANIMATION_TIME }),
    fadeInOnEnterAnimation({ duration: WidgetComponent.ANIMATION_TIME }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent {
  public exist = true;

  public static ANIMATION_TIME = 250;

  @ContentChild(WidgetHeaderComponent) header!: WidgetHeaderComponent;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterContentInit() {
    // overriding the header remove mehtod is neccessary for animation to work.
    const oldHeaderRemoveMethod = this.header.remove.bind(this.header);
    this.header.remove = ($event: MouseEvent) => {
      this.exist = false;
      this.cdr.markForCheck();
      setTimeout(() => oldHeaderRemoveMethod($event), WidgetComponent.ANIMATION_TIME);
    };
  }
}
