import { ComponentPortal, ComponentType, DomPortalOutlet } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';

import { GridsterItemWidget } from '../../portal/portal.component';
import { PortalManager } from '../../portal/portalManager';
import { PortalAdapter } from '../';

@Injectable({
  providedIn: 'root',
})
export class NgPortalAdapter implements PortalAdapter {
  static WIDGET_ID = 'widget_id';
  static PORTAL_MANAGER = 'portal_manager';

  private _hosts = new Map<string, DomPortalOutlet>();

  private _widgetNameMapping = new Map<string, ComponentType<unknown>>();

  constructor(
    private readonly injector: Injector,
    private appRef: ApplicationRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver
  ) {}

  defaultWidgetName = 'DEFAULT_WIDGET';

  create(item: GridsterItemWidget, portalManager: PortalManager) {
    const el = document.getElementById(item.id);
    if (!el) {
      throw new Error('no element defined');
    }

    const portalHost = new DomPortalOutlet(
      el,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );

    const componentInject = Injector.create({
      parent: this.injector,
      providers: [
        { provide: NgPortalAdapter.WIDGET_ID, useValue: item.id },
        { provide: NgPortalAdapter.PORTAL_MANAGER, useValue: portalManager },
      ],
    });

    const component = this._widgetNameMapping?.get(item.widget);

    if (!component) {
      throw new Error(`no widget with ${item.widget}`);
    }

    const componentPortal = new ComponentPortal(component, null, componentInject);

    portalHost.attach(componentPortal);

    this._hosts.set(item.id, portalHost);
  }

  switch(item: GridsterItemWidget, portalManager: PortalManager) {
    this.create(item, portalManager);
  }

  addWidgetMapping(id: string, component: ComponentType<unknown>) {
    this._widgetNameMapping.set(id, component);
    return this;
  }

  setDefaultWidget(component: ComponentType<unknown>) {
    this._widgetNameMapping.set(this.defaultWidgetName, component);
  }

  destroy(item: GridsterItemWidget) {
    this._hosts.get(item.id)?.dispose();
  }
}
