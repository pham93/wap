import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from "@angular/core";

import { NgPortalAdapter, PortalManager } from 'portal';

@Component({
  selector: "portal-ui-text-widget",
  templateUrl: "./textWidget.component.html",
  styleUrls: ['./textWidget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextWidgetComponent {
  edit = false;

  constructor(
    @Inject(NgPortalAdapter.WIDGET_ID) private readonly id: string,
    @Inject(NgPortalAdapter.PORTAL_MANAGER)
    public readonly portalManager: PortalManager,
    public readonly cdr: ChangeDetectorRef
  ) {
    this.edit = this.portalManager.isEditMode;
    this.portalManager.onModeChange.subscribe((e) => {
      this.edit = e;
      this.cdr.markForCheck();
    });
  }

  remove() {
    this.portalManager.deleteWidget(this.id);
  }

  toggleExpand() {
    this.portalManager.toggleExpand(this.id);
  }

  selectLayer(val: any) {
    this.portalManager.updateItem(this.id, {
      layerIndex: val
    });
  }
}
