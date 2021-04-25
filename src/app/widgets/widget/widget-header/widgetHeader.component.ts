import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
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
  ) {}

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
}
