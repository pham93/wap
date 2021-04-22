import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { WidgetBodyComponent } from './widget-body/widgetBody.component';
import { WidgetHeaderComponent } from './widget-header/widgetHeader.component';
import { WidgetComponent } from './widget.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    WidgetComponent,
    WidgetBodyComponent,
    WidgetHeaderComponent,
  ],
  exports: [
    WidgetComponent,
    WidgetBodyComponent,
    WidgetHeaderComponent,
  ]
})
export class WidgetModule { }