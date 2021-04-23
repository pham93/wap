import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import {
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridType
} from "angular-gridster2";
import { Subject } from "rxjs";

import { PortalAdapter } from '../adapters';
import { generateId } from "./generateId";
import { PortalManager } from "./portalManager";

export interface GridsterItemWidget extends GridsterItem {
  id?: any;
  widget: string;
  isExpanded?: boolean;
}

@Component({
  selector: "portal-core",
  templateUrl: "./portal.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalComponent implements OnInit, OnDestroy {
  static EXPAND_LAYER_INDEX = 100;

  private _config!: GridsterConfig;

  private _defaultConfig!: GridsterConfig;
  
  private _dashboard: Array<GridsterItemWidget> = [];
  
  private _isEditMode = true;

  public mode$ = new Subject<boolean>();

  public portalManager = new PortalManager(this, this.cdr);

  @Input()
  scale = 1;

  @Input()
  set isEditMode(input: boolean) {
    this.mode$.next(input);
  }

  get isEditMode() {
    return this._isEditMode;
  }

  @Input()
  adapter!: PortalAdapter;

  @Input()
  set config(input: GridsterConfig) {
    if (!this._defaultConfig) {
      this._defaultConfig = this.buildConfig(this.isEditMode);
      this._config = { ...this._defaultConfig, ...input };
      return;
    }
    this._config = { ...this._config, ...input };
  }

  get config() {
    return this._config;
  }

  @Input()
  set dashboard(input: Array<GridsterItemWidget>) {
    this._dashboard = input.map((e) => ({ ...e, id: e.id ?? generateId() }));
  }

  get dashboard() {
    return this._dashboard;
  }

  @Output()
  onDashboardChange = new EventEmitter<Array<GridsterItemWidget>>();

  @Output()
  onModeChange = new EventEmitter<boolean>();

  constructor(private readonly cdr: ChangeDetectorRef) {
    this.mode$.subscribe((e) => {
      this._isEditMode = e;
      this.onModeChange.emit(e);
      this.setEdit(e);
      this.cdr.markForCheck();
    });
  }

  ngOnInit() {
    if (!this._defaultConfig) {
      this._defaultConfig = this.buildConfig(this.isEditMode);
      this._config = { ...this._defaultConfig };
    }
  }

  private buildConfig(mode: boolean): GridsterConfig {
    const [wboxes, hboxes, minItemCols, minItemRows] = [32, 18, 3, 1].map(
      (e) => e * this.scale
    );
    return {
      minCols: wboxes,
      maxCols: wboxes,
      minRows: hboxes,
      maxRows: hboxes * 1,
      margin: 2,
      displayGrid: DisplayGrid.Always,
      resizable: {
        enabled: mode,
        delayStart: 50
      },
      mobileBreakpoint: 0,

      draggable: {
        enabled: mode,
        delayStart: 50,
        ignoreContent: true
      },
      disableScrollHorizontal: true,
      disableScrollVertical: true,
      swap: false,
      enableEmptyCellDrag: mode,
      allowMultiLayer: true,
      defaultLayerIndex: 0,
      maxLayerIndex: 100,
      baseLayerIndex: 0,
      defaultItemCols: minItemCols,
      defaultItemRows: minItemRows,
      minItemCols: minItemCols,
      minItemRows: minItemRows,
      emptyCellDragCallback: this.emptyCellAdd.bind(this),
      gridType: GridType.Fit,
      itemChangeCallback: this.itemChange.bind(this),
      itemResizeCallback: this.itemResize.bind(this)
    };
  }

  setEdit(mode: boolean) {
    if (!this._config) {
      return;
    }
    this._config = { ...this._config, resizable: {
      ...this._config.resizable,
      enabled: mode
    }, draggable: {
      ...this._config.draggable,
      enabled: mode
    } };

    this._config.enableEmptyCellDrag = mode;
    this._config.displayGrid = mode ? DisplayGrid.Always : DisplayGrid.None;
    this.updateChangedConfig();
  }

  updateChangedConfig() {
    if (this._config.api && this._config.api.optionsChanged) {
      this._config.api.optionsChanged();
    }
  }

  removeItem(id: string) {
    const idx = this.dashboard.findIndex((e) => e.id === id);
    if (idx >= 0) {
      this.dashboard.splice(idx, 1);
    }
    this.itemChange();
  }

  addItem() {
    this.dashboard.push({} as GridsterItemWidget);
  }

  emptyCellAdd(_event: MouseEvent, _item: GridsterItem) {
    this.dashboard.push({
      ..._item,
      id: generateId(),
      widget: this.adapter.defaultWidgetName
    });
  }

  itemChange() {
    // item change
    this.onDashboardChange.emit(this.dashboard);
  }

  itemResize() {
    // resize
    this.onDashboardChange.emit(this.dashboard);
  }

  trackBy(_index: number, item: GridsterItem): number {
    return item.id;
  }

  expand(id: string) {
    const idx = this.dashboard.findIndex((e) => e.id === id);
    const item = this.dashboard[idx];
    if (item) {
      this.dashboard[idx] = {
        ...item,
        layerIndex: PortalComponent.EXPAND_LAYER_INDEX,
        x: 0,
        y: 0,
        rows: this._config.minRows ?? 0,
        cols: this._config.minCols ?? 0,
        isExpanded: true,
        prev: {
          ...this.dashboard[idx],
          layerIndex:
            this.dashboard[idx].layerIndex ?? this._config.defaultLayerIndex
        }
      };
    }
  }

  shrink(id: string) {
    const idx = this.dashboard.findIndex((e) => e.id === id);
    const item = this.dashboard[idx];
    if (item?.prev) {
      this.dashboard[idx] = {
        ...item.prev
      };
    }
  }

  ngOnDestroy() {
    this.mode$.complete();
  }
}
