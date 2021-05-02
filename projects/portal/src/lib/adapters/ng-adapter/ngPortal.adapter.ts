import { ComponentPortal, ComponentType, DomPortalOutlet } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';

import { GridsterItemWidget } from '../../portal/portal.component';
import { PortalManager } from '../../portal/portalManager';
import { PortalAdapter } from '../';

export interface WidgetOptionT {
  name: string;
  widget?: ComponentType<unknown>;
  widgetLoader?: () => Promise<ComponentType<unknown>>;
}

@Injectable({
  providedIn: 'root',
})
export class NgPortalAdapter implements PortalAdapter {
  static WIDGET_ID = 'widget_id';
  static PORTAL_MANAGER = 'portal_manager';

  private _hosts = new Map<string, DomPortalOutlet>();

  private _widgetNameMapping = new Map<string, WidgetOptionT>();

  constructor(
    private readonly injector: Injector,
    private appRef: ApplicationRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver
  ) {}

  defaultWidgetName = 'DEFAULT_WIDGET';

  create(item: GridsterItemWidget, portalManager: PortalManager) {
    const widgetOption = this._widgetNameMapping?.get(item.widget);

    if (!widgetOption || (!widgetOption.widget && !widgetOption.widgetLoader)) {
      throw new Error(`no widget with ${item.widget}`);
    }

    if (widgetOption.widgetLoader) {
      widgetOption.widgetLoader().then((e) => this.createComponent(item, portalManager, e));
    }

    if (widgetOption.widget) {
      this.createComponent(item, portalManager, widgetOption.widget);
    }
  }

  switch(item: GridsterItemWidget, portalManager: PortalManager) {
    this.create(item, portalManager);
  }

  addWidgetMapping(widgetOption: WidgetOptionT) {
    this._widgetNameMapping.set(widgetOption.name, widgetOption);
    return this;
  }

  setDefaultWidget(component: Omit<WidgetOptionT, 'name'>) {
    this._widgetNameMapping.set(this.defaultWidgetName, {
      ...component,
      name: this.defaultWidgetName,
    });
  }

  destroy(item: GridsterItemWidget) {
    this._hosts.get(item.id)?.dispose();
  }

  private createComponent(
    item: GridsterItemWidget,
    portalManager: PortalManager,
    component: ComponentType<unknown>
  ) {
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
    const componentPortal = new ComponentPortal(component, null, componentInject);

    portalHost.attach(componentPortal);

    this._hosts.set(item.id, portalHost);
  }
}
