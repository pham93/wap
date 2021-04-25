import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';

import { PortalComponent } from './portal.component';
import { PortalContainerComponent } from './/portal-container/portalContainer.component';

@NgModule({
  imports: [CommonModule, GridsterModule],
  declarations: [PortalComponent, PortalContainerComponent],
  exports: [PortalComponent],
})
export class PortalModule {}
