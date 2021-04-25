import { ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';

import { GridsterItemWidget, PortalComponent } from './portal.component';

export class PortalManager {
  private _remove$ = new Subject<string>();

  private _toggleExpand = new Subject<GridsterItemWidget>();

  constructor(private readonly portal: PortalComponent, private readonly cdr: ChangeDetectorRef) {
    this._remove$.subscribe((id) => {
      this.portal.removeItem(id);
      this.cdr.markForCheck();
    });

    this._toggleExpand.subscribe((item) => {
      if (item.isExpanded) {
        this.portal.shrink(item.id);
      } else {
        this.portal.expand(item.id);
      }
      this.cdr.markForCheck();
    });
  }

  deleteWidget(id: string) {
    this._remove$.next(id);
  }

  toggleExpand(id: string) {
    const item = this.getItemById(id);
    this._toggleExpand.next(item);
  }

  getItemById(id: string) {
    return this.portal.dashboard.find((e) => e.id === id);
  }

  updateItem(id: string, item: Partial<GridsterItemWidget>) {
    const idx = this.portal.dashboard.findIndex((e) => e.id === id);
    if (idx >= 0) {
      this.portal.dashboard[idx] = {
        ...this.portal.dashboard[idx],
        ...item,
      };
      this.cdr.markForCheck();
    }
  }

  get onModeChange() {
    return this.portal.mode$.asObservable();
  }

  get isEditMode() {
    return this.portal.isEditMode;
  }

  setMode(mode: boolean) {
    this.portal.mode$.next(mode);
  }

  destroy() {
    this._remove$.complete();
    this._toggleExpand.complete();
  }
}
