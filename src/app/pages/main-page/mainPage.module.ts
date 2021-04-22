import { NgModule } from '@angular/core';
import { PortalModule } from 'portal';

import { SharedModule } from 'src/app/shared/shared.module';
import { TextWidgetModule } from 'src/app/widgets/text-widget/textWidget.module';
import { MainPageComponent } from './mainPage.component';
import { MainPageRoutingModule } from './mainPageRouting.module'

@NgModule({
  declarations: [
    MainPageComponent,
  ],
  imports: [
    SharedModule,
    TextWidgetModule,
    MainPageRoutingModule,
    PortalModule,
  ],
})
export class MainPageModule { }