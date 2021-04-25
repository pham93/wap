import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { PortalAdapter } from '../../adapters';
import { GridsterItemWidget } from '../portal.component';
import { PortalManager } from '../portalManager';

@Component({
  selector: 'portal-container',
  template: `<div
    class="gridster-item-content"
    style="height: 100%; width: 100%"
    id="{{ item.id }}"
  ></div>`,
})
export class PortalContainerComponent implements AfterViewInit, OnDestroy {
  @Input()
  item!: GridsterItemWidget;

  @Input()
  portalManager!: PortalManager;

  @Input()
  adapter!: PortalAdapter;

  ngAfterViewInit() {
    this.adapter.create(this.item, this.portalManager);
  }

  ngOnDestroy() {
    this.adapter.destroy(this.item);
  }
}
