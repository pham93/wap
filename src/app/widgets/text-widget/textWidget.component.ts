import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from "@angular/core";

import { NgPortalAdapter, PortalManager } from 'portal';

@Component({
  selector: "portal-ui-text-widget",
  templateUrl: "./textWidget.component.html",
  styleUrls: ['./textWidget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextWidgetComponent { }
