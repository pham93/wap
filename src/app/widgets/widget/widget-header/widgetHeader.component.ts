import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { NgPortalAdapter, PortalManager } from 'portal';

enum MOUSEBUTTON {
  LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2,
}

@Component({
  selector: 'widget-header',
  templateUrl: './widgetHeader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetHeaderComponent {
  constructor(
    @Inject(NgPortalAdapter.WIDGET_ID) private readonly id: string,
    @Inject(NgPortalAdapter.PORTAL_MANAGER)
    public readonly portalManager: PortalManager,
    public readonly cdr: ChangeDetectorRef
  ) {
    this.name = localStorage.getItem('widgetTitle' + this.id) || "";
  }
  name: string;

  remove($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.portalManager.deleteWidget(this.id);
  }

  toggleExpand($event: MouseEvent) {
    if ($event.button === MOUSEBUTTON.LEFT) {
      $event.preventDefault();
      $event.stopPropagation();
      this.portalManager.toggleExpand(this.id);
    }
  }

  selectLayer(val: any) {
    this.portalManager.updateItem(this.id, {
      layerIndex: val,
    });
  }

  textChange(val: any) {
    this.name = val.target.value;
    localStorage.setItem('widgetTitle' + this.id, this.name);
  }
}
