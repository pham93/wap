import { GridsterItemWidget } from '../portal/portal.component';
import { PortalManager } from '../portal/portalManager';

export interface PortalAdapter {
  defaultWidgetName: string;
  switch: (item: GridsterItemWidget, portalMangager: PortalManager) => any;
  create: (item: GridsterItemWidget, portalMangager: PortalManager) => any;
  destroy: (item: GridsterItemWidget) => any;
}
