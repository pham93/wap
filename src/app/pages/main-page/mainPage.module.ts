import { NgModule } from '@angular/core';
import { PortalModule } from '@wap/portal';

import { SharedModule } from 'src/app/shared/shared.module';
import { MainPageComponent } from './mainPage.component';
import { MainPageRoutingModule } from './mainPageRouting.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [SharedModule, MainPageRoutingModule, PortalModule],
})
export class MainPageModule {}
