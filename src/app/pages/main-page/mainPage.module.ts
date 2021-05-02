import { NgModule } from '@angular/core';
import { PortalModule } from 'portal';
import { NebularModule } from 'src/app/shared/nebular.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { MainPageComponent } from './mainPage.component';
import { MainPageRoutingModule } from './mainPageRouting.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [SharedModule, MainPageRoutingModule, PortalModule],
})
export class MainPageModule {}
